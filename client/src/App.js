import React, {Component} from "react";
import "./App.css";
import DynamicCounter from "./components/DynamicCounter";

class App extends Component {
  state = {
    Apples: 5,
    Oranges: 5,
    Grapes: 5
  };

  increment = key => () => {
    this.setState({
      [key]: this.state[key] + 1
    });
  };

  decrement = key => () => {
    this.setState({
      [key]: this.state[key] - 1
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DynamicCounter
            label="Apples"
            max={5}
            min={2}
            increment={this.increment}
            decrement={this.decrement}
            value={this.state.Apples}
          />
          <DynamicCounter
            label="Oranges"
            max={7}
            min={2}
            increment={this.increment}
            decrement={this.decrement}
            value={this.state.Oranges}
          />
          <DynamicCounter
            label="Grapes"
            max={6}
            min={4}
            increment={this.increment}
            decrement={this.decrement}
            value={this.state.Grapes}
          />
        </header>
      </div>
    );
  }
}

export default App;
