import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { SecondaryButton } from "../Button";
import PropTypes from "prop-types";
import FeaturedTag from "./FeaturedTag";
import Rating from "./Rating";

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
      <div className="flex flex-col flex-wrap">
        <div className="rounded overflow-hidden h-48">
          <Link to={`/products/${this.props.id}`}>
            <img
              src={this.state.image}
              alt="Product"
              onMouseEnter={this.handleMouseOver}
              onMouseLeave={this.handleMouseLeave}
            />
          </Link>
        </div>
        {this.props.isFeatured && <FeaturedTag />}
        <Rating rating={3.5} />
        <span className="text-orange-600 font-medium text-xl">
          {this.props.price}
        </span>
        <Link to={`/products/${this.props.id}`} className="text-blue-700">
          {this.props.name}
        </Link>
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
