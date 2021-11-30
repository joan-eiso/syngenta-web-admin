import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Redirect, Route, Switch } from "react-router";

import { useSelector } from "react-redux";

import TopBar from "./components/molecules/TopBar/TopBar";
import SideNav from "./components/navigation/SideNav/SideNav";
import DistributorDirectory from "./components/organisms/DistributorDirectory/DistributorDirectory";
import LicenseDirectory from "./components/organisms/LicenseDirectory/LicenseDirectory";
import ProducerDirectory from "./components/organisms/ProducerDirectory/ProducerDirectory";
import ProducerDetail from "./components/organisms/ProducerDetail/ProducerDetail";
import ProductDirectory from "./components/organisms/ProductDirectory/ProductDirectory";
import Dashboard from "./components/organisms/Dashboard/Dashboard";
import AddDistributor from "./components/organisms/AddDistributor/AddDistributor";
import Authentication from "./components/organisms/Authentication/Authentication";
import AdminDirectory from "./components/organisms/AdminDirectory/AdminDirectory";
import AddAdmin from "./components/organisms/AddAdmin/AddAdmin";

function App() {
  const token = useSelector(state => state.auth.token);
  const loadDataSucceed = useSelector(state => state.auth.loadDataSucceed);

  const [sideNavIsOpen, setSideNavIsOpen] = useState(true);

  const toggleSidebar = () => {
    setSideNavIsOpen(!sideNavIsOpen);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      { token && loadDataSucceed
      ? 
      <>
        { sideNavIsOpen &&
          <div className={classes.sideNav}>
          <SideNav />
        </div>
        }
        
        <div className={classes.mainContent}>
          <TopBar onSidebarToggle={toggleSidebar} />
          <Switch>
            <Route path="/resumen">
              <Dashboard />
            </Route>
            <Route path="/productores/u/:id">
              <ProducerDetail />
            </Route>
            <Route path="/productores">
              <ProducerDirectory />
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
            <Route path="/administradores/añadir">
              <AddAdmin />
            </Route>
            <Route path="/administradores">
              <AdminDirectory />
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
              <Authentication />
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
      templateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    }
  },

  sideNav: {
    grid: {
      column: "1 / 3",
    },
    height: "100vh",
  },
  
  mainContent: ({ theme }) => ({
    display: "flex",
    flexFlow: "column nowrap",
    grid: {
      column: "3 / 13"
    },
    height: "100vh",
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