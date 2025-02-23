import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { reduxStore } from "./reduxStore";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import ErrorBoundaryWrapper from "./components/error-boundary/ErrorBoundaryWrapper";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container); // Create the root

  root.render(
    <ErrorBoundaryWrapper>
      <ThemeProvider theme={theme}>
        <Provider store={reduxStore}>
          <App />
        </Provider>
      </ThemeProvider>
    </ErrorBoundaryWrapper>
  );
} else {
  console.error("Root container not found.");
}
