import { useState } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import { createUseStyles, useTheme } from "react-jss";

import TextInput from "../../atoms/TextInput/TextInput";

function EditForm({ user: { id, isActive, name, identification, address, phone, email }}) {
  const [isEditing, setIsEditing] = useState(false);

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <Formik
      initialValues={{
        name: name,
        identification: identification,
        address: address,
        phone: phone,
        email: email
      }}
      onSubmit={null}
    >
      <FormikForm>
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
            <label htmlFor="address">Dirección</label>
            <Field component={TextInput} id="address" name="address" placeholder="Dirección" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="phone">Teléfono</label>
            <Field component={TextInput} id="phone" name="phone" placeholder="Teléfono" />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="email">Correo electrónico</label>
            <Field component={TextInput} id="email" name="email" placeholder="Correo electrónico" />
          </div>
        </div>
      </FormikForm>
    </Formik>
  )
}

export default EditForm;

const useStyles = createUseStyles({
  fields: {
    // marginBottom: 40,
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
});