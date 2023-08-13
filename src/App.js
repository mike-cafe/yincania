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
        50: "#FEEFE6",
        100: "#FCE0CF",
        200: "#F2B38C",
        300: "#E99563",
        400: "#DE7F45",
        500: "#C3672D",
        600: "#AD561F",
        700: "#844015",
        800: "#5C290A",
        900: "#451F08",
      },
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

// const myTheme3 = extendTheme(
//   {
//     styles: {
//       global: {
//         body: {
//           bg: "gray.900",
//           color: "white",
//         },
//       },
//     },
//   },myTheme2
// )

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
