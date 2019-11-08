import axios from "./axios";
import Product from "../models/Product";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`v1/users`);
    return data.map(product => new Product(product));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async id => {
  try {
    const { data } = await axios.get(`v1/users/${id}`);
    return new Product(data);
  } catch (error) {
    console.error(error);
  }
};
