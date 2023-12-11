# Write-up: ancient-genius

## Category: crypto

## Author P1T4G0R45

The challenge presents a cryptic sequence of Fibonacci numbers associated with the grave of a mysterious individual. The provided Python code implies a cryptographic scheme based on the Fibonacci sequence. In this scheme, characters from a given text are converted into corresponding Fibonacci values based on their ASCII representation.

## Code Overview

1. **Fibonacci Generation:**
   The script starts by generating a Fibonacci sequence using the `fibonacci` function.

```python
def fibonacci(n):
    fib_sequence = [0, 1]
    while len(fib_sequence) < n:
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    return fib_sequence

    def text_to_fibonacci(text,fib_array):
        fib_sequence = fib_array
        result = []

        for char in text:
            ascii_value = ord(char)
            fib_value = fib_sequence[ascii_value]
            result.append(fib_value)

        return result

    def fibonacci_to_text(fibonacci_values, target_index):
        fib_sequence = fibonacci(len(fibonacci_values))

        try:
            index = fib_sequence.index(target_index)
            char = chr(index)
            return char
        except ValueError:
            return "?"

    fib_sequence = fibonacci(300)


    text = "ping{1_w@s_b0rn_1n_ii75_p1za}"
    fibonacci_values = text_to_fibonacci(text,fib_sequence)

    print(f"Fibonacci values for the characters in '{text}':")
    print(fibonacci_values)


    fibonacci_values = [114059301025943970552219, 3928413764606871165730, 43566776258854844738105, 1500520536206896083277, 22698374052006863956975682, 781774079430987230203437, 573147844013817084101, 483162952612010163284885, 781774079430987230203437, 70492524767089125814114, 3311648143516982017180081, 83621143489848422977, 31940434634990099905, 927372692193078999176, 16641027750620563662096, 83621143489848422977, 1500520536206896083277, 83621143489848422977, 59425114757512643212875125]
    target_index = fibonacci_values[0]
    output = ""
    for v in fibonacci_values:
        output+=str(fibonacci_to_text(fib_sequence, v))

    print(f"Original character for the Fibonacci value")
    print(output)
```
