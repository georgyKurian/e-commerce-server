const token = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return Object.assign({}, state, { user: action.userData });
    default:
      return state;
  }
};

export default token;
