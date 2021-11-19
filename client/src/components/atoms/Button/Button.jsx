import { createUseStyles } from "react-jss";
import cn from "classnames";

function Button({ className, type, label, onClick }) {
  const classes = useStyles();
  return (
    <button className={cn(classes.root, className)} type={type} onClick={onClick}>{label}</button>
  )
}

export default Button;

const useStyles = createUseStyles({
  root: {
    padding: "10px 40px",
    fontSize: 12,
    fontWeight: 300,
    letterSpacing: "1px",
    textTransform: "uppercase",
    outline: "none",
    border: "none",
    borderRadius: 4,
    backgroundColor: "#002d72",
    color: "white",
    cursor: "pointer"
  }
});