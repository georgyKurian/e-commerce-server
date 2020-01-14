import MyLayout from "../components/Layouts/MyLayout";
import React from "react";
import "../styles/main.css";

class Products extends React.Component {
  static async getInitialProps(ctx) {
    const products = await getProducts();
    return { products };
  }

  render() {
    return (
      <MyLayout>
        Hello
      </MyLayout>
    );
  }
}

export default Products;
