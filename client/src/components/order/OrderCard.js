import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductCard from "../product/ProductCard";
import Order from "../../models/Order";

export default class OrderCard extends Component {
  render() {
    return (
      <div className="OrderSummary">
        <p>Order Number: {this.props.order.getId()}</p>
        <div className="OrderSummaryProducts">
          {this.props.order.getProducts().map((product, index) => (
            <ProductCard
              key={`${this.props.order.getId()}_${product.getId()}_${index}`}
              name={product.getName()}
              images={product.getImages()}
              price={product.getFormattedPrice()}
            />
          ))}
        </div>
        <p>Total Price: {this.props.order.getFormattedTotalPrice()}</p>
      </div>
    );
  }
}

OrderCard.propTypes = {
  order: PropTypes.instanceOf(Order)
};
