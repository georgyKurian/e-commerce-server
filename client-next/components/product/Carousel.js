import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class ImageCarousel extends Component {
  render() {
    var settings = {
      autoPlay: true,
      autoplaySpeed: 3000,
      showStatus: false,
      className: this.props.className,
      dots: true,
      infiniteLoop: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Carousel {...settings}>
        {this.props.images.map((image, index) => (
          <div key={index}>
            <img src={image} />
          </div>
        ))}
      </Carousel>
    );
  }
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};
