import React, { Component } from "react";

class Logout extends Component {
  componentDidMount = () => {
    this.props.logoutUser();
  };

  render() {
    return null;
  }
}

export default logoutUser => props => (
  <Logout logoutUser={logoutUser} {...props} />
);
