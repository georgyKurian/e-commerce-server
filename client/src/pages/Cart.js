import React, { Component } from "react";
import { placeOrder } from "../api/Order";
import ShoppingCartList from "../components/ShoppingCartList";
import CheckoutForm from "../components/CheckoutForm";

export default class Cart extends Component {
  state = {
    startedCheckout: false,
    contact: {},
    shippingAddress: {},
    successMessage: undefined,
    errorMessage: undefined,
    isLoading: false
  };

  handleCheckout = () => {
    this.setState({ startedCheckout: true });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const [object, key] = name.split(".");
    const state = Object.assign({}, this.state);
    state[object][key] = value;
    this.setState(state);
  };

  submitOrder = async e => {
    this.setState({isLoading:true});
    e.preventDefault();
    const { success, error, data } = await placeOrder({
      products: this.props.items,
      contact: this.state.contact,
      shippingAddress: this.state.shippingAddress
    });
    if (success) {
      this.props.emptyCart();
      this.setState({ successMessage: `Order successfully placed! Your order id is:${data.getId()}`, errorMessage: undefined });      
    }
    else{
      this.setState({ successMessage: undefined, errorMessage: error });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="Cart">
        <h2>Cart</h2>
        {!this.state.startedCheckout ? (
          <ShoppingCartList
            items={this.props.items}
            onCheckout={this.handleCheckout}
            removeFromCart={this.props.removeFromCart}
          />
        ) : (
          <CheckoutForm
            values={this.state}
            submitOrder={this.submitOrder}
            handleChange={this.handleChange}
            isLoading={this.state.isLoading}
          />
        )}
      </div>
    );
  }
}
