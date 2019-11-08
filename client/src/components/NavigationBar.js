import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

export default class Form extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="NavigationBar">
        <Link to="/">Home</Link>
        <Link to="/category/online">#online</Link>
        <Link to="/category/mobile">#mobile</Link>
        {isLoggedIn ? (
          <Fragment>
            <Link to="/cart">
              my cart
              {this.props.itemsInCart > 0 ? `(${this.props.itemsInCart})` : ``}
            </Link>
            <Link to="/orders">orders</Link>
          </Fragment>
        ) : (
          <Link to="/account">account</Link>
        )}
      </div>
    );
  }
}
