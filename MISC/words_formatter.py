rawText = open("MISC/words.txt", "r")
formattedText = open("MISC/valid-guesses.txt", "w")

toWrite = "const VALID_GUESSES = new Set(["
for line in rawText:
    toWrite = toWrite + '"' + line.strip() + '", '

toWrite = toWrite[0: -2] + "]);"
formattedText.write(toWrite)

rawText.close()
formattedText.close()
