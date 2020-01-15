import fetch from "./fetch";
import getAuthHeader from "./getAuthHeader";

export const getCurrentUser = async () => {
  return fetch(`/v1/auth/`, { method: "POST", headers: await getAuthHeader() });
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
