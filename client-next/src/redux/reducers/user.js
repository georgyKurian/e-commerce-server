const user = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return Object.assign({}, state, { user: action.user  });
    default:
      return state;
  }
};

export default user;
