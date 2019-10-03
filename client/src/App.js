import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormDemo from "./pages/FormDemo";
import NotFound from "./pages/NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/forms" exact component={FormDemo} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
