import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import store from "./store";
import AuthContextProvider from "./contexts/AuthContext";
import AppRouting from "./AppRouting";

const myTheme = extendTheme(
  {
    colors: {
      ...theme.colors,
      brand: {
        50: "#FFFAF0",
        100: "#FEEBC8",
        200: "#FBD38D",
        300: "#F6AD55",
        400: "#F5A716",
        500: "#F5A716",
        600: "#DD6B20",
        700: "#9C4221",
        800: "#9C4221",
        900: "#652B19",
      },
    },
    semanticTokens: {
      colors: {
        ...theme.semanticTokens.colors,
        "bg-canvas": {
          default: "whiteAlpha.900",
          _dark: "gray.900",
        },
      },
    },
  },
  theme
);

function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <Provider store={store}>
        <AuthContextProvider>
          <Router>
            <AppRouting />
            </Router>
        </AuthContextProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
