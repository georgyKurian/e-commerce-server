import React, { Component } from "react";
import Review from "../../models/Review";
import PropTypes from "prop-types";
import Rating from "./Rating";

export default class ReviewView extends Component {
  render() {
    return (
      <div className="ReviewView">
        <h2 className="font-semibold text-sm">
          {this.props.review.getTitle()}
        </h2>
        <p className="text-sm">{this.props.review.getComment()}</p>
        <Rating rating={this.props.review.getRating()} />
      </div>
    );
  }
}

ReviewView.propTypes = {
  review: PropTypes.instanceOf(Review)
};
