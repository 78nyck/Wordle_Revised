class WordleAI {
    constructor(wordList) {
        this.wordList = wordList;
        this.guessNumber = 0;
    }

    makeGuess(colorList, guess, wordList) {
        let iList = this.makeInstructionList(colorList, guess);
        let wList = this.reduceWordList(iList, wordList, guess);
        return wList;
    }

    makeInstructionList(colorList, guess) {
        let instructionList = {};
        for (let i = 0; i < colorList.length; i++) {
            if (colorList[i] === "G") {
                instructionList[guess[i]] = ["G", i];
            } else if (colorList[i] === "O") {
                instructionList[guess[i]] = ["O", i];
            } else {
                instructionList[guess[i]] = ["W"];
            }
        }
        return instructionList;
    }

    reduceWordList(instructionList, wordList, guess) {
        let newWordList = [];
        for (const word of wordList) {
            if (this.checkWordValidity(word, instructionList, guess)) {
                newWordList.push(word);
            }
        }
        return newWordList;
    }

    checkWordValidity(word, instructionList, guess) {
        let result = true;
        for (const letter of guess) {
            if (instructionList[letter][0] === "G") {
                result = result && (word[instructionList[letter][1]] === letter);
            } else if (instructionList[letter][0] === "O") {
                result = result && ((word[instructionList[letter][1]] !== letter) && word.includes(letter));
            } else {
                result = result && (!(word.includes(letter)));
            }
        }
        return result;
    }
}