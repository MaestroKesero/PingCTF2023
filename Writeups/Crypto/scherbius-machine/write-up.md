# Writeup: scherbius-machine

## Category: crypto

## Author: P1T4G0R45

# scherbius-machine Solver

Scherbius machine is Enigma so i will use this name.
The provided Python script employs the `pyenigma` library to perform a brute-force attack on an Enigma-encoded message. The Enigma machine, famous for its use by the Germans during World War II, requires exhaustive searching through possible configurations to decrypt the encoded message.

## Code Overview

### Enigma Settings

The Enigma machine is configured with the following settings:

-   **Reflector:** Reflector A
-   **Rotors:** I, II, III
-   **Initial Positions:** Configured by the variables `rotor1`, `rotor2`, and `rotor3`

### Ciphertext

The encrypted message to be decrypted is provided in the variable `ciphertext`.

### Brute Force Function

The function `bruteforce_enigma` attempts to decrypt the ciphertext by iterating through all possible Enigma machine configurations. The nested loops iterate over the rotor positions and plugboard configurations.

For each combination of rotor positions and plugboard settings, the Enigma machine is initialized, and the ciphertext is decrypted. If the decrypted message contains the substring "ping," the potential decryption is printed.

```python
from pyenigma import enigma
from pyenigma import rotor

def bruteforce_enigma(ciphertext, reflector, rotor1, rotor2, rotor3):
    for key1 in range(26):
        for key2 in range(26):
            for key3 in range(26):
                key = chr(65 + key1) + chr(65 + key2) + chr(65 + key3)
                for plug_letter in [chr(65 + i) for i in range(26) if chr(65 + i) not in key + "FH"]:
                    plugboard_config = f"AV BS CG DL HZ IN KM OW RX {plug_letter}F"
                    engine = enigma.Enigma(reflector, rotor3, rotor2, rotor1, key=key, plugs=plugboard_config)
                    decrypted_message = engine.encipher(ciphertext)
                    if "ping" in decrypted_message:
                        print(f"Key: {key}, Plugboard: {plugboard_config}, Decrypted Message: {decrypted_message}")

# Enigma Settings
reflector = rotor.ROTOR_Reflector_A
rotor1 = rotor.ROTOR_I
rotor2 = rotor.ROTOR_II
rotor3 = rotor.ROTOR_III
rotors = [rotor.ROTOR_I, rotor.ROTOR_II, rotor.ROTOR_III]

# Encrypted Message
ciphertext = "dvgs{atrpwb_pxr_mwqlqrxsqggc_crsrv_xiwdtyu_fdp}"

# Brute-force the key
bruteforce_enigma(ciphertext, reflector, rotor1, rotor2, rotor3)
```

```python
stator_type =  ["military","civilian"][0] 
rotor_config = [("III", "A"), ("II", "B"), ("I", "C")]

for a in string.ascii_uppercase:
    for b in string.ascii_uppercase:
        for c in string.ascii_uppercase:
            for p in "EJPQTUY":
                plugs = f"AV BS CG DL F{p} HZ IN KM OW RX"
                machine = enigma.Enigma(catalog="default", stecker=plugs,
                                        rotors=rotor_config, reflector="Reflector A", operator=True, word_length=100, stator=stator_type)
                machine.set_wheels(f"{a}{b}{c}")
                ct = "dvgs{atrpwb_pxr_mwqlqrxsqggc_crsrv_xiwdtyu_fdp}"
                pt = machine.parse(ct.upper()).lower()
                if (pt.startswith('ping')):
                    print(f"{to_flag_format(pt)} {a} {b} {c} {p}")
```

https://meashiri.github.io/ctf-writeups/posts/202312-pingctf/#scherbius-machine


