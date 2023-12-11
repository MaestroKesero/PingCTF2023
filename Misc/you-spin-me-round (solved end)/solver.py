from pwn import *
import re
import numpy as np
from decimal import *

r = remote('you-spin-me-round.knping.pl', 20000)

'''Task1'''

r.recvuntil(b'\n'b'    \n'b'\n')
cadena = r.recvline() #String datos Task1


matches = re.findall(r'\b\d+\b', cadena.decode('iso-8859-1'))

dividend = int(matches[1])
quotient = int(matches[2])

for i in range(1, 10000):
    if (dividend // i) == quotient:
        r.sendline(str(i).encode('iso-8859-1'))
        break

'''Task2'''

r.recvuntil(b'    \n'b'\n')
cadena2 = r.recvline() # String Datos Task2

matches = re.findall(r'\b\d+\.\d+\b', cadena2.decode('iso-8859-1'))

dividend = float(matches[0])
module = float(matches[1])

for n in range(1, 100001):
    n = n / 100
            
    if (dividend % n) == module:     
        r.sendline(str(n).encode('iso-8859-1'))
        break

'''Task3'''

print(r.recvuntil(b'    \n'b'\n'))
cadena3 = r.recvline() # String Datos Task3

matches = re.findall(r'\b\d+\.\d+\b', cadena3.decode('iso-8859-1'))

dividend = float(matches[0])
quotient = float(matches[1])

module = dividend % quotient

output = round(module, 17)
output = format(output, ".30g") # Necesario para completar el condicional especial.
r.sendline(str(output).encode('iso-8859-1'))
# Condicional especial --> "163.01999999995257" != str(163.01999999995257) and float("163.01999999995257") == 163.01999999995257 and not "163.01999999995257".endswith("0")

'''Task4'''
r.recvuntil(b'START\n'b'\n')
cadena4 = r.recvline() # String datos task4

cadena4_str = cadena4.decode('iso-8859-1') 
porcentaje_char = re.search(r'(\d+\.\d+) %', cadena4_str) # Comprobamos operador

if re.search(rb'%', cadena4):

    #case 1 Task 4: 1398436.97 % ? = 327.32000000000755 (No implementada)
    #case 2 Task 4: 1056530.07 % 753.53 = ?\n' (La mas sencilla)

    patron = re.compile(rb'=\s*\?')
    coincidencias = patron.search(cadena4)

    # Comprobamos donde esta ?
    if coincidencias: # Caso 2
        matches = re.findall(r'\b\d+\.\d+\b', cadena4.decode('iso-8859-1'))

        dividend = float(matches[0])
        quotient = float(matches[1])

        module = dividend % quotient
    
        output = format(module, f".17f")

        r.sendline(str("\t"+ str(module)).encode('iso-8859-1'))

    else: # Caso 1

        patron = re.compile(rb'(\d+\.\d+)\s*%\s*\?\s*=\s*(\d+\.\d+)')

        # Buscar el patrón en la cadena
        coincidencias = patron.search(cadena4)

        # Verificar el resultado
        if coincidencias:
            dividend = float(coincidencias.group(1))
            module = float(coincidencias.group(2))
               
        for n in range(1, 100001):
            n = n / 100
            
            if (dividend % n) == module:
                    
                r.sendline(str(n).encode('iso-8859-1'))
                break

else: # Operador // --> Task 4: 2435 // ? = 30

    matches = re.findall(r'\b\d+\b', cadena4.decode('iso-8859-1'))

    dividend = int(matches[1])
    quotient = int(matches[2])

    for i in range(1, 10000):
        if (dividend // i) == quotient:
                
            r.sendline(str(i).encode('iso-8859-1'))
            break

'''Task5 and iterative'''
for i in range(5, 1000):
    print(i)
    inicio = time.time()

    r.recvuntil(b'    \n'b'\n')
    cadena5 = r.recvline()

        # Tu código aquí

    # Registra el tiempo de finalización
    fin = time.time()

    # Calcula la diferencia para obtener el tiempo total
    tiempo_total = fin - inicio
    print("tiempo parcial: ", tiempo_total)

    cadena5_str = cadena5.decode('iso-8859-1') 
    porcentaje_char = re.search(r'(\d+\.\d+) %', cadena5_str) # Comprobamos operador

    if re.search(rb'%', cadena5):

        #case 1 Task 4: 1398436.97 % ? = 327.32000000000755 (No implementada)
        #case 2 Task 4: 1056530.07 % 753.53 = ?\n' (La mas sencilla)

        patron = re.compile(rb'=\s*\?')
        coincidencias = patron.search(cadena5)

    # Comprobamos donde esta ?
        if coincidencias: # Caso 2
            matches = re.findall(r'\b\d+\.\d+\b', cadena5.decode('iso-8859-1'))

            dividend = float(matches[0])
            quotient = float(matches[1])

            module = dividend % quotient
    
            output = format(module, f".10f")

            r.sendline(str("\t"+ str(module)).encode('iso-8859-1'))

        else: # Caso 1

            patron = re.compile(rb'(\d+\.\d+)\s*%\s*\?\s*=\s*(\d+\.\d+)')

            # Buscar el patrón en la cadena
            coincidencias = patron.search(cadena5)

            # Verificar el resultado
            if coincidencias:
                dividend = float(coincidencias.group(1))
                module = float(coincidencias.group(2))
               
            for n in np.arange(1, 100001):
                n = n / 100
            
                if (dividend % n) == module:
                    
                    r.sendline(str(n).encode('iso-8859-1'))
                    break

    else: # Operador // --> Task 4: 2435 // ? = 30

        matches = re.findall(r'\b\d+\b', cadena5.decode('iso-8859-1'))

        dividend = int(matches[1])
        quotient = int(matches[2])

        for i in range(1, 10000):
            if (dividend // i) == quotient:
                
                r.sendline(str(i).encode('iso-8859-1'))
                break

print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())
print(r.recvline())