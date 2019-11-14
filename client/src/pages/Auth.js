import React, { Component } from "react";
import store from "store2";
import { getCurrentUser } from "../api/Auth";

class Auth extends Component {
  componentDidMount = async () => {
    if (this.props.match.params.token) {
      await store.set("authToken", this.props.match.params.token);
      await this.props.authUser();
      const data = await getCurrentUser();
      console.log(data);
    }
    this.props.history.push("/");
  };

  render() {
    return null;
  }
}

export default authUser => props => <Auth authUser={authUser} {...props} />;
