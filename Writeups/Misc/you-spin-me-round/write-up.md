# Write-up: you-spin-me-round

## Category: misc

## Author tomek7667

```python
import random

def brute_force_seed(x, y, z):
    seeds_solving = []
    for i in range(0, 10_000_000):
        random.seed(i)
        _x = random.randint(1, 100)
        _y = random.randint(1, 100)
        _z = random.randint(100, 10000)
        if x == _x and y == _y and z == _z:
            seeds_solving.append(i)
    return seeds_solving


beeps = "BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP"
boops = "BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP BOOP"
beeps_count = beeps.count("BEEP")
boops_count = boops.count("BOOP")
first_x = 7542

print(brute_force_seed(beeps_count, boops_count, first_x))
```

Based on the bruteforced seed, we can predict the results of all tasks. The task3 is a special case - you need to exploit the vulnerability of limited precision of floating point numbers in python.

e.g.:

```
>>> 1.0000000000000001 == 1
True
```
