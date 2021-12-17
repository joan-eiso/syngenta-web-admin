import { createUseStyles } from "react-jss";
import { Route, Switch } from "react-router-dom";

import Authentication from "../../screens/Authentication/Authentication";

function AuthRouter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>  
      <Switch>
        <Route path="/">
          <Authentication />
        </Route>
      </Switch>
    </div>
  )
}

export default AuthRouter;

const useStyles = createUseStyles({
  root: {
    width: "100%",
    height: "100%",
  }
});