import React, { Component } from "react";
import { getUserOrders } from "../api/Order";
import LoadingIndicator from "../components/LoadingIndicator";
import OrderList from "../components/order/OrderList";

export default class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const orders = await getUserOrders() || [];
    this.setState({
      orders,
      isLoading: false
    });
  };

  render() {
    return (
      <div>
        <h2>Orders</h2>
        {this.isLoading ? (
          <LoadingIndicator />
        ) : (
          <OrderList orders={this.state.orders} />
        )}
      </div>
    );
  }
}
