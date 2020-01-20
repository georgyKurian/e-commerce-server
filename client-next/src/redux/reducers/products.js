const products = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.product];
    case "UPDATE_PRODUCT":
      return state.map(product => {
        if (action.product.id === product.id) {
          return Object.assign({}, product, action.product);
        }
        return product;
      });
    default:
      return state;
  }
};
