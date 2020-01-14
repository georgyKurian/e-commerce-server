import MyLayout from "../components/Layouts/MyLayout";
import React from "react";
import { getProducts } from "../api/Product";
import "../styles/main.css";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const products = getProducts();
    return { products: products };
  }

  render() {
    return (
      <MyLayout>
        <div>Home</div>
      </MyLayout>
    );
  }
}

export default Index;
