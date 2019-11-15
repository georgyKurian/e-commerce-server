import axios from "./axios";
import Order from "../models/Order";
import getAuthHeader from "./getAuthHeader";

export const placeOrder = async body => {
  try {
    const { data } = await axios.post(`v1/orders`, body, {
      headers: await getAuthHeader()
    });
    if (data && data._id) {
      return {
        success: true,
        data: new Order(data)
      };
    } else {
      return {
        success: false,
        error: "An unknown error occured. Please, retry again later."
      };
    }
    console.log("placeOrder", data);
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return {
          success: false,
          error:
            "We coudn't setup the order for you. Please check your contact and shipping details."
        };
      case 401:
        return {
          success: false,
          error:
            "Placing the order failed because your session expired. Please, refresh the page and try agaian."
        };
      default:
        return {
          error: "An unknown erroroccured. Please, retry again latter."
        };
    }
  }
};

export const getProduct = async id => {
  try {
    const { data } = await axios.get(`v1/orders${id ? `/${id}` : ""}`);
    return new Order(data);
  } catch (error) {
    console.error(error);
  }
};
