import React, { Component } from "react";
import ProductCard from "./ProductCard";

export default class ProductList extends Component {

  render() {
    return this.props.products.map(product => (
      <ProductCard key={product.id} {...product} />
    ));
  }
}
