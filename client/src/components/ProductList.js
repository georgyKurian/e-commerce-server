import React, { Component } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

export default class ProductList extends Component {
  render() {
    return (
      <div className="ProductList">
        {this.props.products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    );
  }
}
