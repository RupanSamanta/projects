class Sudoku {
   constructor(board) {
      this.board = board;
   }
      isValid(num, row, col) {

      for (let i = 0; i < 9; i++) {
         if (this.board[i][col] == num) {
            return false;
         }
      }

      for (let i = 0; i < 9; i++) {
         if (this.board[row][i] == num) {
            return false;
         }
      }

      let startRow = Math.floor(row / 3) * 3;
      let startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
         for (let j = startCol; j < startCol + 3; j++) {
            if (this.board[i][j] == num) {
               return false;
            }
         }
      }
      return true;
   }
   isBoardValid() {
      for (let i=0; i<9; i++) {
         for (let j=0; j<9; j++) {
            let num = this.board[i][j];
            if (num != 0) {
               this.board[i][j] = 0;
               if (!this.isValid(num, i, j)) {
                  return false;
               }
               this.board[i][j] = num;
            }
         }
      }
      return true;
   }
   solve() {
      if (!this.isBoardValid()) {
         return false;
      }
      for (let i=0; i<9; i++) {
         for (let j=0; j<9; j++) {
            if (this.board[i][j] == 0) {
               for (let k=1; k<=9; k++) {
                  if (this.isValid(k, i, j)) {
                     this.board[i][j] = k;
                     if (this.solve()) {
                        return true;
                     }
                     this.board[i][j] = 0;
                  }
               }
               return false;
            }
         }
      }
      return true;
   }
   getBoard() {
      return this.board;
   }
}
