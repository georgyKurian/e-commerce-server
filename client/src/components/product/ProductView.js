import React, { Component } from "react";
import { PrimaryButton } from "../Button";
import PropTypes from "prop-types";
import Product from "../../models/Product";

export default class ProductView extends Component {
  addToCart = () => {
    this.props.addToCart(this.props.product.getData());
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

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product)
};
