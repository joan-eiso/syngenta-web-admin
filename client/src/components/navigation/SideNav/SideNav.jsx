import { createUseStyles, useTheme } from "react-jss";
import { FaUserCircle, FaChartPie, FaUserAlt, FaUsers, FaIdBadge, FaLeaf, FaCalendar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

import Tab from "./Tab";
import TabAnchor from "./TabAnchor";

function SideNav() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <div className={classes.logoContainer}>
          <img  className={classes.logo} src={`${process.env.PUBLIC_URL}/resources/images/nk-cerca-light.png`} alt="nk cerca logo" />
        </div>
        <div className={classes.profileContainer}>
          <FaUserCircle className={classes.profilePic} color="white" size={28} />
          <p className={classes.profileText}>Administrador</p>
        </div>
      </div>
      <div className={classes.tabs}>
        <Tab to="/resumen" Icon={FaChartPie} label="Resúmen" />
        <Tab to="/productores" Icon={FaUsers} label="Productores" />
        <Tab to="/licencias" Icon={FaIdBadge} label="Licencias" />
        <Tab to="/distribuidores" Icon={FaUserAlt} label="Distribuidores" />
        <Tab to="/productos" Icon={FaLeaf} label="Producto" />
        <Tab to="/administradores" Icon={FaCalendar} label="Administradores" />
      </div>
      <div className={classes.bottomContainer}>
        <TabAnchor href="https://eiso.co/syngenta/reporte_02.php" Icon={FiDownload} label="Descargar Reporte" />
        {/* <Tab to="/ajustes" Icon={FaCog} label="Ajustes" /> */}
        {/* <div className={classes.logoutButton}></div> */}
      </div>
    </div>
  );
}

export default SideNav

const useStyles = createUseStyles({
  root: ({ theme }) => ({
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primaryGreen,
    zIndex: 10,
  }),

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    padding: "20px 0px"
  },

  logo: {
    width: "60%",
  },

  profileContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    padding: "30px 20px",
  },

  profilePic: {
    marginRight: 20,
  },

  profileText: {
    color: "white",
    fontWeight: 700,
    letterSpacing: "1px"
  },

  topContainer: {
    flex: 2,
  },

  tabs: {
    flex: 5,
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-evenly",
  },
  
  bottomContainer: {
    flex: 2,
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: 20
  },

  logoutButton: {
    
  }
});