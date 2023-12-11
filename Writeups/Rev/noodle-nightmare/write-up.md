# Write-up: noodle-nightmare

## Category: rev

## Author lexu

compile code
>g++ noodleNigghtmare.cpp

break on string compare to see flag in plaintext 
or analyze binary staticly 

I inserted the following lines at the end of `noodleNightmare.cpp` at line 890, right after the semi-colon. Compile and run with any input. 

```cpp
;                       // line #890
cout << ____ << endl;   // add these two lines to print our input and the actual flag
cout << __ << endl;     // one of these is the flag, the other is our input
```
https://meashiri.github.io/ctf-writeups/posts/202312-pingctf/#noodle-nightmare
