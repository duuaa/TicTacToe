import { cellEnum } from './../cell/cellEnum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private currentPlayer: cellEnum;
  private isGameOver: boolean;
  public board: cellEnum[][];
  public statusMessage;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }
  get gameOver(): boolean {
    return this.isGameOver;
  }
  newGame() {
    this.board = [];
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = cellEnum.EMPTY;
      }
    }
    this.currentPlayer = cellEnum.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;
  }
  move(row: number, col: number): void {
    if (!this.isGameOver && this.board[row][col] == cellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      if (this.isDraw()) {
        this.statusMessage = 'It\'s a Draw!';
        this.isGameOver = true;
      } else if (this.isWin()) {
        this.statusMessage = `Player ${this.currentPlayer} Won!`;
        this.isGameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === cellEnum.X ? cellEnum.O : cellEnum.X;
      }
    }

  }
  isDraw(): boolean {
    for (const colums of this.board) {
      for (const col of colums) {
        if (col === cellEnum.EMPTY) {
          return false;
        }
      }
    }
    return !this.isWin();
  }
  isWin(): boolean {
    //horizontal
    for (const colums of this.board) {
      if (colums[0] === colums[1] && colums[0] === colums[2] && colums[0] !== cellEnum.EMPTY) {
        return true;
      }
    }
    //vertical
    for (let col = 0; col < this.board[0].length; col++) {
      if (this.board[0][col] === this.board[1][col] && this.board[0][col] === this.board[2][col] && this.board[0][col] !== cellEnum.EMPTY) {
        return true;
      }
    }
    //diagonal
    if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2] && this.board[0][0] !== cellEnum.EMPTY) {
      return true;
    }
    if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0] && this.board[0][2] !== cellEnum.EMPTY) {
      return true;
    }
    return false;
  }
}
