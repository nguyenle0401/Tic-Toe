import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";
import FacebookLogin from "react-facebook-login";

//1.score
//2.time
//3.post date
//3.show classmate score
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: " ",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS10__4WeQH_BBNhBdiwzXIphlGec00FYU9_A&usqp=CAU",
      nextPlayer: true, //true is X, false is O
      squareList: ["", "", "", "", "", "", "", "", ""],
      winner: "",
      history: [],
      ranking: [],
      loggedOn: false,
      showRanking: false,
      isFirst: true,
      startTime: 0,
      duration: 0,
    };
    console.log(this.state);
  }
  setParentsState = (obj) => {
    this.setState(obj);
  };

  postData = async () => {
    let data = new URLSearchParams();

    data.append("player", this.state.userName);
    data.append("score", this.state.duration);
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      json: true,
    });
    console.log("ggg", data.toString());
    this.getData();
  };

  getData = async () => {
    let url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("Result", result);
    this.setState({ ranking: result.items });
  };

  componentDidMount() {
    this.getData();
  }

  responseFacebook = (response) => {
    console.log(response);
    this.setState({ userName: response.name });
    this.setState({ picture: response.picture.data.url });
    this.setState({ loggedOn: true });
    this.setState({ showRanking: true });
  };

  render() {
    return (
      <div className="style-all">
        <div className="style-logg">
          {this.state.loggedOn ? null : (
            <FacebookLogin
              autoLoad={false}
              appId="215525599776984"
              fields="name,picture"
              callback={this.responseFacebook}
            />
          )}
        </div>

        <div className="style-title">
          <h1> Tic Tac Toe</h1>
          <h3 className="style-user">User name : {this.state.userName} </h3>
          <h3>
            <img src={this.state.picture} width="100px" alt="img"></img>
          </h3>
          <div>
            <h3>Ranking:</h3>
            {this.state.showRanking
              ? this.state.ranking.map((item) => (
                  <div>
                    {item.player}:{item.score}
                  </div>
                ))
              : null}
          </div>
        </div>

        <div>
          <h3 className="style-user">
            {" "}
            {this.state.winner === "x" ? (
              <div>
                <span>Winner:</span>
                <br />
                <img
                  src="https://cdn.discordapp.com/attachments/732068987206107267/737915014756696126/co_ba_la.png"
                  width="50px"
                  alt="img"
                ></img>
              </div>
            ) : this.state.winner === "o" ? (
              <div>
                <span>Winner</span>
                <img
                  src="https://cdn.discordapp.com/attachments/732068987206107267/737921564724428840/con_bo.png"
                  width="50px"
                  alt="img"
                ></img>
              </div>
            ) : (
              this.state.winner
            )}{" "}
          </h3>
          <h3>History</h3>

          <Board
            loggedOn={this.state.loggedOn}
            isFirst={this.state.isFirst}
            postData={this.postData}
            history={this.state.history}
            squareList={this.state.squareList}
            setParentsState={this.setParentsState}
            nextPlayer={this.state.nextPlayer}
            winner={this.state.winner}
            startTime={this.state.startTime}
            duration={this.state.duration}
          />
        </div>
      </div>
    );
  }
}
