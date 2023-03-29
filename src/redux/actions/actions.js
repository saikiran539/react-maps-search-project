const addToSearchHistory = (searchTerm) => ({
    type: 'ADD_TO_SEARCH_HISTORY',
    payload: searchTerm,
  });
  
  const setPlaces = (places) => ({
    type: 'SET_PLACES',
    payload: places,
  });
  
  export { addToSearchHistory, setPlaces };
  