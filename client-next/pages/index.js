import MyLayout from "../components/Layouts/MyLayout";
import React from "react";
import { getProducts } from "../api/Product";
import "../styles/main.css";
import ProductList from "../components/product/ProductList";
import Product from "../models/Product";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const productDataList = await getProducts();
    return { productDataList };
  }

  render() {
    const productList = this.props.productDataList.map(
      productData => new Product(productData)
    );
    return (
      <MyLayout>
        <ProductList products={productList} />
      </MyLayout>
    );
  }
}

export default Index;
