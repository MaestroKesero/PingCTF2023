# Writeup: old-friend-from-the-past

## Category: crypto

## Author: P1T4G0R45

```python
def text_to_ascii_array(text):
    ascii_array = [ord(char) for char in text]
    return ascii_array

def encrypt_caesar_ascii_pro_bytes(ascii_array, shift=79):
    encrypted_bytes = bytearray()

    for ascii_value in ascii_array:
        encrypted_byte = (ascii_value - shift) % 256
        encrypted_bytes.append(encrypted_byte)

    return bytes(encrypted_bytes)

def decrypt_caesar_ascii_pro_bytes(encrypted_bytes, shift=79):
    decrypted_bytes = bytearray()

    for encrypted_byte in encrypted_bytes:
        decrypted_byte = (encrypted_byte + shift) % 256
        decrypted_bytes.append(decrypted_byte)

    return bytes(decrypted_bytes)

def ascii_array_to_text(ascii_array):
    text = ''.join([chr(ascii_value) for ascii_value in ascii_array])
    return text

def write_to_file(file_path, data):
    with open(file_path, 'wb') as file:
        file.write(data)

def read_from_file(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
    return data

def caesar_cipher(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            start = ord('a') if char.islower() else ord('A')
            result += chr((ord(char) - start + shift) % 26 + start)
        else:
            result += char
    return result

def caesar_decipher(ciphertext, shift):
    return caesar_cipher(ciphertext, -shift)

# Task Description:
# You've stumbled upon an ancient code left behind by a historical figure.
# The encrypted message involves a complex combination of ASCII transformations
# and a Caesar cipher. To decrypt it, you'd typically iterate through ASCII shifts
# and then through the alphabet. The provided Python code gives you a starting point.

# Usage Example:
text = "ping{veni_vidi_vici_15/03/44_BC}"
changed_text = caesar_cipher(text, 9)
input_text = changed_text

# Convert text to ASCII array
ascii_array = text_to_ascii_array(input_text)

# Encrypt ASCII array
encrypted_bytes = encrypt_caesar_ascii_pro_bytes(ascii_array)

# Save encrypted bytes to a binary file
file_path = 'encrypted_data.bin'
write_to_file(file_path, encrypted_bytes)

# Read encrypted bytes from the binary file
read_encrypted_bytes = read_from_file(file_path)

# Decrypt the encrypted bytes
decrypted_bytes = decrypt_caesar_ascii_pro_bytes(read_encrypted_bytes)

# Convert decrypted ASCII array to text
decrypted_text = ascii_array_to_text(decrypted_bytes)

# Decrypt the text using a Caesar cipher
decrypted_text = caesar_cipher(decrypted_text, -9)

# Display the results
print(f"Original text: {input_text}")
print(f"Encrypted ASCII array: {ascii_array}")
print(f"Encrypted bytes: {encrypted_bytes}")
print(f"Encrypted bytes read from file: {read_encrypted_bytes}")
print(f"Decrypted bytes: {decrypted_bytes}")
print(f"Decrypted text: {decrypted_text}")
```
