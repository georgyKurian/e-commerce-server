import React from "react";
import App from "next/app";
import { createStore } from "redux";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import eCommerceApp from "../redux/reducers/index";
import { Provider } from "react-redux";

const store = createStore(eCommerceApp);

Router.events.on("routeChangeStart", url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </React.Fragment>
    );
  }
}
