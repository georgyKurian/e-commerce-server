import React, { Component } from "react";
import { getProducts } from "../../api/Product";
import LoadingIndicator from "../../components/LoadingIndicator";
import DataTable from "../../components/DataTable";

const columns = [
  { key: "_id", label: "ID" },
  { key: "name", label: "Name", sort: true },
  { key: "formattedPrice", label: "Price", sort: true }
];

export default class ProductManagement extends Component {
  state = {
    products: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const products = await getProducts();
    this.setState({
      products: products.map(product => product.getData()),
      isLoading: false
    });
  };

  render() {
    return (
      <div className="AdminView">
        <h2>Product Management</h2>
        {this.state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <DataTable
            tableKey="Products"
            columns={columns}
            data={this.state.products}
          />
        )}
      </div>
    );
  }
}
