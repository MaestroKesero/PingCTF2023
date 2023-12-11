# Write-up: imag-ine-an-elf

## Category: rev

## Author tomek7667

1. Extract the information about the pixels (RGB values) into an array using a script. For that you can use PIL library for python.
2. Flatten the array into a 1D array.
3. Inspect the data and find that red and blue channels are pretty random, however the green one only has 3 values: 180, 181, 182.
4. Convert the green channel into binary (split every 8 bits):
    1. 180 -> 0
    2. 181 -> 1
    3. Notice that 182 green values are only at the end of the array, so they are probably padding.
5. Now you have an array of binary arrays, each of length 8. Convert them into bytes. Save them into a file.
6. Check `file` command on this file:

```bash
> file elf
elf: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=df56f1d1999ed3c5c33a3962835c68b94f890be9, for GNU/Linux 3.2.0, not stripped
```

7. Run the file:

```bash
> ./elf
/elf
Enter the flag: <your_flag>
Wrong!
```

8. Disassemble the file using any given tool (e.g. Ghidra, IDA, radare2, etc.)
9. The source code of this program is a pretty simple reversing challenge:

```c
#include <stdio.h>
#include <string.h>

void check_flag(char *flag) {
	if (strlen(flag) != 34) {
		printf("Wrong!\n");
		return;
	}

	int final[34] = {96, 4958, 94, 84, 107, 114, 33, 4866, 51, 108, 36, 4953, 84, 4968, 98, 0, 70, 4968, 103, 4868, 92, 95, 79, 4931, 88, 57, 68, 6, 79, 4933, 36, 4933, 35, 78};
	for (int i = 0; i < 34; i++) {
		if (i % 2 == 0) {
			if ((flag[i] - 0x10) != final[i]) {
				printf("Wrong!\n");
				return;
			}
			continue;
		}
		if (i % 3 == 0) {
			if ((flag[i] ^ 0x33) != final[i]) {
				printf("Wrong!\n");
				return;
			}
			continue;
		}
		if (i % 5 == 0) {
			if ((flag[i] + 0x05) != final[i]) {
				printf("Wrong!\n");
				return;
			}
			continue;
		}
		if ((flag[i] ^ 0x1337) != final[i]) {
			printf("Wrong!\n");
			return;
		}
	}
	printf("Correct! The flag is: %s\n", flag);
}


int main() {
	char flag[34];
	printf("Enter the flag: ");
	scanf("%s", flag);
	check_flag(flag);
	return 0;
}
```
