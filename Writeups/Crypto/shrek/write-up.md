# Write-up: shrek

## Category: crypto

## Author essor.

```python
with open('./ciphertexts.txt', 'r') as f:
    cipherTexts = list(f.read().split("\n"))


alp = "SHREKWritenbyTdlosJmag.chuBkOpwvf'-M,()LANIG1?2!D3Yqzjx\"FXPUC0456789Q{}/V:& "
words = []
maxit = 0
with open('./shrek.txt', 'r') as f:
    words = list(f.read().split())
max = 0
for i in words:
    if len(i) > max:
        max = len(i)

def isInvalid(text):
    tmptxt = text[-38:]
    if "  " in tmptxt:
        return True
    txt = tmptxt.split(" ")[-1]
    whole = False
    if txt == "" and len(tmptxt) > 36:
        whole = True
        txt = tmptxt.split(" ")[-2]


    if whole:
        return not txt in words
    else:
        for word in words:
            if word.startswith(txt):
                return False
        return True




decrypted = []
for cipherText in cipherTexts:
        decrypted.append("")

max = 0

for cipherText in cipherTexts:
    if len(cipherText) > max:
        max = len(cipherText)

goodkey = []
key = []

def test(it, nextKey):
    global key
    key.append(nextKey)
    global maxit
    if it > maxit:
        goodkey = key
        maxit = it
    allValid = True
    added = {}
    for i in range(len(cipherTexts)):
        if it == len(cipherTexts[-1]):
            print(decrypted[-1])

        if it >= len(cipherTexts[i]):
            continue
        added[i] = True
        decrypted[i] += alp[(alp.index(cipherTexts[i][it])+nextKey) % len(alp)]

        allValid = allValid and not isInvalid(decrypted[i])

    good = False
    nextIt = it+1
    if nextIt > max:
        key = key[:-1]
        return
    if allValid:
        for j in range(len(alp)):
            good = good or test(nextIt, j)

    for i in range(len(cipherTexts)):
        if i in added:
            decrypted[i] = decrypted[i][:-1]
    key = key[:-1]



for j in range(len(alp)):
    test(0, j)
```
