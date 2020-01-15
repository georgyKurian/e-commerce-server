import MyLayout from "../../components/Layouts/MyLayout";
import React from "react";
import ProductView from "../../components/product/ProductView";
import Product from "../../models/Product";
import Review from "../../models/Review";
import { getProduct } from "../../api/Product";
import { getReviews } from "../../api/Review";
import ReviewList from "../../components/product/ReviewList";

class Products extends React.Component {
  static async getInitialProps(ctx) {
    const data = await Promise.all([
      getProduct(ctx.query.id),
      getReviews(ctx.query.id)
    ]);
    return { productData: data[0], reviewDataList: data[1] };
  }

  render() {
    const product = new Product(this.props.productData);
    const reviews = this.props.reviewDataList.map(
      reviewData => new Review(reviewData)
    );
    return (
      <MyLayout>
        <ProductView product={product} />
        <ReviewList reviews={reviews} />
      </MyLayout>
    );
  }
}

export default Products;
