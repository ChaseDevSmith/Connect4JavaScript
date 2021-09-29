'use strict';
let board = $("#" + "board")
export const numberOfTiles = 42

const createBoard = () => {
        for (let i = 0; i < numberOfTiles; i++) {
            let cell = document.createElement('div')
            cell.className = "cell"
            cell.style.backgroundColor = "white"
            board.append(cell)
        }
}
createBoard()
