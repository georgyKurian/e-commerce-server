import React, { Component } from "react";
import TextInput from "../components/inputs/TextInput";
import PasswordInput from "../components/inputs/PasswordInput";
import CheckboxInput from "../components/inputs/CheckboxInput";
import Form from "../components/Form";
import { PrimaryButton } from "../components/Button";

export default class FormDemo extends Component {
  state = {
    firstName: "",
    lastName: "",
    password: "",
    sendEmail: false
  };

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBooleanChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Forms</h1>
        <TextInput
          label="First Name"
          value={this.state.firstName}
          name="firstName"
          onChange={this.handleTextChange}
        />
        <TextInput
          label="Last Name"
          value={this.state.lastName}
          name="lastName"
          onChange={this.handleTextChange}
        />
        <PasswordInput
          label="Password"
          value={this.state.password}
          name="password"
          onChange={this.handleTextChange}
        />
        <CheckboxInput
          label="Can we send you promo email?"
          checked={this.state.sendEmail}
          name="sendEmail"
          onChange={this.handleBooleanChange}
        />
        <PrimaryButton>Submit</PrimaryButton>
      </Form>
    );
  }
}
