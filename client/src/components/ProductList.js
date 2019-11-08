import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ProductList.css";

export default class ProductList extends Component {
  render() {
    return (
      <div className="ProductList">
        {this.props.products.map(product => (
          <Link key={product.getId()} to={`/products/${product.getId()}`}>
            <ProductCard
              name={product.getName()}
              images={product.getImages()}
              price={product.getFormattedPrice()}
            />
          </Link>
        ))}
      </div>
    );
  }
}
