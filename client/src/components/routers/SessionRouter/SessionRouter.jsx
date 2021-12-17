import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Redirect, Route, Switch } from "react-router-dom";

import SideNav from "../../navigation/SideNav/SideNav";
import TopBar from "../../molecules/TopBar/TopBar";
import Dashboard from "../../screens/Dashboard/Dashboard";
import ProducerDetail from "../../screens/ProducerDetail/ProducerDetail";
import ProducerDirectory from "../../screens/ProducerDirectory/ProducerDirectory";
import LicenseDirectory from "../../screens/LicenseDirectory/LicenseDirectory";
import AddDistributor from "../../screens/AddDistributor/AddDistributor";
import DistributorDirectory from "../../screens/DistributorDirectory/DistributorDirectory";
import ProductDirectory from "../../screens/ProductDirectory/ProductDirectory";
import AddAdmin from "../../screens/AddAdmin/AddAdmin";
import AdminDirectory from "../../screens/AdminDirectory/AdminDirectory";

function SessionRouter() {
  const [sideNavIsOpen, setSideNavIsOpen] = useState(true);

  const toggleSidebar = () => {
    setSideNavIsOpen(!sideNavIsOpen);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
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
          </Route>¿
          <Route path="/">
            <Redirect to="/resumen" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default SessionRouter;

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(10px, 1fr))",
    width: "100%",
    height: "100%",
  },

  sideNav: {
    grid: {
      column: "1 / 4",
    },
    height: "100vh",
  },
  
  mainContent: ({ theme }) => ({
    display: "flex",
    flexFlow: "column nowrap",
    grid: {
      column: "4 / 13"
    },
    height: "100vh",
    backgroundColor: theme.colors.gray.lightest
  }),
});
