// const PACMAN = '&#128522';
var PACMAN ='`';

var gPacman;


function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = getPacmanHTML();
}


var emptyArray = [];
function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score

  if (nextCell === FOOD) {
    emptyArray.push({i:nextLocation.i, j:nextLocation.j})
    updateScore(1);
    if (countFood - 1 === gGame.score) {
      alert('Good Job!!!')
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  } else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      var indxG = findGhost(nextLocation.i,nextLocation.j)
      if (gGhosts[indxG].currCellContent === FOOD) {
        updateScore(1);
        gGhosts[indxG].currCellContent = EMPTY
      }
      console.log(gGhosts[indxG]);
      gDeadGhosts.push(...gGhosts.splice(indxG, 1));
    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  } else if (nextCell === POWERFOOD) {
    if (gPacman.isSuper) return
    gPacman.isSuper = true;
    // console.log(elGhost,'33333333');
    for (let i = 0; i < gGhosts.length; i++) {
      var currentG = gGhosts[i];
      renderCell(currentG.location , getGhostHTML(currentG));
    }
    // console.log('is super is:(T)', gPacman.isSuper);
    setTimeout(function () {
      gPacman.isSuper = false; console.log('is super is:(F)', gPacman.isSuper);
      gGhosts.push(...gDeadGhosts)
    }, 5000);
  }else if (nextCell===CHERRY) {
    gGame.bonusScore += 10
    console.log('111111', gGame.bonusScore);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = getPacmanHTML(gPacman.location.keyB);
  // Render updated model to the DOM
  renderCell(gPacman.location, getPacmanHTML(gPacman.location.keyB));

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
    keyB: keyboardEvent.code
  }
  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
      case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function findGhost (i,j){
  for (let l = 0; l < gGhosts.length; l++) {
   if (gGhosts[l].location.i === i && gGhosts[l].location.j === j){
     return l
   }
  }
}

function getPacmanHTML(arrowP) {
  return `<div id="pacman" class="${arrowP}">${PACMAN}</div>`
}

