import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormDemo from "./pages/FormDemo";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavigationBar isLoggedIn={true}></NavigationBar>
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/forms" exact component={FormDemo} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/account" exact component={Account} />
            <Route path="/category/:slug" exact component={Category} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
