# Write-up: ziggarettes

## Category: rev

## Author tomek7667

Disassemble the binary and approach it as a standard reversing challenge.

The original code looked as follows `main.zig`:

```zig
const std = @import("std");
const strings = std.strings;

pub fn check_flag(flag: [35]u8) bool {
    var correct_flag = [35]u8{
        66,
        64,
        110,
        70,
        116,
        83,
        8,
        10,
        15,
        98,
        90,
        113,
        38,
        98,
        0,
        124,
        76,
        73,
        56,
        104,
        97,
        106,
        118,
        113,
        112,
        48,
        86,
        25,
        2,
        30,
        2,
        106,
        127,
        108,
        33,
    };
    for (flag, 0..) |j, i| {
        if (i == 0 and j ^ 50 != correct_flag[i]) {
            return false;
        } else if (i == 1 and j ^ 41 != correct_flag[i]) {
            return false;
        } else if (i == 2 and j ^ 0 != correct_flag[i]) {
            return false;
        } else if (i == 3 and j ^ 33 != correct_flag[i]) {
            return false;
        } else if (i == 4 and j ^ 15 != correct_flag[i]) {
            return false;
        } else if (i == 5 and j ^ 41 != correct_flag[i]) {
            return false;
        } else if (i == 6 and j ^ 57 != correct_flag[i]) {
            return false;
        } else if (i == 7 and j ^ 77 != correct_flag[i]) {
            return false;
        } else if (i == 8 and j ^ 80 != correct_flag[i]) {
            return false;
        } else if (i == 9 and j ^ 83 != correct_flag[i]) {
            return false;
        } else if (i == 10 and j ^ 9 != correct_flag[i]) {
            return false;
        } else if (i == 11 and j ^ 46 != correct_flag[i]) {
            return false;
        } else if (i == 12 and j ^ 80 != correct_flag[i]) {
            return false;
        } else if (i == 13 and j ^ 81 != correct_flag[i]) {
            return false;
        } else if (i == 14 and j ^ 82 != correct_flag[i]) {
            return false;
        } else if (i == 15 and j ^ 37 != correct_flag[i]) {
            return false;
        } else if (i == 16 and j ^ 19 != correct_flag[i]) {
            return false;
        } else if (i == 17 and j ^ 10 != correct_flag[i]) {
            return false;
        } else if (i == 18 and j ^ 8 != correct_flag[i]) {
            return false;
        } else if (i == 19 and j ^ 39 != correct_flag[i]) {
            return false;
        } else if (i == 20 and j ^ 13 != correct_flag[i]) {
            return false;
        } else if (i == 21 and j ^ 53 != correct_flag[i]) {
            return false;
        } else if (i == 22 and j ^ 68 != correct_flag[i]) {
            return false;
        } else if (i == 23 and j ^ 66 != correct_flag[i]) {
            return false;
        } else if (i == 24 and j ^ 68 != correct_flag[i]) {
            return false;
        } else if (i == 25 and j ^ 93 != correct_flag[i]) {
            return false;
        } else if (i == 26 and j ^ 29 != correct_flag[i]) {
            return false;
        } else if (i == 27 and j ^ 80 != correct_flag[i]) {
            return false;
        } else if (i == 28 and j ^ 73 != correct_flag[i]) {
            return false;
        } else if (i == 29 and j ^ 87 != correct_flag[i]) {
            return false;
        } else if (i == 30 and j ^ 77 != correct_flag[i]) {
            return false;
        } else if (i == 31 and j ^ 88 != correct_flag[i]) {
            return false;
        } else if (i == 32 and j ^ 15 != correct_flag[i]) {
            return false;
        } else if (i == 33 and j ^ 0 != correct_flag[i]) {
            return false;
        } else if (i == 34 and j ^ 92 != correct_flag[i]) {
            return false;
        } else if (i == 35 and j ^ 50 != correct_flag[i]) {
            return false;
        }
    }
    return true;
}

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Do you know the flag?\n", .{});
    var flag: [35]u8 = undefined;
    const stdin = std.io.getStdIn().reader();

    _ = try stdin.readAtLeast(&flag, 35);
    if (check_flag(flag)) {
        try stdout.print("Correct!\n", .{});
    } else {
        try stdout.print("Wrong!\n", .{});
    }
}
```
