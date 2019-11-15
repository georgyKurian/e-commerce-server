import React, { Component } from "react";
import { getProducts } from "../api/Product";
import LoadingIndicator from "../components/LoadingIndicator";
import ProductList from "../components/product/ProductList";

export default class Category extends Component {
  state = {
    product: null,
    slug: null,
    loading: true
  };

  componentDidMount = async () => {
    const { slug } = this.props.match.params;
    const products = await getProducts(slug) || [];
    this.setState({ products, slug, loading: false });
  };
  
  componentDidUpdate = async () => {
    const { slug } = this.props.match.params;
    if( slug !== this.state.slug ){
      const products = await getProducts(slug) || [];
      this.setState({ products, slug, loading: false });
    }    
  };

  render() {
    return (
      <div>
        <h1>Category: {this.props.match.params.slug}</h1>
        {this.state.loading ? (
          <LoadingIndicator />
        ) : (
          <ProductList products={this.state.products} />
        )}
      </div>
    );
  }
}
