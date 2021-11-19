import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form as FormikForm, Field } from "formik";
import { BsArrowLeftShort } from "react-icons/bs";

import Button from "../../../../atoms/Button/Button";
import TextInput from "../../../../atoms/TextInput/TextInput";

function Step2({ setStep }) {

  const handleGoBack = () => {
    setStep(1);
  }

  const handleVerifyCode = () => {
    setStep(3);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        code: "",
      }}
      onSubmit={handleVerifyCode}
    >
      <FormikForm>
        <div className={classes.fields}>
          <div className={classes.formInputItem}>
            <label htmlFor="code">Código de verificación</label>
            <Field component={TextInput} id="code" name="code" placeholder="Código de verificación" />
          </div>
        </div>
        <div className={classes.actions}>
          <Button className={classes.verifyCodeButton} type="submit" label="Verificar" />
          <div className={classes.goBackWrapper} onClick={handleGoBack}>
            <BsArrowLeftShort className={classes.goBackIcon} size={24} color={theme.colors.bodyText.base} />
            <p className={classes.goBackText}>Volver</p>
          </div>
        </div>
      </FormikForm>
    </Formik>
  )
}

export default Step2;

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

  verifyCodeButton: {
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