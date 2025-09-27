const game = document.querySelector('#game')
let player = 1

function cleanBoard() {
  while (game.firstChild)
    game.removeChild(game.firstChild)
}

function checkValues(v1, v2, v3) {
  return v1 === v2 && v2 === v3
}

function checkLines(board) {
  let status = false

  board.forEach(line => {
    if (status) return true

    if (!line.includes(0))
      status = checkValues(line[0], line[1], line[2])
  })

  return status
}

function checkColumns(board) {
  return checkLines([
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
  ])
}

function checkDiag(board) {
  return checkLines([
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ])
}

function croix(square, value) {
  if (value === 1)
    square.textContent = "X"
  else if (value === 2)
    square.textContent = "O"
}

function playerClick(board, valueS, lineIndex, squareIndex) {
  if (valueS !== 0)
    return

  board[lineIndex][squareIndex] = player
  player = (player === 1 ? 2 : 1)
  generateBoard(board)
}

function generateBoard (board) {
  cleanBoard()
  
  if (checkLines(board) || checkColumns(board) || checkDiag(board)) {
    alert("GAME OVER !")
    return generateBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  }

  board.forEach((line, lineIndex) => {
    const lineDiv = document.createElement('div')

    lineDiv.classList.add('line')
    game.appendChild(lineDiv)

    line.forEach((value, squareIndex) => {
      const square = document.createElement('div')

      square.classList.add('square')
      square.dataset.state = value
      lineDiv.appendChild(square)

      croix(square, value)

      square.addEventListener('click', () => {
      playerClick(board, value, lineIndex, squareIndex)
      })
    })
  })
}

generateBoard([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
])
