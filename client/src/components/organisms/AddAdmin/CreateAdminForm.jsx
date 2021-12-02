import { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Field, Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createUser, resetCreateUser } from "../../../redux/user/duck";

import Button from "../../atoms/Button/Button";
import TextInput from "../../atoms/TextInput/TextInput";

import { checkEmptyValueOnPayload, checkValidEmail } from "../../../utils/dataValidation.util";

function CreateAdminForm() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const createUserSucceed = useSelector(state => state.user.createUserSucceed);
  const createUserError = useSelector(state => state.user.createUserError);

  useEffect(() => {
    if(createUserSucceed) {
      alert("Administrador creado correctamente");
      dispatch(resetCreateUser());
    } else if(createUserError) {
      alert("No se pudo crear el administrador");
      dispatch(resetCreateUser());
    }
  }, [dispatch, createUserSucceed, createUserError]);

  const handleCreate = (values, actions) => {
    let { name, identification, company,  email } = values;
    let payload = {
      distAuth,
      name,
      identification,
      email,
      company,
      password: "nkcerca.semillas",
      temp: "0000",
      status: 1, 
      groupId: 0,
      rank: 2,
    }
    if(checkEmptyValueOnPayload(values)) {
      alert("Debes ingresar todos los valores");
      return;
    } 
    else if(!checkValidEmail(email)) {
      alert("Ingresa un email valido");
      return;
    }

    dispatch(createUser(token, payload));

    actions.resetForm({ values: {
      name: "",
      identification: "",
      company: "",
      email: "",
    }});
  }

  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        name: "",
        identification: "",
        company: "",
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
            <label htmlFor="company">Empresa</label>
            <Field id="company" name="company" placeholder="Empresa" component={TextInput} />
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

export default CreateAdminForm;

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