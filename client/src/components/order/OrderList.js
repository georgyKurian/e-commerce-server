import React, { Component } from "react";
import OrderCard from "./OrderCard";

export default class OrderList extends Component {
  render() {
    return (
      <div>
        {this.props.orders.length > 0 ? (
          this.props.orders.map(order => <OrderCard key={order.getId()} order={order} />)
        ) : (
          <p>No orders yet!</p>
        )}
      </div>
    );
  }
}
