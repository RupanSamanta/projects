const square = $('.square'),
      players = $('.players'),
      resetButton = $('#reset'),
      status_box = $('#status-box'),
      selectTypePlayer = $('#select-type-player'),
      selectType = $('input[name="select-type"]'),
      statusBox = $('#displa')
      typeBox = $('#type'),
      turn = $('#turn');
let board = ['','','','','','','','',''],
    game_type, beginMove = '', firstMove, 
    currentPlayer, cpuSymbol, winnerSquares = '',
    score = {
        playerX: 0, draw: 0, playerO: 0
    };

document.body.onload = ()=> {
    let main = $('main')[0];
    selectTypePlayer.style.height = main.offsetHeight + 'px';
    selectTypePlayer.style.width = main.offsetWidth + 'px';
        setTimeout(()=> {
            selectTypePlayer.style.opacity = 1;
        }, 500);
}

$('#play').addEventListener('click', ()=> {
    disbaleSquare(true);
    resetButton.innerText = 'Reset';
    const selectType = $('input[name="select-type"]:checked'),
    selectPlayer = $('input[name="select-player"]:checked')[0];
    square.forEach((e, i)=> {
        e.innerHTML = '';
        e.classList.remove('filled');
        e.style.opacity = 1;
        board[i] = '';
    });
    score = {
        playerX: 0, draw: 0, playerO: 0
    };
    updateScore();
    beginMove = currentPlayer = 
    firstMove = selectPlayer.id;
    game_type = Number(selectType[0].id);
    let scoreElem = $('.score'),
        plx = scoreElem[0].firstElementChild,
        ply = scoreElem[2].firstElementChild;
    if (game_type == 1) {
        plx.innerText = 'Player X';
        ply.innerText = 'Player Y';
        typeBox.innerText = 'vs Player';
        disbaleSquare(false);
    }
    else {
        if (beginMove == 'X') {
            plx.innerText = 'You (X)';
            ply.innerText = 'CPU (O)';
            cpuSymbol = 'O';
            disbaleSquare(false);
        }
        else {
            beginMove = currentPlayer = firstMove = 'X';
            printTurn();
            plx.innerText = 'CPU (X)';
            ply.innerText = 'You (O)';
            cpuSymbol = 'X';
        }
        typeBox.innerText = 'vs CPU';
    }
    turn.style.opacity = 1;
    status_box.style.transform = 'translate(-50%, -50%) scale(0)';
    status_box.style.opacity = 0;
    printTurn();
    setTimeout(()=> {
        selectTypePlayer.style.transform = 'translate(-50%, -50%) scale(0)';
        selectTypePlayer.style.opacity = 0;
        $('main')[0].style.opacity = 1;
        setTimeout(()=> {
            if (game_type == 0 && cpuSymbol == 'X')
                updateCPUMoves();
        }, 800);
        setIndexFunction();
    }, 500);
});

selectType[0].addEventListener('click', ()=> {
    $('#start-by').innerText = 'Play as';
});
selectType[1].addEventListener('click', ()=> {
    $('#start-by').innerText = 'Start with';
});

typeBox.addEventListener('click', ()=> {
   if (confirm('Go back to Settings?')) {
      $('main')[0].style.opacity = 0;
      selectTypePlayer.style.transform = status_box.style.transform = 'translate(-50%, -50%) scale(1)';
      selectTypePlayer.style.opacity = 1;
   }
});

let interval;
resetButton.addEventListener('click', resetGame);
resetButton.addEventListener('touchstart', ()=> {
    let time = new Date();
    interval = setInterval(()=> {
        if (new Date() - time >= 500) {
            clearInterval(interval);
            if(confirm('Reset Everything?')) {
                resetAll();
            }
        }
    }, 1);
});
resetButton.addEventListener('touchend', ()=> {
    clearInterval(interval);
});

function setIndexFunction () {
   square.forEach((e, i)=> {
      e.addEventListener('click', ()=> {
         if (board[i] === '') {
            e.classList.add('filled');
            navigator.vibrate(50);
            insertSymbol(e);
            board[i] = currentPlayer;
            checkOrSwitch();
            printTurn();
            if (game_type == 0 && currentPlayer == cpuSymbol) {
                disbaleSquare(true);
                setTimeout(updateCPUMoves, 500);
            }
            else
                disbaleSquare(false);
         }
      });
   });
}      

function checkWinner(player) {
    const winPattern = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for(let i=0; i<winPattern.length; i++) {
        let arr = winPattern[i];
        if(board[arr[0]] == player && board[arr[0]] == board[arr[1]] && board[arr[1]] == board[arr[2]])
        {
          winnerSquares = arr;
          return true;
        }
    }
    return false;
}

function getEmptyCells() {
    const emptyCells = [];
    for (let i = 0; i < 9; i++)
        if (board[i] === '')
            emptyCells.push(i);
    return emptyCells;
}

function onWin() {
    navigator.vibrate([300,300]);
    resetButton.innerText = 'Replay';
    board = board.map(v=> ' ');
    setTimeout(()=> {
      square.forEach((v)=> {
        v.style.opacity = 0.5;
      });
      winnerSquares.forEach((i)=> {
        square[i].style.opacity = 1
      });
    }, 250);
    setTimeout(()=> {
        displayStatus(currentPlayer);
        updateScore(currentPlayer);
        firstMove = switchPlayer(firstMove);
    }, 1000);
}

function onDraw() {
    navigator.vibrate([70,70]);
    resetButton.innerText = 'Replay';
    setTimeout(()=> {
        displayStatus('draw');
        updateScore('draw');
        firstMove = switchPlayer(firstMove);
    }, 500);
}

function updateScore(val) {
    if(val == 'X')
        score.playerX++;
    else if(val == 'O')
        score.playerO++;
    else if(val == 'draw')
        score.draw++;
    $('#playerX').innerHTML = score.playerX;
    $('#playerO').innerHTML = score.playerO;
    $('#draw').innerHTML = score.draw;
}

function resetGame() {
    this.innerText = 'Reset';
    turn.innerHTML = `${firstMove}'s Turn`;
    turn.style.color = `var(--${firstMove})`;
    currentPlayer = firstMove;
    $('.line-container').innerHTML = '';
    square.forEach((e)=> {
        e.innerHTML = '';
        e.style.opacity = 1;
        e.classList.remove('filled');
    });
    status_box.style.transform = 'translate(-50%, -50%) scale(0)';
    status_box.style.opacity = 0;
    turn.style.opacity = 1;
    board = board.map(v=> '');
    if (game_type == 0 && cpuSymbol == firstMove) {
        disbaleSquare(true);
        setTimeout(updateCPUMoves, 500);
    }
    else {
        disbaleSquare(false);
    }
}

function resetAll() {
    resetGame();
    score = {
        playerX: 0, draw: 0, playerO: 0
    };
    currentPlayer = firstMove = beginMove;
    printTurn();
    updateScore('');
}

function displayStatus(val) {
    status_box.style.transform = 'translate(-50%, -55%) scale(1)';
    status_box.style.opacity = 1;
    turn.style.opacity = 0;
    if (val != 'draw') {
        status_box.innerHTML = `
           <button id="${currentPlayer}" class="players">
               <span class="player-${currentPlayer == 'X' ? 'x' : 'o'}"></span>
           </button>
           <span>Winner</span>
        `;
        if (currentPlayer != 'X')
            animateO(status_box
            .querySelectorAll('.player-o')[0]);
    }
    else {
        status_box.innerHTML = `
            <button id="XO" class="players">
                <span class="player-x"></span>
                <span class="player-o"></span>
           </button>
           <span>Draw</span>
        `;
        animateO(status_box
        .querySelectorAll('.player-o')[0]);
    }
}

function insertSymbol(e) {
    let span = document.createElement('span');
    span.className = `player-${currentPlayer == 'X' ? 'x' : 'o'}`;
    e.appendChild(span);
    if (currentPlayer != 'X')
        animateO(span);
}

function printTurn() {
    turn.innerHTML = `${currentPlayer}'s Turn`;
    turn.style.color = `var(--${currentPlayer})`;
}

function checkOrSwitch() {
    if(checkWinner(currentPlayer))
        onWin();
    else if (board.every(x=> x != ''))
        onDraw();
    else
        currentPlayer = switchPlayer(currentPlayer);
}

function switchPlayer(val) {
    return val == 'X' ? 'O' : 'X';
}

function disbaleSquare(bool) {
    bool = bool ? 'none' : 'auto';
    square.forEach((e)=> {
        e.style.pointerEvents = bool;
    });
    resetButton.style.pointerEvents = bool;
}

function random(max, min) {
    return Math.round(Math.random() * max - min );
}

function animateO(elem) {
    let i = 0, interval = 
    setInterval(()=> {
        if (i > 100) { 
            clearInterval(interval);
        }
        else {
            elem.style.background = `conic-gradient(var(--O) 0 ${i}%, transparent 0 ${100 - i}%)`;
            i+= 5;
        }
    }, 10);
}

function updateCPUMoves() {
    const cell = cpuMove();
    board[cell] = cpuSymbol;
    square[cell].classList.add('filled');
    navigator.vibrate(50);
    insertSymbol(square[cell]);
    checkOrSwitch();
    printTurn();
    setTimeout(()=> {
        disbaleSquare(false);
    }, 500); 
}

function drawLine(index1, index2) {
  const box1 = square[index1];
  const box2 = square[index2];
  console.log(index1, index2)
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  if (index1 % 3 === index2 % 3) {
  // Draw vertically if indices are in the same column
    line.setAttribute('x1', box1.offsetLeft + box1.offsetWidth / 2);
    line.setAttribute('y1', box1.offsetTop);
    line.setAttribute('x2', box2.offsetLeft + box2.offsetWidth / 2);
    line.setAttribute('y2', box2.offsetTop + box2.offsetWidth);
  } else {
    // Draw horizontally if indices are in the same row
    line.setAttribute('x1', box1.offsetLeft);
    line.setAttribute('y1', box1.offsetTop + box1.offsetHeight / 2);
    line.setAttribute('x2', box2.offsetLeft + box2.offsetWidth);
    line.setAttribute('y2', box2.offsetTop + box2.offsetHeight / 2);
  }
  line.classList.add('line');
  line.style.stroke = `var(--${currentPlayer})`;
  $('.line-container')[0].appendChild(line);
}

function cpuMove() {
    // Check for winning move
    const emptyCells = getEmptyCells(),
          userSymbol = switchPlayer(cpuSymbol);    
          
    //play at any corner if first move is center
    let corners = [0, 2, 6, 8],
        sidecells = [[0,1,2], [0,3,6], [2,5,8], [6,7,8]];
    if (board[4] != '') {
        // only center is occupied by opponent 
        if (emptyCells.length == 8 || (emptyCells.length == 7 && corners.every(v=>board[v] == ''))) {
            return corners[random(3, 0)];
        }
        // cpu opposite to player in diagonal
        else if (emptyCells.length == 6) {
            let j = 3;
            // opposite corners has different symbols
            for (let i = 0; i < corners.length; i++, j--) {
                if (board[corners[i]] == cpuSymbol && board[corners[j]] == userSymbol) {
                    let x = corners[i],
                        y = corners[j];
                    corners.splice(corners.indexOf(x), 1);
                    corners.splice(corners.indexOf(y), 1);
                    return corners[random(1, 0)];
                }
            }
            // if both corner of diagonal has player symbol 
            j = 3;
            for (let i = 0; i < corners.length; i++, j--) { 
                if (board[corners[i]] == userSymbol && board[corners[j]] == userSymbol) {
                    corners = [1, 3, 5, 7];
                    return corners[random(3, 0)];
                }
            }
           if (corners.every(v=>board[v] == '')) {
              for (let i = 0; i < sidecells.length; i++) {
                 let cells = sidecells[i]; 
                 if (board[cells[1]] == userSymbol) {
                    cells.splice(1, 1);
                    return cells[random(1,0)];
                 }
              }  
           }
        }
    }
    
    let cell = '';
    // check for a winning move
    for (let i = 0; i < emptyCells.length; i++) {
        cell = emptyCells[i];
        board[cell] = cpuSymbol;
        if (checkWinner(cpuSymbol)) {
            return cell;
        }
        board[cell] = '';
    }

    // Check for blocking user's winning move
    for (let i = 0; i < emptyCells.length; i++) {
        cell = emptyCells[i];
        board[cell] = userSymbol;
        if (checkWinner(userSymbol)) {
            return cell;
        }
        board[cell] = '';
    }
    
    if (emptyCells.length == 5) {
        let flag = true;
        // checking if corners are not empty
        for (let i = 0; i < corners.length; i++) {
            if (!emptyCells.includes(corners[i])) {
                flag = false;
                break;
            }
        }
        /* if a corner is empty
           play a multiple winning move */
        if (flag) {
            for (let i = 0; i < sidecells.length; i++) {
                if (board[sidecells[i][1]] == cpuSymbol) {
                    sidecells = sidecells[i];
                    sidecells.splice(1, 1);
                    if (board[sidecells[0]] + board[sidecells[1]] == '') {
                        return sidecells[random(1,0)];
                    }
                }
            }
        }
   }
    
    // Choose a strategic move
    const strategicMove = emptyCells.find(x => x === 4) || emptyCells[random(emptyCells.length-1, 0)];
    return strategicMove;
}

function $(str) {
    if (str.search('#') == -1)
       return document.querySelectorAll(str);
    else
       return document.querySelector(str);
}

let delay = -0.5;
("TICTACTOE").split('').forEach((v, i)=> {
    let span = document.createElement('span');
    span.innerText = v;
    span.style.animationDelay = delay+'s';
    delay += 0.1;
    $('header')[0].appendChild(span);
});
              
