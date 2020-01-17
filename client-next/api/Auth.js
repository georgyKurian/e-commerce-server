import fetch from "./fetch";
import getAuthHeader from "./getAuthHeader";

export const getCurrentUser = async (token = null) => {
  return fetch(`/v1/auth/`, {
    method: "POST",
    headers: await getAuthHeader(token)
  });
  /*   try {
    const { data } = await axios.post(
      `v1/auth/`,
      {},
      { headers: await getAuthHeader() }
    );
    return data;
  } catch (error) {
    console.error(error);
  } */
};
