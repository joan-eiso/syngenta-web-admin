import { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Field, Form, Formik } from "formik";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createUser, resetCreateUser } from "../../../redux/user/duck";

import Button from "../../atoms/Button/Button";
import TextInput from "../../atoms/TextInput/TextInput";

import { checkEmptyValueOnPayload, checkValidEmail } from "../../../utils/dataValidation.util";

function NewDistForm() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const createUserSucceed = useSelector(state => state.user.createUserSucceed);
  const createUserError = useSelector(state => state.user.createUserError);
  const defaultPassword = useSelector(state => state.user.defaultPassword);

  useEffect(() => {
    if(createUserSucceed) {
      alert("Distribuidor creado correctamente");
      dispatch(resetCreateUser());
    } else if(createUserError) {
      alert("No se pudo crear el distribuidor");
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
      rank: 1,
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
            <label htmlFor="identification">Identificaci??n</label>
            <Field id="identification" name="identification" placeholder="Identificaci??n" component={TextInput} />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="company">Empresa</label>
            <Field id="company" name="company" placeholder="Empresa" component={TextInput} />
          </div>
          <div className={classes.formInputItem}>
            <label htmlFor="email">Correo electr??nico</label>
            <Field id="email" name="email" placeholder="Correo electr??nico" component={TextInput} />
          </div>
        </div>
        <div className={classes.noteContainer}>
          <p>*A cada usuario creado se le asignar?? la contrase??a <span>{defaultPassword}</span> y deber?? ser cambiada usando el sistema de recuperaci??n de contrase??a</p>
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
    marginBottom: 20,
  },

  formInputItem: {
    display: "flex",
    alignItems: "center",
    
    "& label": {
      flex: 1,
      marginRight: 20,
    },
    
    "& input": {
      flex: 2,
    }
  },

  noteContainer: {
    margin: "0px 0 20px",

    "& > p": {
      fontStyle: "italic",
      fontSize: 12,
      letterSpacing: 1
    },

    "& span": {
      fontWeight: 700,
    },
  }
})