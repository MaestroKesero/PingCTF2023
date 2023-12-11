# Writeup: private-conversation

## Category: crypto

## Author: P1T4G0R45

In the "private-conversation" challenge, we were tasked with decrypting a piece of encoded information from a private conversation. The challenge involved deciphering an encrypted text snippet by analyzing a custom encoding scheme.

## Challenge Description

We were given an intercepted message in the form of a string that contained the hidden content of the conversation. The message was encoded using a unique key:

-   'xd' -> 00
-   'xD' -> 01
-   'Xd' -> 10
-   'XD' -> 11

Our mission was to decrypt the message and reveal the hidden content, which was believed to contain critical information necessary to prevent a major disaster in Gotham City.

## Approach

To solve this challenge, we followed these steps:

1. We carefully examined the provided message snippet, looking for patterns that matched the encoding key.
2. When we identified a matching pattern, we converted it to its binary representation using the given key.
3. As we deciphered the binary message, we get flag.

## Decryption Code

```python
class XDcipher:
	def __init__(self):
		pass
	@staticmethod
	def convert_text_to_binary(text):
	binary_result = ""
	for char in text:
		binary_char = format(ord(char), '08b')
		binary_result += binary_char
	return binary_result

	@staticmethod
	def convert_binary_to_text(binary_code):
		text_result = ""
		for i in range(0, len(binary_code), 8):
		byte = binary_code[i:i + 8]
		char = chr(int(byte, 2))
		text_result += char
	return text_result

	@staticmethod
	def convert_binary_to_XD(binary_code):
		XD_conversion = { "00": 'xd', "01": 'xD', "10": 'Xd', "11": 'XD' }
		XD_result = ""
		for i in range(0, len(binary_code), 2):
			bits = binary_code[i:i + 2]
			XD_value = XD_conversion.get(bits, '??')
			XD_result += XD_value
		return XD_result

	@staticmethod
	def convert_XD_to_binary(XD_code):
	binary_conversion = { 'xd': "00", 'xD': "01", 'Xd': "10", 'XD': "11" }
	binary_result = "" i = 0
	while i < len(XD_code):
		if i + 2 <= len(XD_code):
			XD_pair = XD_code[i:i + 2]
			binary_value = binary_conversion.get(XD_pair, '????')
			binary_result += binary_value i += 2
		else:
			break
	return
```

## Conclusion

By applying the provided encoding key and systematically decrypting the message, we were able to reveal the hidden content of the conversation.

**Flag:** ping{why_so_serious_XD}


My one-line bash solution:
```bash
grep -Eo '>[xXdD]*<' index.html | sed -e 's/xd/00/g' -e 's/xD/01/g' -e 's/Xd/10/g' -e 's/XD/11/g' -e 's/[<>]//g' | perl -lpe '$_=pack"B*",$_' | grep -Eo "\{[0-9, ]*?\}" | tr -d '{,}' | xargs -n 1 | awk '{printf "%c", $0}' 
```


It is in my write up site.  https://meashiri.github.io/ctf-writeups/posts/202312-pingctf/#private-conversation
```bash
%  grep -Eo '>[xXdD]*<' index.html  # extract the message from HTML    
 | sed -e 's/xd/00/g' -e 's/xD/01/g' -e 's/Xd/10/g' -e 's/XD/11/g' -e 's/[<>]//g'  
# replace pairs of characters with binary digits and remove unnecessary chars
 | perl -lpe '$_=pack"B*",$_'    # convert binary to ascii .... will produce a C sourcefile
 | grep -Eo "\{[0-9, ]*?\}"      # extract the array from the C source
 | tr -d '{,}'                   # remove the extra characters
 | xargs -n 1                    # split into one item per line
 | awk '{printf "%c", $0}'       # translate decimal to ascii charater and print    
ping{why_so_serious_XD}          # FLAG !
```



