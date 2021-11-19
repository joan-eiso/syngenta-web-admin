import { createUseStyles } from "react-jss";
import { Field, Form, Formik } from "formik";

import Button from "../../atoms/Button/Button";
import TextInput from "../../atoms/TextInput/TextInput";

function NewDistForm() {
  const handleCreate = (values) => {
    console.log('values:', values);
  }

  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        name: "",
        identification: "",
        address: "",
        phone: "",
        email: "",
      }}
      onSubmit={handleCreate}
      >
      <Form>
        <div className={classes.formInputs}>
          <div className={classes.formInputItem}>
            <label htmlFor="name">Nombre</label>
            <Field id="name" name="name" placeholder="Nombre completo" component={TextInput} />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="identification">Identificación</label>
            <Field id="identification" name="identification" placeholder="Identificación" component={TextInput} />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="address">Dirección</label>
            <Field id="address" name="address" placeholder="Dirección" component={TextInput} />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="phone">Teléfono</label>
            <Field id="phone" name="phone" placeholder="Teléfono" component={TextInput} />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="email">Correo electrónico</label>
            <Field id="email" name="email" placeholder="Correo electrónico" component={TextInput} />
          </div>
        </div>
        <Button type="submit" label="Crear" />
      </Form>
    </Formik>
  )
}

export default NewDistForm;

const useStyles = createUseStyles({
  formInputs: {
    display: "grid",
    gap: 10,
    marginBottom: 30,
  },

  formInputItem: {
    display: "flex",
    alignItems: "center",
    
    "& label": {
      flex: 1,
      marginRight: 10,
    },
    
    "& input": {
      flex: 2,
    }
  }
})