const game = document.querySelector("#game")

const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let playeur = 1

function cleanBoard () {
    while (game.firstChild)
        game.removeChild(game.firstChild)
}

function generatBoard (board) {
    cleanBoard(board)

    board.forEach((line, lineIndex) => {
        // line = [0, 1, 0]  lineIndex = 0, 1 ou 2e ligne
        const lineDiv = document.createElement("div")
        lineDiv.classList.add("line")
        game.appendChild(lineDiv)

        line.forEach((value, squareIndex) => {
            // value = 0 vide, playeur 1, playeur 2
            // squareIndex = case 1, 2 ou 3
            const square = document.createElement("div")
            square.classList.add("square")
            square.dataset.state = value
            lineDiv.appendChild(square)

            square.addEventListener("click", () => {
                if (value != 0)
                    return

                board[lineIndex][squareIndex] = playeur
                playeur = (playeur === 1 ? 2 : 1)
                generatBoard(board)
            })
        })
    })
}

generatBoard (board)