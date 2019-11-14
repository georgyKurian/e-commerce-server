import React, { Component } from "react";

class Logout extends Component {
  componentDidMount = async () => {
    await this.props.logoutUser();
    this.props.history.push('/');
  };

  render() {
    return '';
  }
}

export default logoutUser => props => (
  <Logout logoutUser={logoutUser} {...props} />
);
