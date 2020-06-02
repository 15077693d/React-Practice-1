import React from 'react';
import ReactDOM from 'react-dom';
import {Game} from './components/game/game.component'
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square"
        onClick={() => {
          this.props.onClick()
        }}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: 'X',
      squares: Array(9).fill(null)
    }
  }

  isWin() {
    /*
    0 1 2 
    3 4 5
    6 7 8
    */
    const combinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    let result = null
    // check combinations have ooo of xxx
    combinations.forEach(combination => {
      let flag="";
      let combinationCopy = combination.slice()
      combinationCopy.forEach(
        i => {
          flag += this.state.squares[i]
        }
      )
      if (flag === "OOO") {
        result= "O"
      }
      if (flag === "XXX") {
        result= "X"
      }
      flag = ""
    })
    return result
  }

  changeSymbol(symbol) {
    if (symbol === 'X') {
      this.setState({ symbol: 'O' })
    } else {
      this.setState({ symbol: 'X' })
    }
  }

  handleClick(i) {
    // copy
    const squares = this.state.squares.slice();
    squares[i] = this.state.symbol;
    let winSymbol = this.isWin()
    if (winSymbol) {
      return
    } else {
      this.setState({ squares: squares })
      this.changeSymbol(this.state.symbol)
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    let winSymbol = this.isWin()
    let status
    if (winSymbol) {
      status = `Winner!: ${winSymbol}`;
    } else {
      status = `Next player: ${this.state.symbol}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
