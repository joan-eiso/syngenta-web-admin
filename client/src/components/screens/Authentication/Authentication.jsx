import { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";

import { useDispatch } from "react-redux";
import { resetPwdRecoveryStatus } from "../../../redux/authentication/duck";

import LoginForm from "./forms/Login/LoginForm";
import RecoverPwdForm from "./forms/RecoverPwd/RecoverPwdForm";

function Authentication() {
  const dispatch = useDispatch();

  const [onRecoveryPwd, setOnRecoveryPwd] = useState(false);
  const [pwdRecoveryStep, setPwdRecoveryStep] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    dispatch(resetPwdRecoveryStatus());
  }, [dispatch]);

  useEffect(() => {
    if(location.pathname === "/recuperar-contraseña") {
      setPwdRecoveryStep(1);
    } else {
      setPwdRecoveryStep(undefined);
      setOnRecoveryPwd(false);
    } 
  }, [location])
  
  useEffect(() => {
    if(pwdRecoveryStep) {
      setOnRecoveryPwd(true);
    }
  }, [pwdRecoveryStep])

  const theme = useTheme();
  const classes = useStyles({ theme }); 
  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <div className={classes.logoWrapper}>
          <img className={classes.logo} src={`${process.env.PUBLIC_URL}/resources/images/icon75.png`} alt="icono nk cerca" />
        </div>
        <div className={classes.headingWrapper}>
          <h2 className={classes.title}>{onRecoveryPwd ? "Recuperar contraseña" : "Bienvenido a NK Cerca"}</h2>
          <div className={classes.divider}></div>
          <p className={classes.description}>{onRecoveryPwd ? `Paso ${pwdRecoveryStep} / 3` : "Una herramienta de NK Semillas"}</p>
        </div>
        <div className={classes.formWrapper}>
          <Switch>
            {pwdRecoveryStep && <Route path="/recuperar-contraseña">
              <RecoverPwdForm step={pwdRecoveryStep} setStep={setPwdRecoveryStep} />
            </Route>}
            <Route path="/">
              <LoginForm />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Authentication;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: ({ theme }) => theme.colors.primaryGreen,
  },
  
  contentWrapper: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    width: 600,
    padding: "50px 100px",
    backgroundColor: "white",
    borderRadius: 20,
  },

  logoWrapper: {
    marginBottom: 20,
  },
  
  logo: {
  },

  headingWrapper: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
  },

  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 500,
    color: ({ theme }) => theme.colors.bodyText.base,
    textTransform: "uppercase",
    letterSpacing: 1,
  }, 
  
  divider: {
    width: "100%",
    margin: "5px 0",
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#9E9E9E",
    }
  },
  
  description: {
    fontSize: 14,
    fontWeight: 300,
    color: ({ theme }) => theme.colors.bodyText.base,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  formWrapper: {
    width: "100%",
  }
});