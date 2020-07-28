import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
  whoisWinner = (square) => {
    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winner.length; i++) {
      const [a, b, c] = winner[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c])
        return "Winner is", square[a];
    }
    return null;
  };
  goBack = (index) => {
    // this.props.history = nguyen array cac list
    let nextPlayer = this.props.history[index][0];
    let squareList = this.props.history[index][1];
    console.log(squareList);
    this.props.setParentsState({
      nextPlayer: nextPlayer,
      squareList: squareList,
    });
  };
  selectSq = (id) => {
    if (this.props.squareList[id] !== "" || this.props.winner !== "") {
      return;
    }
    let array = this.props.squareList.slice();
    console.log("sdsada", array);
    let history = this.props.history;
    console.log(...history);
    history = [...history, [!this.props.nextPlayer, array]];
    array[id] = this.props.nextPlayer ? "❌" : "🟢";

    this.props.setParentsState({
      history: history,
    });
    this.props.setParentsState({
      squareList: array,
      nextPlayer: !this.props.nextPlayer,
    });
    const winner = this.whoisWinner(array);
    if (winner) {
      console.log(winner);
      this.props.setParentsState({ winner: winner + " WIN" });
    } else if (array.every((square) => square !== "")) {
      this.props.setParentsState({ winner: "TIE" });
    }
  };

  render() {
    //1. calculate winner, and when you have winner, show ❌ is winner!
    //2. if there is no winner, show game over
    //3. if user try to click the square that already clicked, block it to change the value
    //4. make History

    // const winner = this.whoisWinner(this.state.square);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.nextPlayer ? '❌' : '🟢');
    // }

    return (
      <div>
        {this.props.history.map((item, index) => (
          <button onClick={() => this.goBack(index)}>
            Go to move {index + 1}
          </button>
        ))}

        {console.log(this.props.history)}
        <h3> Next Player : {this.props.nextPlayer ? "❌" : "🟢"}</h3>
        <div>
        <div style={{ display: "flex" }}>
          <Square 
            id={0}
            selectSq={this.selectSq}
            value={this.props.squareList[0]}
          />
          <Square
            id={1}
            selectSq={this.selectSq}
            value={this.props.squareList[1]}
          />
          <Square
            id={2}
            selectSq={this.selectSq}
            value={this.props.squareList[2]}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Square
            id={3}
            selectSq={this.selectSq}
            value={this.props.squareList[3]}
          />
          <Square
            id={4}
            selectSq={this.selectSq}
            value={this.props.squareList[4]}
          />
          <Square
            id={5}
            selectSq={this.selectSq}
            value={this.props.squareList[5]}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Square
            id={6}
            selectSq={this.selectSq}
            value={this.props.squareList[6]}
          />
          <Square
            id={7}
            selectSq={this.selectSq}
            value={this.props.squareList[7]}
          />
          <Square
            id={8}
            selectSq={this.selectSq}
            value={this.props.squareList[8]}
          />
        </div>
        </div>
      </div>
    );
  }
}
