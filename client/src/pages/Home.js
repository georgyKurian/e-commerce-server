import React, { Component } from "react";
import { getProducts } from "../api/Product";
import ProductList from "../components/product/ProductList";
import LoadingIndicator from "../components/LoadingIndicator";

export default class Home extends Component {
  state = {
    products: [],
    loading: true
  };

  componentDidMount = async () => {
    const products = await getProducts() || [];
    this.setState({ products, loading: false });
  };

  render() {
    return (
      this.state.loading ? <LoadingIndicator/> :
    <ProductList products={this.state.products} />
    );
  }
}
