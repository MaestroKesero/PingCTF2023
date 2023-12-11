# Write-up: wow

## Category: misc

## Author tomek7667

It is relatively easy to brute force the seed initialized at the beggining of the game based on the rolled values.

If you manage to crack the seed, then you should be able to foresee next rolls and bet all-in when you are sure you will win and bet only 1 when you are sure you will lose.





Using a simple python script you could crack the seed.

the seed was was randomly set at the beginning and all of the `random.randint` variables were displayed to the user, so betting 1 dollar each round would give you more than enough known random.randint results.

Then a simple for loop

```python
matching_seeds = []
for possible_seed in range(1, <max seed value>):
     random.seed(possible_seed)
     if random.randint(1, 100) != <first value>:
          continue
     if random.randint(1, <first random result>) != <second random result>:
          continue
     ...
     # and if you check all of the other conditions you see that the 'possible_seed' could have been the one the server used.
     matching_seeds.append(possbile_seed)
```

after that you would have a list of possible seeds that might have been used during your game session. If you have only one seed, you can be sure that it was the one that was used.

Then the last step would be to automate the betting process:
- if you know you are going to loose the next round, simply bet 1
- if you know you are going to win the next round, simply bet `min(your_balance, opponent_balance)`
