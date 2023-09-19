const initialState = {
  query: "",
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export const setFilter = (query) => {
  return {
    type: "SET_FILTER",
    payload: query,
  };
};
export default filterReducer;
