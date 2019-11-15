import React, { Component } from "react";
import ProductCard from "../product/ProductCard";

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
