import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import {
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import store from "./store";
import AuthContextProvider from "./contexts/AuthContext";
import AppRouting from "./AppRouting";
import { createStandaloneToast } from "@chakra-ui/react";
import useVH from "react-viewport-height";
import { defineStyle } from '@chakra-ui/styled-system'

const myTheme = extendTheme(
  {
    colors: {
      ...baseTheme.colors,
      brand: {
        50: "#fff5e8",
        100: "#ffecd1",
        200: "#ffd8a3",
        300: "#ffc575",
        400: "#ffb147",
        500: "#FF9E19",
        600: "#cc7e14",
        700: "#995f0f",
        800: "#663f0a",
        900: "#332005",
      },
      secondary:{
        50: "#f2fafd",
        100: "#e5f6fb",
        200: "#caedf7",
        300: "#b0e3f2",
        400: "#95daee",
        500: "#7BD1EA",
        600: "#5692a4",
        700: "#3e6975",
        800: "#253f46",
        900: "#0c1517",
      },
      accent:{
        50: "#f9fceb",
        100: "#f3f8d6",
        200: "#e7f1ad",
        300: "#daea84",
        400: "#cee35b",
        500: "#C2DC32",
        600: "#9bb028",
        700: "#74841e",
        800: "#4e5814",
        900: "#272c0a",
      }
    },
    breakpoints: {
      base: "220px",
      sm: "321px",
      sm2: "361px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
      "2xl": "1536px",
    },
  },
  proTheme
);

const myTheme2 = extendTheme(
  {
    semanticTokens: {
      colors: {
        ...proTheme.semanticTokens.colors,
        "bg.canvas": {
          default: "gray.25",
          _dark: "gray.900",
        },
      },
    },
    styles: {
      ...proTheme.styles,
      global: {
        ...proTheme.styles.global,
        body: {
          bg: "bg.surface",
          color: "fg.default",
        },
      },
    },
  },
  myTheme
);

const { ToastContainer, toast } = createStandaloneToast({ theme: myTheme2 });

function App() {
  useVH();
  return (
    <ChakraProvider theme={myTheme2}>
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
