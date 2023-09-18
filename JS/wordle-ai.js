class WordleAI {
    constructor() {

    }

    makeGuess(colorList, guess, wordlList) {
        let iList = this.makeInstructionList(colorList, guess);
        let wList = this.reduceWordList(iList, wordlList, guess);
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

    reduceWordList(instructionList, wordlList, guess) {
        let newWordList = [];
        for (const word of wordlList) {
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