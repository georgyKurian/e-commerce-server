import React, { Component } from "react";
import { getProduct } from "../api/Product";
import LoadingIndicator from "../components/LoadingIndicator";
import ProductView from "../components/product/ProductView";
import ReviewList from "../components/product/ReviewList";
import { getReviews } from "../api/Review";

class Product extends Component {
  state = {
    product: null,
    reviews: null,
    loading: true
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const product = await getProduct(id);
    Promise.all([getProduct(id), getReviews(id)]).then(([product, reviews]) => {
      this.setState({ product, reviews, loading: false });
    });
  };

  render() {
    if (this.state.loading || this.state.product === undefined) {
      return <LoadingIndicator />;
    }

    return (
      <React.Fragment>
        <ProductView
          product={this.state.product}
          addToCart={this.props.addToCart}
        />
        <ReviewList reviews={this.state.reviews} />
      </React.Fragment>
    );
  }
}

export default addToCart => props => (
  <Product {...props} addToCart={addToCart} />
);
