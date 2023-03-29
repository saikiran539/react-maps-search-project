const initialState = {
  searchHistory: [],
  places: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: [...state.searchHistory, action.payload],
      };
    case 'SET_PLACES':
      return {
        ...state,
        places: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
