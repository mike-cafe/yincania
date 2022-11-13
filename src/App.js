import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import store from "./store";
import AuthContextProvider from "./contexts/AuthContext";
import AppRouting from "./AppRouting";
import { createStandaloneToast } from "@chakra-ui/react";
import useVH from "react-viewport-height";

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
    breakpoints:{
      base:'220px',
      sm: '321px',
      sm2: '361px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
      '2xl': '1536px',
    }
  },
  theme
);

const { ToastContainer, toast } = createStandaloneToast({ theme: myTheme });

function App() {
  useVH();
  return (
      <ChakraProvider theme={myTheme}>
        <Provider store={store}>
          <Router>
            <AuthContextProvider>
              <AppRouting />
              <ToastContainer />
            </AuthContextProvider>
          </Router>
        </Provider>
      </ChakraProvider>
  );
}

export default App;
