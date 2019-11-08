import React, { Component } from "react";
import { PrimaryButton } from "./Button";

export default class ProductView extends Component {
  addToCart = () => {
    this.props.addToCart(this.props.product);
  };

  render() {
    return (
      <div className="ProductVIew">
        <h2>{this.props.product.getName()}</h2>
        <p>{this.props.product.getFormattedPrice()}</p>
        <PrimaryButton onClick={this.addToCart}>Add to Cart</PrimaryButton>
        {this.props.product.getImages().map(src => (
          <img src={src} key={src} alt="Product" />
        ))}
      </div>
    );
  }
}
