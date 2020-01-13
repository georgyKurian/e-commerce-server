import React, { Component } from "react";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import Product from "../../models/Product";
import "./ProductList.css";

export default class ProductList extends Component {
  render() {
    return (
      <div className="flex flex-row items-ceter flex-wrap my-3">
        {this.props.products.map(product => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:p-2"
            key={product.getId()}
          >
            <ProductCard
            key={product.getId()}
              id={product.getId()}
              name={product.getName()}
              images={product.getImages()}
              price={product.getFormattedPrice()}
              isFeatured={product.getIsFeatured()}
              avgRating={product.getAvgRating()}
              reviewCount={product.getReviewCount()}
            />
          </div>
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(Product).isRequired)
};
