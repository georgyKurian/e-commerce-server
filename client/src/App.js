import React, { Component } from "react";
import "./App.css";
import "./styles/tailwind.css";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "store2";
import Home from "./pages/Home";
import FormDemo from "./pages/FormDemo";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import Category from "./pages/Category";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import ProductManagement from "./pages/admin/ProductManagement";
import UserManagement from "./pages/admin/UserManagement";
import NavigationBar from "./components/NavigationBar";
import { getCurrentUser } from "./api/Auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: store.get("itemsInCart") || [],
      user: undefined
    };
    this.ProductPage = Product(this.addToCart);
  }

  authUser = async () => {
    const result = await getCurrentUser();
    if (result && result.data) {
      this.setState({ user: result.data });
    } else {
      this.setState({ user: undefined });
    }
  };

  logoutUser = async () => {
    await store.clear();
    this.setState({ itemsInCart: [], user: undefined });
  };

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

  emptyCart = async () => {
    await store.set("itemsInCart", []);
    this.setState({ itemsInCart: [] });
  };

  componentDidMount = () => {
    this.authUser();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.setState({
          itemsInCart: store.get("itemsInCart") || []
        });
        this.authUser();
      }
    });
  };

  render() {
    let isLoggedIn = false;
    let isAdmin = false;
    if (this.state.user && this.state.user._id) {
      isLoggedIn = true;
      isAdmin = isLoggedIn && this.state.user.role === "admin";
    }

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <NavigationBar
              isLoggedIn={isLoggedIn}
              itemsInCart={this.state.itemsInCart.length}
              isAdmin={isAdmin}
            ></NavigationBar>
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth/:token" exact component={Auth(this.authUser)} />
            <Route path="/forms" exact component={FormDemo} />
            <Route
              path="/cart"
              exact
              render={props => (
                <Cart
                  {...props}
                  items={this.state.itemsInCart}
                  removeFromCart={this.removeFromCart}
                  emptyCart={this.emptyCart}
                />
              )}
            />
            <Route path="/orders" exact component={Orders} />
            <Route path="/account" exact component={Account} />
            <Route path="/logout" exact component={Logout(this.logoutUser)} />
            {isAdmin && (
              <Route path="/admin/users" exact component={UserManagement} />
            )}
            {isAdmin && (
              <Route
                path="/admin/products"
                exact
                component={ProductManagement}
              />
            )}
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
