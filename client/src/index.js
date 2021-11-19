import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "./providers/ThemeProvider/ThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/configureStore.js";

import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
