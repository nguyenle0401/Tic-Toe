import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";


//1.score
//2.time
//3.post date
//3.show classmate score
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


  postData = async() => {
    let data = new URLSearchParams();
data.append("player", "PLAYER_NAME");
data.append("score", "TIME_ELAPSED_IN_SECONDS");
const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: data.toString(),
  json: true
});

  }
  componentDidMount(){
    this.postData()
  }

  render() {
    return (
      <div className = "style-all">
        <div className = "style-title">
        <h1> Tic Tac Toe</h1>
        <h3 className = "style-user">User name : {this.state.username} </h3>
        
        </div>


        <div>
        <h3 className = "style-user">Result: {this.state.winner === "x"? <div><span>Winner:</span><img src="https://cdn.discordapp.com/attachments/732068987206107267/737915014756696126/co_ba_la.png" width="30px"></img></div>: this.state.winner === "o"? <div><span>Winner:</span><img src="https://cdn.discordapp.com/attachments/732068987206107267/737921564724428840/con_bo.png" width="30px" ></img></div> : this.state.winner} </h3>
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
