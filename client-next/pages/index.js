import MyLayout from "../components/Layouts/MyLayout";
import React from "react";
import fetch from "isomorphic-unfetch";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch("https://api.github.com/repos/zeit/next.js");
    const json = await res.json();
    return { stars: json.stargazers_count };
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
