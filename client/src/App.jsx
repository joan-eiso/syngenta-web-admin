import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Redirect, Route, Switch } from "react-router";

import TopBar from "./components/molecules/TopBar/TopBar";
import SideNav from "./components/navigation/SideNav/SideNav";
import UserDirectory from "./components/organisms/UserDirectory/UserDirectory";
import DistributorDirectory from "./components/organisms/DistributorDirectory/DistributorDirectory";
import LicenseDirectory from "./components/organisms/LicenseDirectory/LicenseDirectory";
import ProducerDirectory from "./components/organisms/ProducerDirectory/ProducerDirectory";
import ProductDirectory from "./components/organisms/ProductDirectory/ProductDirectory";
import Dashboard from "./components/organisms/Dashboard/Dashboard";
import AddDistributor from "./components/organisms/AddDistributor/AddDistributor";
import Authentication from "./components/organisms/Authentication/Authentication";
import PropertyDirectory from "./components/organisms/PropertyDirectory/PropertyDirectory";

function App() {
  const [session, setSession] = useState(false);

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      { session 
      ? 
      <>
        <div className={classes.sideNav}>
          <SideNav />
        </div>
        
        <div className={classes.mainContent}>
          <TopBar />
          <Switch>
            <Route path="/resumen">
              <Dashboard />
            </Route>
            <Route path="/productores">
              <ProducerDirectory />
            </Route>
            <Route path="/predios">
              <PropertyDirectory />
            </Route>
            <Route path="/licencias">
              <LicenseDirectory />
            </Route>
            <Route path="/distribuidores/añadir">
              <AddDistributor />
            </Route>
            <Route path="/distribuidores">
              <DistributorDirectory />
            </Route>
            <Route path="/productos">
              <ProductDirectory />
            </Route>
            <Route path="/usuarios">
              <UserDirectory />
            </Route>
            <Route path="/ajustes">
              <p>Ajustes</p>
            </Route>
            <Route path="/">
              <Redirect to="/resumen" />
            </Route>
          </Switch>
        </div>
      </>
      :
      <>
        <div className={classes.authWrapper}>  
          <Switch>
            <Route path="/">
              <Authentication setSession={setSession} />
            </Route>
          </Switch>
      </div>
      </>
      } 
    </div>
  );
}

export default App;

const useStyles = createUseStyles({
  root: {
    overflow: "hidden",
    display: "grid",
    height: "100vh",
    grid: {
      templateColumns: "repeat(12, minmax(10px, 1fr))",
    }
  },

  sideNav: {
    height: "100%",
    grid: {
      column: "1 / 3",
    },
  },
  
  mainContent: ({ theme }) => ({
    display: "flex",
    flexFlow: "column nowrap",
    grid: {
      column: "3 / 13"
    },
    height: "100%",
    backgroundColor: theme.colors.gray.lightest,
  }),

  authWrapper: {
    grid: {
      column: "1 / 13",
    },

    "& > div": {
      height: "100%",
    }
  }
});