import React, { Component } from "react";
import { getUsers } from "../../api/Users";
import LoadingIndicator from "../../components/LoadingIndicator";
import DataTable from "../../components/DataTable";

const columns = [
  { key: "_id", label: "ID" },
  { key: "username", label: "Username", sort: true },
  { key: "email", label: "Email", sort: true }
];

export default class UserManagement extends Component {
  state = {
    users: [],
    isLoading: true
  };
  componentDidMount = async () => {
    const users = await getUsers() || [];
    this.setState({
      users: users
        .filter(user => user.getRole() === "customer")
        .map(user => user.getData()),
      isLoading: false
    });
  };
  render() {
    return (
      <div className="AdminView">
        <h2>User Management</h2>
        {this.state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <DataTable
            tableKey="Users"
            columns={columns}
            data={this.state.users}
          />
        )}
      </div>
    );
  }
}
