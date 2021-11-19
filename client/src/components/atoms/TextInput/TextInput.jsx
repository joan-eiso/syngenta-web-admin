import { createUseStyles } from "react-jss";

function TextInput({ type, placeholder, value, ...rest }) {
  const classes = useStyles();
  return (
    <>
      {rest.field
        ? <input 
            className={classes.root} 
            type={type} 
            placeholder={placeholder} 
            {...rest.field} 
          />
        : <input className={classes.root} type={type} placeholder={placeholder} value={value} {...rest} />
      }
    </>
  )
}

export default TextInput;

const useStyles = createUseStyles({
  root: {
    padding: "10px 20px",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    border: {
      style: "solid",
      width: 1,
      color: "#9E9E9E",
      radius: 8,
    },
    backgroundColor: "white",
  }
});