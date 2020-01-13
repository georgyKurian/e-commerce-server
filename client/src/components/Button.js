import React, { Component } from "react";
import { _ } from "lodash";
import "./Button.css";

class Button extends Component {
  render() {
    const { className, children, ...rest } = this.props;
    return (
      <button className={" rounded h-10 text-base " + className} {...rest}>
        {children}
      </button>
    );
  }
}

export class PrimaryButton extends Component {
  render() {
    const { className, ...rest } = this.props;
    return (
      <Button className={"bg-blue-400 text-white " + className} {...rest} />
    );
  }
}

export class SecondaryButton extends Component {
  render() {
    const {className, ...rest } = this.props;
    return (
      <Button className={"border-blue-400 text-blue-400 border " + className} {...rest} />
    );
  }
}
