import store from "store2";

export default async (token = null) => {
  if (!token) {
    token = await store.get("authToken");
  }
  return {
    authorization: `Bearer ${token}`
  };
};
