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
    if (this.props.token) {
      await store.set("authToken", this.props.token);
      const data = await getCurrentUser();
    }
    Router.replace('//index');
  };

  render() {
    return null;
  }
}
