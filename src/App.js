import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Nguyen Le",
      nextPlayer: true, //true is X, false is O
      squareList: ["", "", "", "", "", "", "", "", ""],
      winner: "",
      history: [],
    };
  }
  setParentsState = (obj) => {
    this.setState(obj);
  };

  render() {
    return (
      <div className = "style-all">
        <div className = "style-title">
        <h1> Tic Tac Toe</h1>
        <h3 className = "style-user">User name : {this.state.username} </h3>
        
        </div>


        <div>
        <h3 className = "style-user">Result: {this.state.winner} </h3>
        <h3>History</h3>
        <Board
          history={this.state.history}
          squareList={this.state.squareList}
          setParentsState={this.setParentsState}
          nextPlayer={this.state.nextPlayer}
          winner={this.state.winner}
        />
        </div>
        
      </div>
    );
  }
}
