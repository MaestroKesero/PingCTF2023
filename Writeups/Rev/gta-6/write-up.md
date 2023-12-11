# Write-up: gta-6

## Category: rev

## Author lexu

Binary finds all shortest paths from edge 0 to every other edge, using matrix multiplication. It takes aprox. 10 days to finish and print the shortest paths to specific edges interpreted as chars, which will be the flag.

You can solve this by extracting graph from binary and positions of flag chars on graph and writing more optimal algorithm, DFS will do.
