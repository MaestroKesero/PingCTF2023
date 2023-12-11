# Write-up: internet-cat

## Category: misc

## Author tomek7667

1. Find gist link in `nc.exe` file (binwalk) - decode it from base64
2. Go to the gist and remove the trailing link to the .txt file to see the current value of the gist.
3. Go to revisions and copy the numbers to cyberchef
4. Use `magic` with appropriate depth and save as png. Scan qr and go to link
5. Base64 decode the text and save as `abc.zip`
6. Crack the password - should be: `billabong`
7. Enjoy your flag :)
