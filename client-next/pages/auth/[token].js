import React, { Component } from "react";
import Router from "next/router";
import store from "store2";
import { getCurrentUser } from "../../api/Auth";

export default class Auth extends Component {
  static async getInitialProps(ctx) {
    const token = ctx.query.token;
    const userData = await getCurrentUser(token);
    console.log({ token, userData });
    return { token, userData };
  }

  componentDidMount = async () => {
    console.log("Mount");
    /* debugger;
    this;
    if (this.props.token) {
      await store.set("authToken", this.props.match.params.token);
      await this.props.authUser();
      const data = await getCurrentUser();
      console.log(data);
    } */
    Router.push("/");
  };

  render() {
    return null;
  }
}
