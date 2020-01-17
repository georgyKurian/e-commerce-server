import { getResponse } from "./fetch";

export default async email => {
  return getResponse(`/v1/login`, {
    method: "POST",
    body: JSON.stringify({ email })
  }).then(response => {
    debugger;
    if (response.ok) {
      return { sussess: true };
    }
    if (response.status === 400) {
      return {
        error: "Bad login data. Did you submit a valid email address?"
      };
    }
    return {
      error: "There was an error logging you in. Please, try again."
    };
  });
};
