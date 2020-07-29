import React, { Component } from "react";

export default class Square extends Component {
  render() {
    return (
        
            <div>
        <div className="square"
          onClick={() => this.props.selectSq(this.props.id)}
        >
          {/* {this.props.squareList[this.props.id]} */}
          {this.props.value === "❌"? <img src="https://cdn.discordapp.com/attachments/732068987206107267/737915014756696126/co_ba_la.png" width="100px"></img> : this.props.value === "🟢"? <img src="https://cdn.discordapp.com/attachments/732068987206107267/737921564724428840/con_bo.png" width="55px" ></img>: " "}
        </div>
      </div>

      
    );
  }
}
