// const GHOST = '&#9781;';
const GHOST = '**'


var gDeadGhosts =[];
var gIntervalGhosts;
var gGhosts;
var ghostNum = 3

function createGhost(board, idNum) {
    var ghost = {
        id: idNum,
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()

    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}


function createGhosts(board) {
    gGhosts = [];
    // empty the gGhosts array, create some ghosts
    for (let i = 0; i < ghostNum; i++) {
        createGhost(board, i)
    }
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 500)
}

function moveGhosts() {
    for (var l = 0; l < gGhosts.length; l++) {
        var ghost = gGhosts[l];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)
        var nextCel = gBoard[nextLocation.i][nextLocation.j]
        // if WALL - give up
        if (nextCel === WALL) return
        // if GHOST - give up
        if (nextCel === GHOST) {
            return
        }

        // if PACMAN - gameOver
        if (nextCel === getPacmanHTML()) {
            if (gPacman.isSuper) {
                gGhosts.splice(ghost.id ,1)
                var alIdG = document.getElementById(ghost.id)
                alIdG.style.display ='none';
                return
            }else {
                gameOver()
                return
            }
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var color = (gPacman.isSuper)? 'rgb(255,255,255)': ghost.color;
    return `<span id="${ghost.id}" class="ghost" style="background-color: ${color}">${GHOST}</span>`
}




