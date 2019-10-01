import React, { Component } from "react";

class DynamicCounter extends Component {
  getColor(value, max, min) {
    if (value > max) {
      return "green";
    } else if (value < min) {
      return "red";
    } else {
      return "white";
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.props.increment(this.props.label)}>
          +1
        </button>
        <span
          style={{
            padding: 10,
            color: this.getColor(
              this.props.value,
              this.props.max,
              this.props.min
            )
          }}
        >
          {this.props.label}:{this.props.value}
        </span>
        <button onClick={this.props.decrement(this.props.label)}>
          -1
        </button>
      </div>
    );
  }
}

export default DynamicCounter;
