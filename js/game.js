'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = 'O'
const CHERRY = '🍒'

var gBoard;
var gGame = {
  score: 0,
  bonusScore: 0,
  isOn: false,
};
var countFood = 0;

function init() {
  gBoard = buildBoard();
  gGame.score = 0;
  var elScore = document.querySelector('h3 span');
  elScore.innerText = '0'

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  setTimeout(() => {
    setInterval(() => { spawnCherry() }, 10000);
  }, 5000)
  // debugger
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === 1 && j === 8 ||
        i === 8 && j === 1 || i === 8 && j === 8) {
        board[i][j] = POWERFOOD;
      }
      if (board[i][j] === FOOD) countFood++
    }
  }

  // setTimeout(() => {
  //   setInterval(() => { spawnCherry() }, 10000);
  // }, 5000)
  return board;
}
 

function spawnCherry() {
  var randomCell = getRandomIntInclusive(0, emptyArray.length - 1)
  var cellC = gBoard[emptyArray[randomCell].i][emptyArray[randomCell].j]
  if(cellC === EMPTY) cellC = CHERRY;
  var cherryLocation = { i: emptyArray[randomCell].i, j: emptyArray[randomCell].j }
  renderCell(cherryLocation, CHERRY)

}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score + gGame.bonusScore;
}


function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  var elStartA = document.querySelector('.restart');
  elStartA.style.display = 'block';

}

function restartG(elRes) {
  elRes.style.display = 'none'
  init()
}




