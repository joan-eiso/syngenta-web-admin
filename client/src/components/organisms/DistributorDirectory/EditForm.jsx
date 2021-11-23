import { useState } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import { createUseStyles, useTheme } from "react-jss";
import { FiX } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../redux/user/duck";

import Button from '../../atoms/Button/Button';
import TextInput from "../../atoms/TextInput/TextInput";
import StatusPicker from "../../molecules/StatusPicker/StatusPicker";

function EditForm({ distributor: { 
  id,
  name,
  identification,
  email,
  password,
  temp,
  status,
  company,
  groupId,
  rank,
}, handleClose }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);

  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(status);

  const handleSubmit = (values) => {
    if(isEditing) {
      let data = {
        distAuth,
        id,
        password,
        temp,
        groupId,
        rank,
        name: values.name,
        identification: values.identification,
        email: values.email,
        status: isActive,
        company: values.company,
      }
      dispatch(editUser(token, data));
      handleClose();
    }
  }

  const onEditing = () => {
    if(!isEditing) setIsEditing(true);
  }

  const handleFormChange = () => {
    onEditing();
  }
  
  const handleStatusChange = (value) => {
    onEditing();
    setIsActive(value);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        name,
        identification,
        company,
        email
      }}
      onSubmit={handleSubmit}
    >
      <FormikForm className={classes.form} onChange={handleFormChange}>
        <div className={classes.headingWrapper}>
          <h2 className={classes.title}>Datos del distribuidor</h2>
          <FiX className={classes.closeIcon} size={24} color={theme.colors.gray.base} onClick={handleClose} />
        </div>

        <StatusPicker className={classes.statusIndicator} value={isActive} onChange={handleStatusChange} />
          
        <div className={classes.fields}>
          <div className={classes.formInputItem}>
            <label htmlFor="name">Nombre</label>
            <Field component={TextInput} id="name" name="name" placeholder="Nombre" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="identification">Identificación</label>
            <Field component={TextInput} id="identification" name="identification" placeholder="Identificación" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="company">Empresa</label>
            <Field component={TextInput} id="company" name="company" placeholder="Empresa" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="email">Correo electrónico</label>
            <Field component={TextInput} id="email" name="email" placeholder="Correo electrónico" />
          </div>
        </div>

        <Button className={classes.submitButton} label="Guardar" type="submit" isEnable={isEditing} />
      </FormikForm>
    </Formik>
  )
}

export default EditForm;

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

  statusIndicator: {
    marginBottom: 30,
    width: "clamp(50%, 400px, 90%)",
    alignSelf: "center",
  },

  fields: {
    marginBottom: 40,
  },

  formInputItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    
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
    },
    
    "&:last-child": {
      marginBottom: 0
    }
  },

  submitButton: {
    alignSelf: "flex-end",
  }
});