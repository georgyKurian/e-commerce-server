import React, { Component } from "react";
import PropTypes from "prop-types";
import OrderCard from "./OrderCard";
import Order from "../../models/Order";

export default class OrderList extends Component {
  render() {
    return (
      <div>
        {this.props.orders.length > 0 ? (
          this.props.orders.map(order => (
            <OrderCard key={order.getId()} order={order} />
          ))
        ) : (
          <p>No orders yet!</p>
        )}
      </div>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.instanceOf(Order)).isRequired
};
