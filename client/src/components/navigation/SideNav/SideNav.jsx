import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router-dom";
import { FaUserCircle, FaChartPie, FaUserAlt, FaUsers, FaIdBadge, FaLeaf, FaCalendar } from "react-icons/fa";
import { FiDownload, FiLogOut } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authentication/duck";

import Tab from "./Tab";
import TabButton from "./TabButton";

import { dataURIToBlob, downloadGeneralReport } from "../../../utils/reports.util";

function SideNav() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const history = useHistory();
  
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  }

  const handleDownloadGeneralReport = async () => {
    const { data: { response: dataURI } } = await downloadGeneralReport(distAuth, token);
    const blob = dataURIToBlob(dataURI);
    const url = URL.createObjectURL(blob);
    window.location.assign(url);
    URL.revokeObjectURL(url);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.topContainer}>
        <div className={classes.logoContainer}>
          <img  className={classes.logo} src={`${process.env.PUBLIC_URL}/resources/images/logo124.png`} alt="nk cerca logo" />
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
        <TabButton Icon={FiDownload} label="Descargar Reporte" onClick={handleDownloadGeneralReport} />
        <TabButton Icon={FiLogOut} label="Salir" onClick={handleLogout} />
        <div className={classes.logoutButton}></div>
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
    padding: "30px 0px 20px"
  },

  logo: {
    marginLeft: -20,
  },

  profileContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginBottom: 10,
    padding: "20px 20px",
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
    flex: 1,
  },

  tabs: {
    flex: 4,
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
  },
  
  bottomContainer: {
    flex: 2,
    display: "flex",
    flexFlow: "column nowrap",    
    justifyContent: "flex-end",
  }
});