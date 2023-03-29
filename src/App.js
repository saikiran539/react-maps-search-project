import React from "react";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import AutocompleteComponent from "./components/AutoComplete";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <AutocompleteComponent />
      </div>
    </Provider>
  );
};

export default App;
