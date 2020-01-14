import React, { Component } from "react";
import Review from "../../models/Review";
import ReviewView from "../../components/product/ReviewView";
import PropTypes from "prop-types";

export default class ReviewList extends Component {
  render() {
    return (
      <div className="flex flex-row items-ceter flex-wrap my-3">
        <h2 className="font-bold">Customer reviews</h2>
        {this.props.reviews.map(review => (
          <div className="w-full" key={review.getId()}>
            <ReviewView review={review} />
          </div>
        ))}
      </div>
    );
  }
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.instanceOf(Review).isRequired)
};
