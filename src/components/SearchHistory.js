import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";

const SearchHistory = () => {
  const searchHistory = useSelector((state) => state.searchHistory);

  return (
    <List>
      {searchHistory.length >= 1 && <h5>Recent Searches:</h5>}
      {searchHistory.map((searchTerm, index) => (
        <ListItem key={index}>
          <ListItemText primary={searchTerm} />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchHistory;
