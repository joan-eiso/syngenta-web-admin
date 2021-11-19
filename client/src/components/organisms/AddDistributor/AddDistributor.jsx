import { createUseStyles, useTheme } from "react-jss";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import cn from "classnames";

import Dropzone from '../../molecules/Dropzone/Dropzone';
import NewDistForm from "./NewDistForm";

function AddDistributor() {  
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/distribuidores");
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.breadcrumbs}>
          <Link className={classes.goToUsersLink} to="/distribuidores">Distribuidores</Link>
          <FiChevronRight className={classes.breadcrumbsIcon} size={16} color={theme.colors.gray.base} />
          <p>Añadir distribuidores</p>
        </div>
        <div className={classes.goBackButton} onClick={handleGoBack}>
          <FiChevronLeft className={classes.goBackIcon} size={21} color={theme.colors.bodyText.base} />
          <p className={classes.goBackText}>Volver</p>
        </div>
      </header>
      <div className={classes.contentWrapper}>
        <section className={classes.mainContent}>
          <div className={classes.tabs}>
            <Route 
              exact
              path="/distribuidores/añadir"
              children={({ match }) => (
                <Link className={cn(classes.link, match && classes.activeLink)} to="/distribuidores/añadir">Crear distribuidor</Link>
              )}
            />
            <Route 
              exact
              path="/distribuidores/añadir/cargar-archivo"
              children={({ match }) => (
                <Link className={cn(classes.link, match && classes.activeLink)} to="/distribuidores/añadir/cargar-archivo">Cargar archivo</Link>
              )}
            />
          </div>
          <Switch>
            <Route exact path="/distribuidores/añadir">
              <div className={classes.formContainer}>
                <NewDistForm />
              </div>
            </Route>
            <Route exact path="/distribuidores/añadir/cargar-archivo">
              <div className={classes.dropzoneContainer}>
                <Dropzone />
              </div>
            </Route>
          </Switch>
        </section>
      </div>
    </div>
  )
}

export default AddDistributor;

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
  
  goToUsersLink: ({ theme }) => ({
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

  link: ({ theme }) => ({
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.colors.bodyText.light,
  }),

  activeLink: ({ theme }) => ({
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
  },

  dropzoneContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: "20px 80px",
    borderRadius: 8,
    backgroundColor: "white",
  }
});