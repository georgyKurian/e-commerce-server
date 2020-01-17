import React, { Component } from "react";
import Link from "next/link";
import "./ProductCard.css";
import { PrimaryButton, SecondaryButton } from "../Button";
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
      <div
        className="flex flex-col relative flex-wrap justify-between rounded bg-themeGray-200 p-2"
        style={{ height: "22rem" }}
      >
        <div className="rounded overflow-hidden h-36">
          <Link href="/products/[id]" as={`/products/${this.props.id}`}>
            <a>
              <img
                src={this.state.image}
                alt="Product"
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
              />
            </a>
          </Link>
        </div>
        {this.props.isFeatured && <FeaturedTag />}
        <Rating
          rating={this.props.avgRating}
          reviewCount={this.props.reviewCount}
        />
        <span className="text-orange-600 font-medium text-xl">
          {this.props.price}
        </span>
        <Link href="/products/[id]" as={`/products/${this.props.id}`}>
          <a className="text-blue-700">{this.props.name}</a>
        </Link>
        <div className="w-full text-center self-end">
          <SecondaryButton className="w-3/4 mx-auto self-end">
            View Details
          </SecondaryButton>
          <PrimaryButton className="w-3/4 mx-auto self-end m-1">
            Add to Bag
          </PrimaryButton>
        </div>

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
  avgRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  withRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func
};
