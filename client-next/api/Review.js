import fetch from "./fetch";

export const getReviews = async productId =>
  fetch(`/v1/reviews?productId=${productId}`, {
    method: "GET"
  });

export const getReview = async reviewId =>
  fetch(`/v1/reviews${reviewId ? `/${reviewId}` : ""}`, {
    method: "GET"
  });
