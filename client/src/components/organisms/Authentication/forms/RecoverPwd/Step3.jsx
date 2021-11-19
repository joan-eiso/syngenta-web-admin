import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from "formik";
import { BsArrowLeftShort } from "react-icons/bs";

import Button from "../../../../atoms/Button/Button";
import TextInput from "../../../../atoms/TextInput/TextInput";

function Step3({ setStep }) {
  const history = useHistory();

  const handleGoBack = () => {
    setStep(2);
  }
  
  const handleChangePassword = () => {
    setStep(undefined);
    history.push("/");
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        newPassword: "",
        repeatedPassword: "",
      }}
      onSubmit={handleChangePassword}
    >
      <FormikForm>
        <div className={classes.fields}>
          <div className={classes.formInputItem}>
            <label htmlFor="newPassword">Contraseña nueva</label>
            <Field component={TextInput} id="newPassword" name="newPassword" type="password" placeholder="Contraseña nueva" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="repeatedPassword">Repite la contraseña</label>
            <Field component={TextInput} id="repeatedPassword" name="repeatedPassword" type="password" placeholder="Contraseña nueva" />
          </div>
        </div>
        <div className={classes.actions}>
          <Button className={classes.changePwdButton} type="submit" label="Cambiar contraseña" />
          <div className={classes.goBackWrapper} onClick={handleGoBack}>
            <BsArrowLeftShort className={classes.goBackIcon} size={24} color={theme.colors.bodyText.base} />
            <p className={classes.goBackText}>Volver</p>
          </div>
        </div>
      </FormikForm>
    </Formik>
  )
}

export default Step3;

const useStyles = createUseStyles({
  fields: {
    marginBottom: 30,
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
    flexFlow: "column nowrap",
  },

  changePwdButton: {
    marginBottom: 40,
    backgroundColor: ({ theme }) => theme.colors.primaryGreen
  },

  goBackWrapper: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },

  goBackIcon: {
    marginRight: 10,
  },

  goBackLink: {
    fontSize: 12,
    fontWeight: 500,
    color: ({ theme }) => theme.colors.bodyText.base,
    textDecoration: "none",
    cursor: "pointer",
  }
});