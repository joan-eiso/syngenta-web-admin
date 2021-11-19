import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from "formik";
import { BsArrowLeftShort } from "react-icons/bs";

import Button from "../../../../atoms/Button/Button";
import TextInput from "../../../../atoms/TextInput/TextInput";

function Step1({ setStep }) {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  }

  const handleSendCode = () => {
    setStep(2);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={handleSendCode}
    >
      <FormikForm>
        <div className={classes.fields}>
          <div className={classes.formInputItem}>
            <label htmlFor="email">Correo electrónico</label>
            <Field component={TextInput} id="email" name="email" type="email" placeholder="Correo electrónico" />
          </div>
        </div>
        <div className={classes.actions}>
          <Button className={classes.sendCodeButton} type="submit" label="Enviar código" />
          <div className={classes.goBackWrapper} onClick={handleGoBack}>
            <BsArrowLeftShort className={classes.goBackIcon} size={24} color={theme.colors.bodyText.base} />
            <p className={classes.goBackText}>Volver</p>
          </div>
        </div>
      </FormikForm>
    </Formik>
  )
}

export default Step1;

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
  },

  actions: {
    display: "flex",
    flexFlow: "column nowrap",
  },

  sendCodeButton: {
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