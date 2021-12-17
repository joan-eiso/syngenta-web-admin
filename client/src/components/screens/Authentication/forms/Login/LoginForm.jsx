import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import { createUseStyles, useTheme } from "react-jss";

import { useDispatch } from "react-redux";
import { login, resetPwdRecoveryStatus } from "../../../../../redux/authentication/duck";

import Button from "../../../../atoms/Button/Button";
import TextInput from "../../../../atoms/TextInput/TextInput";

import { checkEmptyValueOnPayload, checkValidEmail } from "../../../../../utils/dataValidation.util";

function LoginForm() {
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    let { email, password } = values;
    if(checkEmptyValueOnPayload(values)) {
      alert("Ingresa tus credenciales");
      return;
    } 
    else if(!checkValidEmail(email)) {
      alert("Ingresa un email valido");
      return;
    }
    dispatch(login(email, password));
  }

  useEffect(() => {
    dispatch(resetPwdRecoveryStatus());
  }, [dispatch]);

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleLogin}
    >
      <FormikForm>
        <div className={classes.fields}>
          <div className={classes.formInputItem}>
            <label htmlFor="email">Correo electrónico</label>
            <Field component={TextInput} id="email" name="email" type="email" placeholder="Correo electrónico" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="password">Contraseña</label>
            <Field component={TextInput} id="password" name="password" type="password" placeholder="Contraseña" />
          </div>
        </div>
        <div className={classes.actions}>
          <Link className={classes.restorePwdLink} to="/recuperar-contraseña">Olvidé mi contraseña</Link>
          <Button type="submit" label="Iniciar sesión" />
        </div>
      </FormikForm>
    </Formik>
  )
}

export default LoginForm;

const useStyles = createUseStyles({
  fields: {
    marginBottom: 40,
  },

  formInputItem: {
    display: "flex",
    flexFlow: "column nowrap",
        
    "& label": {
      marginBottom: 5,
      fontSize: 12,
    },

    "& input": {
      border: {
        style: "none",
      },
      backgroundColor: ({ theme }) => theme.colors.gray.lightest,
    },

    "&:first-child": {
      marginBottom: 20,
    }
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  restorePwdLink: {
    fontSize: 12,
    fontWeight: 500,
    color: ({ theme }) => theme.colors.primaryRed,
    textDecoration: "none",
    cursor: "pointer",
  }
});