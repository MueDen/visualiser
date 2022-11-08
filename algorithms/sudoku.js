class SudokuSolver {
    
    constructor(){
    }

    solve(board){
        let emptySpot = this.nextEmptySpot(board);
        let row = emptySpot[0];
        let col = emptySpot[1];
    
        // there is no more empty spots
        if (row === -1){
            return board;
        }
    
        for(let num = 1; num<=9; num++){
            if (this.checkBoard(board, row, col, num)){
                board[row][col] = num;
                this.solve(board);
            }
        }
    
        if (this.nextEmptySpot(board)[0] !== -1)
            board[row][col] = 0;
    
        return board;
    }

    nextEmptySpot(board){
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (board[i][j] === 0) 
                    return [i, j];
            }
        }
        return [-1, -1];
    }

    rowValid(board, row, value){
        for(let i = 0; i < board[row].length; i++){
            if(board[row][i] === value){
                return false;
            }
        }
        return true;
    }

    columnValid(board, column, value){
        for(let i = 0; i < board.length; i++){
            if(board[i][column] === value){
                return false;
            }
        }
        return true;
    }

    squareValid(board, row, column, value){
        let boxRow = Math.floor(row / 3) * 3;
        let boxCol = Math.floor(column / 3) * 3;
        
        for (var r = 0; r < 3; r++){
            for (var c = 0; c < 3; c++){
                if (board[boxRow + r][boxCol + c] === value)
                    return false;
            }
        }

        return true;
    }

    checkBoard(board, row, column, value){
        if(this.rowValid(board, row, value) && this.columnValid(board, column, value) && this.squareValid(board, row, column, value)){
            return true;
        }

        return false;
    }
}


const sudoku = [[0,0,0,0,0,0,9,0,1],
                [0,7,0,0,0,0,5,0,4],
                [3,0,0,1,0,8,0,6,0],
                [9,0,8,0,0,0,0,0,0],
                [0,6,0,0,0,0,7,0,0],
                [4,0,0,0,0,3,0,5,0],
                [7,0,6,3,0,0,0,0,5],
                [0,0,0,0,2,7,0,0,0],
                [0,0,0,9,0,0,6,0,0]];

const sudokuSolved = [
    [5,8,2,4,7,6,9,3,1],
    [6,7,1,2,3,9,5,8,4],
    [3,4,9,1,5,8,2,6,7],
    [9,5,8,7,6,1,3,4,2],
    [1,6,3,5,4,2,7,9,8],
    [4,2,7,8,9,3,1,5,6],
    [7,9,6,3,1,4,8,2,5],
    [8,3,5,6,2,7,4,1,9],
    [2,1,4,9,8,5,6,7,3]];

let result = new SudokuSolver().solve(sudoku);
function equal(array1, array2) {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 === array2;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (var i = 0, len = array1.length; i < len; i++) {
        if (!equal(array1[i], array2[i])) {
            return false;
        }
    }

    return true;
}


console.log(equal(result, sudokuSolved));
