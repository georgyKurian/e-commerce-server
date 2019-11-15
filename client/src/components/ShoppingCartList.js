import React, { Component } from "react";
import Product from "../models/Product";
import ProductCard from "../components/product/ProductCard";
import { PrimaryButton } from "./Button";

export default class ShoppingCartList extends Component {
  render() {
    return (
      <div>
        {this.props.items.length > 0 ? (
          <React.Fragment>
            <div>
              {this.props.items
                .map(item => new Product(item))
                .map((product, index) => (
                  <ProductCard
                    key={`${product.getId()}_${index}`}
                    name={product.getName()}
                    price={product.getFormattedPrice()}
                    images={product.getImages()}
                    withRemoveButton
                    onRemove={() => {
                      this.props.removeFromCart(index);
                    }}
                  />
                ))}
            </div>
            <PrimaryButton onClick={this.props.onCheckout}>Checkout</PrimaryButton>
          </React.Fragment>
        ) : (
          <p>Your cart is empty. Add some awesome products!</p>
        )}
      </div>
    );
  }
}
