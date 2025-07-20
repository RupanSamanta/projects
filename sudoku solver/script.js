let activeCell = -1;
let activeValue = -1;
let cell;
let board;
const solveButton = document.getElementById('solve-board');
const resetButton = document.getElementById('reset-board');
const dialogBoxBg = document.getElementById('dialog-box-background');

document.body.onload = function () {
   createBoard();
   createButtons();
   cell = document.querySelectorAll('.cell');
   activateCell();
   fillNumber();
   initialBoard();
   solveButton.onclick = solveBoard;
   resetButton.onclick = resetBoard;
}

function createBoard() {
   const board = document.getElementById('board');
   for (let i=0; i<81; i++) {
     const grid = document.createElement('div');
     grid.className = 'grid';
     const cell = document.createElement('div');
     cell.className = 'cell';
     cell.setAttribute('data-id', 0);
     cell.setAttribute('data-value', 0);
     grid.appendChild(cell);
     board.appendChild(grid);
   }
}

function createButtons() {
   const buttonsInput = document.querySelectorAll('.buttons__input')[0];
   for (let i=1; i<=9; i++) {
      const button = document.createElement('button');
      button.value = i;
      button.innerHTML = i;
      button.className = 'input';
      buttonsInput.appendChild(button);
   }
   const button = document.createElement('button');
   button.value = 0;
   button.innerHTML = 'X';
   button.className = 'input';
   buttonsInput.appendChild(button);
}

function activateCell() {
   cell.forEach((elem, ind)=> {
      elem.onclick = function () {
         if (activeValue == -1) {
         cell.forEach(function(c_elem, c_ind) {
            if (c_ind != ind) {
               c_elem.id = '';
               c_elem.setAttribute('data-id', 0);
            }
         });
         let id = elem.getAttribute('data-id');
         if (!Number(id)) {
            activeCell = ind;
            id = 1;
            elem.id = 'active';
         } else {
            activeCell = -1;
            id = 0;
            elem.id = '';
         }
         elem.setAttribute('data-id', id);
         }
         else {
            elem.setAttribute('data-value', activeValue);
            if (activeValue == 0) {
               elem.innerHTML = '';
               elem.classList.remove('activeCell');
            }
            else {
               elem.innerHTML = activeValue;
               elem.classList.add('activeCell');
            }
         }
     }
  });
}

function fillNumber() {
   const inputButton = document.querySelectorAll('.input');
   inputButton.forEach((elem, index)=> {
      elem.onclick = function () {
         if (activeCell != -1) {
            let val = elem.value;
            let active = cell[activeCell];
            active.setAttribute('data-value', val);
            if (val == 0) {
               active.innerHTML = '';
               active.classList.remove('activeCell');
            }
            else {
               active.innerHTML = val;
               active.classList.add('activeCell');
            }
         } 
         else {
            inputButton.forEach((e, i)=> {
               if (index != i)
                  e.id = '';
            });         
            if (elem.id == 'activeButton') {
               elem.id = '';
               activeValue = -1;
            }
            else {
               elem.id = 'activeButton';
               activeValue = Number(elem.value);
            }
         }
      }
   });
}

function initialBoard() {
   board = [];
   for (let i=0; i<9; i++) {
      let rows = [];
      for (let j=0; j<9; j++) {
         rows.push(0);
      }
      board.push(rows);
   }
}

function setBoard() {
   runLoop((row, col, i)=> {
      board[row][col] = Number(cell[i].getAttribute('data-value'));
   });
}

function solveBoard() {
   setBoard();
   const obj = new Sudoku(board);
   let bool = obj.solve();
   if (bool) {
      board = obj.getBoard();
      runLoop((row, col, i)=> {
         let val = board[row][col];
         cell[i].setAttribute('data-value', val);
         cell[i].innerHTML = val;
      });
      gameAlert({
         text: 'Hurray! The board is solved.',
         button: ['Okay'],
         func: [closeDialogBox]
      });
   } else {
      gameAlert({
         text: 'Oops! No possible solutions found.',
         button: ['Okay'],
         func: [closeDialogBox]
      });
   }
}

function resetBoard() {
   gameAlert({
      text: 'Do you want to reset the board?',
      button: ['Yes', 'No'],
      func: [resetBoardIfTrue, closeDialogBox]
   });
}
function resetBoardIfTrue() {
   runLoop((row, col, i)=> {
      cell[i].setAttribute('data-value', board[row][col] = 0);
      cell[i].innerHTML = '';
      cell[i].classList.remove('activeCell');
      cell[i].style.transform = 'scale(1)';
   });
   initialBoard();
   closeDialogBox();
}

function runLoop(func) {
   let [row, col] = [0, 0];
   for (let i=0; i<81; i++) {
      row = parseInt(i / 9);
      col = i % 9;
      func(row, col, i);
   }
}

function gameAlert(obj) {
   const messageBox = dialogBoxBg.querySelectorAll('.message')[0];
   const buttons = dialogBoxBg.querySelectorAll('button');
   const dialogBox = dialogBoxBg.querySelectorAll('.dialog-box')[0];
   
   buttons.forEach((elem, ind)=> {
      elem.style.display = 'none';
      elem.onclick = obj.func[ind];
   });
   obj.button.forEach((val, ind)=> {
      buttons[ind].innerHTML = val;
      buttons[ind].style.display = 'block';
   });
   messageBox.innerHTML = obj.text;
   
   dialogBox.style.animationName = 'ascend';
   dialogBoxBg.style.display = 'grid';
   dialogBoxBg.style.opacity = 1;
}

function closeDialogBox() {
   const dialogBox = dialogBoxBg.querySelectorAll('.dialog-box')[0];
   setTimeout(function () {
      dialogBox.style.animationName = 'descend';
      dialogBoxBg.style.opacity = 0;
      setTimeout(function () {
         dialogBoxBg.style.display = 'none';
      }, 500);
   }, 300);
}
