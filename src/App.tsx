import * as React from "react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Game />
    );
  }
}

class Square extends React.Component<{value: "X" | "O" | null, onClick: () => void}, {value: "X" | "O" | null}> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component<{}, {squares: Array<"X" | "O" | null>}> {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({squares: squares});
  }

  renderSquare(i: number) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = "Next player: X";

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

export default App;
