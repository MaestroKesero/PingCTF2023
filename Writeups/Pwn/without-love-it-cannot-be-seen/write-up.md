# Write-up: without-love-it-cannot-be-seen

## Category: pwn

## Author brzeks

An easy blind pwn challenge exploiting the format string vulnerability. Inputting a spam of `%p` specifiers will leak stack (and register) values, then it's just an informed trial and error of finding the leaked value the program expects, which is `0x7866deafdeaf6687`.



lmao thats so funny, didnt notice it and i found a pointer to a pointer, so i was trying to return back to main with partial overwrite, but didnt had time to finish it, my input looked kinda like that (non $ args at the beg to avoid caching by printf internals) `"%c%*c%c%*c%c%c%c%c%c%c%c%c%c%c%c%c%c%*c%*c%*c%*c%{0x338-0x50-2}c%hn%59$hhn`




I dumped the stack and send `b'\x87f\xaf\xde\xaf\xdefx'` but that isn't the answer... welp.
