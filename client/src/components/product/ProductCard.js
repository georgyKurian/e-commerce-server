import React, { Component } from "react";
import "./ProductCard.css";
import { SecondaryButton } from "../Button";
import PropTypes from "prop-types";
import FeaturedTag from "./FeaturedTag";

export default class ProducrCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.images[0]
    };
  }

  handleMouseOver = () => {
    if (this.props.images.length > 1) {
      this.setState({
        image: this.props.images[1]
      });
    }
  };

  handleMouseLeave = () => {
    this.setState({
      image: this.props.images[0]
    });
  };

  render() {
    return (
      <div className="productCard">
        <img
          src={this.state.image}
          alt="Product"
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        />
        <h3>{this.props.name}</h3>
        {this.props.isFeatured && <FeaturedTag/>}
        <p>{this.props.price}</p>
        {this.props.withRemoveButton && (
          <SecondaryButton onClick={this.props.onRemove}>
            Remove
          </SecondaryButton>
        )}
      </div>
    );
  }
}

ProducrCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  withRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func
};
