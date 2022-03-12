import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import { RutasList } from "./pages/RutasList";
import { RutasDetail } from "./pages/RutasDetail";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import { CreateTeam } from "./pages/CreateTeam";
import { ViewTeam } from "./pages/ViewTeam";
import { RutasPlay } from "./pages/RutasPlay";

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
  },
  theme
);

function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <RutasList />
          </Route>
          <Route path="/detail" exact>
            <RutasDetail />
          </Route>
          <Route path="/play" exact>
            <RutasPlay />
          </Route>
          <Route path="/createteam" exact>
            <CreateTeam />
          </Route>
          <Route path="/viewteam" exact>
            <ViewTeam />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
