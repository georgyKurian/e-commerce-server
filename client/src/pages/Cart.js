import React, { Component } from "react";
import Product from "../models/Product";
import ProductCard from "../components/product/ProductCard";

export default class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <h2>Cart</h2>
        <div>
          {this.props.items.length > 0 ? (
            <div>
              {this.props.items
                .map(item => new Product(item))
                .map(product => (
                  <ProductCard
                    key={product.getId()}
                    name={product.getName()}
                    price={product.getFormattedPrice()}
                    images={product.getImages()}
                  />
                ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
