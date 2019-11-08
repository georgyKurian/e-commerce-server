import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "store2";
import Home from "./pages/Home";
import FormDemo from "./pages/FormDemo";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Category from "./pages/Category";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemsInCart: store.get("itemsInCart") || [] };
    this.ProductPage = Product(this.addToCart);
  }

  addToCart = item => {
    console.log("Added!");
    const { itemsInCart } = this.state;
    itemsInCart.push(item);
    this.setState({ itemsInCart });
    store.set("itemsInCart", itemsInCart);
  };

  removeFromCart = index => {
    const { itemsInCart } = this.state;
    itemsInCart.splice(index, 1);
    this.setState({ itemsInCart });
    store.set("itemsInCart", itemsInCart);
  };

  componentDidMount = () => {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.setState({
          itemsInCart: store.get("itemsInCart") || []
        });
      }
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavigationBar
              isLoggedIn={true}
              itemsInCart={this.state.itemsInCart.length}
            ></NavigationBar>
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/forms" exact component={FormDemo} />
            <Route
              path="/cart"
              exact
              component={props => (
                <Cart {...props} items={this.state.itemsInCart} />
              )}
            />
            <Route path="/orders" exact component={Orders} />
            <Route path="/account" exact component={Account} />
            <Route path="/category/:slug" exact component={Category} />
            <Route path="/products/:id" exact component={this.ProductPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
