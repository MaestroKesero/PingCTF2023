# Writeup: hard-work

## Category: crypto

## Author: P1T4G0R45

![write-up image cyberchef](./write-up.png)


xxd -r -p task.txt| sed -e 's/[6 ]//g' -e 's/40/\n/g'| perl -lpe '$_=pack"B*",$_'| tr -d '\n'| xxd -r -p | base64 -d

https://github.com/daffainfo/ctf-writeup/blob/main/pingCTF%202023/hard-work
