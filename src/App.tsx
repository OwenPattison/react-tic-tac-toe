import * as React from "react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Game />
    );
  }
}

const Square = (props: {value: "X" | "O" | null, onClick: () => void}) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

const calculateWinner = (squares: Array<"X" | "O" | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

class Board extends React.Component<{squares: Array<"X" | "O" | null>, onClick: (i: number) => void}, {}> {

  renderSquare(i: number) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
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

class Game extends React.Component<{}, 
{history: Array<{squares: Array<"X" | "O" | null>}>, playerIsNext: boolean, stepNumber: number}> {
  constructor() {
    super();
   
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      playerIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.playerIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,      
      playerIsNext: !this.state.playerIsNext
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      playerIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Move # ${move}` : "Game Start";

      return(
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `The winner is: ${winner}`;
    } else {
      status = `Next player is: ${this.state.playerIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i: number) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
