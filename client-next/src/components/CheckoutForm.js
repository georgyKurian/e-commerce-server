import React, { Component } from "react";
import Form from "../components/Form";
import TextInput from "../components/inputs/TextInput";
import { PrimaryButton } from "../components/Button";

export default class CheckoutForm extends Component {
  render() {
    if (this.props.values.successMessage) {
      return (
        <div>
          <h3 style={{ color: "mediumaquamarine" }}>Success!</h3>
          <p>{this.props.values.successMessage}</p>
        </div>
      );
    } else {
      return (
        <div>
          <Form onSubmit={this.props.submitOrder}>
            <TextInput
              label="Full Name"
              name="contact.fullName"
              value={this.props.values.contact.fullName || ""}
              onChange={this.props.handleChange}
            />
            <TextInput
              label="Phone Number"
              name="contact.phoneNumber"
              value={this.props.values.contact.phoneNumber || ""}
              onChange={this.props.handleChange}
            />
            <TextInput
              label="Country"
              name="shippingAddress.country"
              value={this.props.values.shippingAddress.country || ""}
              onChange={this.props.handleChange}
            />
            <TextInput
              label="City"
              name="shippingAddress.city"
              value={this.props.values.shippingAddress.city || ""}
              onChange={this.props.handleChange}
            />
            <TextInput
              label="Address Line 1"
              name="shippingAddress.addressLine1"
              value={this.props.values.shippingAddress.addressLine1 || ""}
              onChange={this.props.handleChange}
            />
            <TextInput
              label="Address Line 2"
              name="shippingAddress.addressLine2"
              value={this.props.values.shippingAddress.addressLine2 || ""}
              onChange={this.props.handleChange}
            />
            <TextInput
              label="Postal Code"
              name="shippingAddress.postalCode"
              value={this.props.values.shippingAddress.postalCode || ""}
              onChange={this.props.handleChange}
            />
            <PrimaryButton disabled={this.props.isLoading}>
              Place Order
            </PrimaryButton>
            {this.props.values.errorMessage && (
              <p style={{ color: "crimson" }}>this.props.values.errorMessage</p>
            )}
          </Form>
        </div>
      );
    }
  }
}
