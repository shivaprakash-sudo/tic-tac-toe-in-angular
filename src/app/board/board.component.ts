import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    squares!: any[];
    xIsNext!: boolean;
    winner!: string | null;

    ngOnInit() {
        this.newGame();
    }

    get player() {
        return this.xIsNext ? 'X' : 'O';
    }

    newGame() {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.xIsNext = true;
    }

    makeMove(idx: number) {
        if (!this.squares[idx]) {
            this.squares.splice(idx, 1, this.player);
            this.xIsNext = !this.xIsNext;
        }
        this.winner = this.calculateWinner();
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2], // horizontal
            [3, 4, 5], // horizontal
            [6, 7, 8], // horizontal
            [0, 3, 6], // vertical
            [1, 4, 7], // vertical
            [2, 5, 8], // vertical
            [0, 4, 8], // diagonal
            [2, 4, 6]  // diagonal
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]; // destructuring
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a]; // X or O
            }
        }
        return null;
    }
}
