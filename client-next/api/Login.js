import axios from "./axios";

export default async email => {
  try {
    await axios.post(`v1/login/`, { email });
    return { success: true };
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return {
          error: "Bad login data. Did you submit a valid email address?"
        };
      default:
        return {
          error: "There was an error logging you in. Please, try again."
        };
    }
  }
};
