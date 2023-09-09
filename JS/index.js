const VALID_LETTERS = new Set("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm".split(""));
const WORD_TOTAL = 4267;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let word = WORD_LIST.get(getRandomInt(WORD_TOTAL));
console.log(word);
let worldeGameBoard = new GameBoard(word);


function normalKeyPress(key, gameBoard) {
    gameBoard.pushLetter(key);
    writeCurrentRow(gameBoard);
}

function writeCurrentRow(gameBoard) {
    let currentRow = gameBoard.getCurrentRow().getRowList();
    let rowLetters = $(".row.row" + gameBoard.currentRow + ">*>*");

    for (let i = 0; i < currentRow.length; i++) {
        $(rowLetters[i]).text(currentRow[i]);
    }
}

function delKeyPress(gameBoard) {
    gameBoard.deleteLetter();
    writeCurrentRow(gameBoard);
}

function entKeyPress(gameBoard) {
    let colorList = gameBoard.colorCurrentRow();
    console.log(colorList)
    colorEachLetter(colorList, gameBoard);
    colorKeyboard(colorList, gameBoard);
    gameBoard.advanceNextRow();
}

function colorEachLetter(colorList, gameBoard) {
    let rowBoxes = $(".row.row" + gameBoard.currentRow + ">*");
    for (let i = 0; i < rowBoxes.length; i++) {
        if (colorList[i] === "G") {
            $(rowBoxes[i]).addClass("green");
        } else if (colorList[i] === "O") {
            $(rowBoxes[i]).addClass("orange");
        } else {
            $(rowBoxes[i]).addClass("gray");
        }
    }
}

// something is wrong here

function colorKeyboard(colorList, gameBoard) {
    let rowBoxes = $(".row.row" + gameBoard.currentRow + ">*");
    for (let i = 0; i < rowBoxes.length; i++) {
        let key = $("#" + $(rowBoxes[i].children).text().toLocaleUpperCase()).parent()
        if (colorList[i] === "W") {
            key.removeClass("gray orange green");
            key.addClass("gray")
        }
    }
    for (let i = 0; i < rowBoxes.length; i++) {
        let key = $("#" + $(rowBoxes[i].children).text().toLocaleUpperCase()).parent()
        if (colorList[i] === "O") {
            key.removeClass("gray orange green");
            key.addClass("orange")
        }
    }
    for (let i = 0; i < rowBoxes.length; i++) {
        let key = $("#" + $(rowBoxes[i].children).text().toLocaleUpperCase()).parent()
        if (colorList[i] === "G") {
            key.removeClass("gray orange green");
            key.addClass("green")
        }
    }
}

$("body").on("keypress", function(e) {
    if (VALID_LETTERS.has(e.key)) {
        normalKeyPress(e.key, worldeGameBoard);
    }
});

$("body").on("keydown", function(e) {
    if (e.key === "Delete" || e.key === "Backspace") {
        delKeyPress(worldeGameBoard);
    } else if (e.key === "Enter") {
        entKeyPress(worldeGameBoard);
    }
});
