import React, { Component } from "react";

export default class Square extends Component {
  render() {
    return (
        
            <div>
        <div className="square"
          onClick={() => this.props.selectSq(this.props.id)}
        >
          {/* {this.props.squareList[this.props.id]} */}
          {this.props.value}
        </div>
      </div>

      
    );
  }
}
