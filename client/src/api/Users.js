import axios from "./axios";
import User from "../models/User";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`v1/users`);
    return data.map(user => new User(user));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async id => {
  try {
    const { data } = await axios.get(`v1/users/${id}`);
    return new User(data);
  } catch (error) {
    console.error(error);
  }
};
