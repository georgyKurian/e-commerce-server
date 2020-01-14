import MyLayout from "../../components/Layouts/MyLayout";
import React from "react";
import { useRouter } from "next/router";
import ProductView from "../../components/product/ProductView";
import Product from "../../models/Product";
import { getProduct } from "../../api/Product";

class Products extends React.Component {
  static async getInitialProps(ctx) {
    const productData = await getProduct(ctx.query.id);
    return { productData };
  }

  render() {
    const product = new Product(this.props.productData);
    return (
      <MyLayout>
        <ProductView product={product} />
      </MyLayout>
    );
  }
}

export default Products;
