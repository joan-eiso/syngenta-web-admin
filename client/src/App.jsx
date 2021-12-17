import { createUseStyles } from "react-jss";

import { useSelector } from "react-redux";

import AuthRouter from "./components/routers/AuthRouter/AuthRouter";
import SessionRouter from "./components/routers/SessionRouter/SessionRouter";

function App() {
  const token = useSelector(state => state.auth.token);
  const loadDataSucceed = useSelector(state => state.auth.loadDataSucceed);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      { token && loadDataSucceed
        ? <SessionRouter />
        : <AuthRouter />
      } 
    </div>
  );
}

export default App;

const useStyles = createUseStyles({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  }
});