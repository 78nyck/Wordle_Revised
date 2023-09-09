class GameRow {
    constructor() {
        this.rowList = (new Array(5)).fill(" ");
        this.currentIndex = 0;
        this.rowColors = [];
    }

    add(letter) {
        if (this.currentIndex === 5 && this.rowList[5] === " ") {
            this.rowList[this.currentIndex] = letter;
        } else if (this.currentIndex < 5) {
            this.rowList[this.currentIndex] = letter;
            this.currentIndex++;
        }
    }

    delete() {
        if (this.currentIndex === 0) {
            this.rowList[this.currentIndex] = " ";
        } else if(this.currentIndex > 0) {
            this.currentIndex--;
            this.rowList[this.currentIndex] = " ";
        } 
    }

    getRowList() {
        return this.rowList;
    }

    colorRow(target) {
        if (this.rowList.includes(" ")) {
            return ["X"];
        } else if (!VALID_GUESSES.has(this.rowList.join(""))){
            return ["X"];
        }else {
            let guess = this.rowList.join("");
            let colors = new Array(target.length);
            let letterCounts = {};

            for (let i = 0; i < target.length; i++) {
                let letter = target[i];

                if (letter === guess[i]) {
                    colors[i] = "G";
                } else {
                    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
                }
            }

            for (let i = 0; i < guess.length; i++) {
                let letter = guess[i];
                if (letter !== target[i]) {
                    if (letterCounts[letter] > 0) {
                        colors[i] = "O";
                        letterCounts[letter]--;
                    } else {
                        colors[i] = "W";
                    }
                }
            }
            this.rowColors = colors;
            return colors;
        }
    }
}

class GameBoard {
    constructor(targetWord) {
        this.board = {
            1: new GameRow(),
            2: new GameRow(),
            3: new GameRow(),
            4: new GameRow(),
            5: new GameRow(),
            6: new GameRow()
        };
        this.targetWord = targetWord;
        this.currentRow = 1;
    }

    getCurrentRow() {
        return this.board[this.currentRow];
    }

    advanceNextRow() {
        if (this.getCurrentRow().currentIndex === 5 && this.getCurrentRow().rowList[5] !== " ") {
            this.currentRow++;
        }
    }

    pushLetter(letter) {
        if (this.currentRow <= 6) {
            this.board[this.currentRow].add(letter);
        }
    }

    deleteLetter() {
        if (this.currentRow <= 6) {
            this.board[this.currentRow].delete();
        }
    }

    colorCurrentRow() {
        return this.board[this.currentRow].colorRow(this.targetWord);
    }
}
