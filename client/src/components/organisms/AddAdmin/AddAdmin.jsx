import { createUseStyles, useTheme } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import CreateAdminForm from "./CreateAdminForm";

function AddAdmin() {  
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/administradores");
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.breadcrumbs}>
          <Link className={classes.goToAdminsLink} to="/administradores">Administradores</Link>
          <FiChevronRight className={classes.breadcrumbsIcon} size={16} color={theme.colors.gray.base} />
          <p>Añadir administradores</p>
        </div>
        <div className={classes.goBackButton} onClick={handleGoBack}>
          <FiChevronLeft className={classes.goBackIcon} size={21} color={theme.colors.bodyText.base} />
          <p className={classes.goBackText}>Volver</p>
        </div>
      </header>
      <div className={classes.contentWrapper}>
        <section className={classes.mainContent}>
          <div className={classes.tabs}>
            <p className={classes.tab} to="/administradores/añadir">Crear administrador</p>
          </div>
          <div className={classes.formContainer}>
            <CreateAdminForm />
          </div>
        </section>
      </div>
    </div>
  )
}

export default AddAdmin;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px",
  },
  
  header: {
    display: "flex",
    justifyContent: "space-between",
  },

  breadcrumbs: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0",
  },
  
  goToAdminsLink: ({ theme }) => ({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: "none",
    color: theme.colors.bodyText.base,
  }),
  
  breadcrumbsIcon: {
    margin: "0px 10px",
  },
  
  goBackButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
  
  goBackIcon: {
    marginRight: 10,
  },
  
  goBackText: ({ theme }) => ({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: "none",
    color: theme.colors.bodyText.base,
  }),

  contentWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingTop: 40,
  },

  mainContent: {
    width: "60%",
  },

  tabs: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  tab: ({ theme }) => ({
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.colors.bodyText.base,
  }),

  formContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: "20px 40px",
    borderRadius: 8,
    backgroundColor: "white",

    "& form": {
      display: "flex",
      flexFlow: "column nowrap"
    }
  }
});