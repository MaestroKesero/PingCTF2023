As

x % y + z * floor(x/y) ≡ x   mod (y-z)

for: 
y = 2**59
z = 1

we can transform

x % 2**59 -> x & (2**59-1)

1 * floor(x/2**59) -> x >> 59

which gives us:

x & 2**59-1 + (x >> 59) ≡ x    mod (2**59-1)


code

x = 1
for i in range(420_69):
    x = x * input
    x = x & 2**59-1 + (x >> 59)

effectively is 

ct = input**42069 mod (2**59-1)

which is RSA encryption with N = 2**59-1 and e = 42069 

to retrieve input from ct we just need find factors of 2**59-1
which are 179951 × 3203431780337 and
calculate 
d ≡ e**-1 mod λ(179951 × 3203431780337)

d = 331357922622589629

and we can calculate input

input = ct**331357922622589629 mod (2**59-1)
(https://en.wikipedia.org/wiki/RSA_(cryptosystem))

solution script:

good = [(13969439442922757926633137632, 3251133470245911671632840864), (6919844817045365871489845728, 3067821989026578174692487328), (11408842561461143227463443808, 3766356150094573135206359136), (11299068421490417286376379488, 3802947530149782083826679648), (9203465938188223031329433888, 2306614948612889330244181216), (9753400381846729757945770272, 4656479823873291748257812704)]

def decrypt(number):
    return pow(number, 331357922622589629, 3203431780337*179951)

flag = []
for a in good:
    xd = decrypt((((a[1]//0xE6359A60)^0xC0FFEE)-0xDEADBEEF)//2)
    for i in range(8):
        s = (xd >> 7*i) & 127
        if s != 127:
            flag.append(chr(s))
print(''.join(flag))
