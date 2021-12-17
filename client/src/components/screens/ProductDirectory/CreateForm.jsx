import { Formik, Form as FormikForm, Field } from "formik";
import { createUseStyles, useTheme } from "react-jss";
import { FiX } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { createCrop } from "../../../redux/product/duck";

import Button from '../../atoms/Button/Button';
import TextInput from "../../atoms/TextInput/TextInput";

function CreateForm({ handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);

  const handleSubmit = ({ name }) => {
    if (name.length <= 0) {
      alert("Ingresa el nombre del cultivar");
      return;
    }
    dispatch(createCrop(token, distAuth, name.toUpperCase()));
    handleClose();
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        name: ""
      }}
      onSubmit={handleSubmit}
    >
      <FormikForm className={classes.form}>
        <div className={classes.headingWrapper}>
          <h2 className={classes.title}>Crear cultivar</h2>
          <FiX className={classes.closeIcon} size={24} color={theme.colors.gray.base} onClick={handleClose} />
        </div>
          
        <div className={classes.fields}>
          <div className={classes.formInputItem}>
            <label htmlFor="name">Nombre</label>
            <Field component={TextInput} id="name" name="name" placeholder="Nombre del cultivar" />
          </div>
        </div>

        <Button className={classes.submitButton} label="Crear" type="submit" />
      </FormikForm>
    </Formik>
  )
}

export default CreateForm;

const useStyles = createUseStyles({
  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 21,
    color: ({ theme }) => theme.colors.bodyText.base,
  },

  closeIcon: {
    cursor: "pointer"
  },

  form: {
    display: "flex",
    flexFlow: "column nowrap"
  },

  fields: {
    marginBottom: 20,
  },

  formInputItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
    "& label": {
      flex: 1,
      marginRight: 20,
      marginBottom: 5,
      fontSize: 12,
    },
    
    "& input": {
      flex: 2,
      border: {
        style: "none",
      },
      backgroundColor: ({ theme }) => theme.colors.gray.lightest,
    }
  },

  submitButton: {
    alignSelf: "flex-end",
  }
});