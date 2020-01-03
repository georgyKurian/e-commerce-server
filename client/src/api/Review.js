import axios from "./axios";
import Review from "../models/Review";

export const getReviews = async productId => {
  try {
    return axios
      .get(`v1/reviews/${productId}`)
      .then(({data}) => {
        return data.map(review => new Review(review));
      })
      .catch(function(error) {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const getReview = async id => {
  try {
    const { data } = await axios.get(`v1/reviews${id ? `/${id}` : ""}`);
    return new Review(data);
  } catch (error) {
    console.error(error);
  }
};
