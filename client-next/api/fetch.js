import fetch from "isomorphic-unfetch";

const baseURL = process.env.REACT_APP_API_URL;
const defaultOption = {
  headers: { "Content-Type": "application/json" }
};

export default (url, options) => {
  console.log(baseURL + url);
  return fetch(baseURL + url, { ...defaultOption, ...options })
    .then(r => {
      if (r.ok) return r.json();
      return [];
    })
    .catch(err => {
      console.log(err);
    });
};

export const getResponse = (url, options) => {
  console.log(baseURL + url);
  return fetch(baseURL + url, { ...defaultOption, ...options }).catch(err => {
    console.log(err);
  });
};
