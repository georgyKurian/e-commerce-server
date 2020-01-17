import React, { Component } from "react";
import { PrimaryButton } from "../Button";
import PropTypes from "prop-types";
import Product from "../../models/Product";
import ImageCarosule from "../../components/product/Carousel";

export default class ProductView extends Component {
  addToCart = () => {
    this.props.addToCart(this.props.product.getData());
  };

  render() {
    return (
      <div className="ProductView flex flex-wrap py-2 ">
        <ImageCarosule
          images={this.props.product.getImages()}
          className="md:w-1/2 md:px-2"
        />
        <div className="md:w-1/2 md:px-2">
          <h2>{this.props.product.getName()}</h2>
          <p>{this.props.product.getFormattedPrice()}</p>
          <PrimaryButton onClick={this.addToCart}>Add to Cart</PrimaryButton>
        </div>
      </div>
    );
  }
}

ProductView.propTypes = {
  product: PropTypes.instanceOf(Product)
};
