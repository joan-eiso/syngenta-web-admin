import { createUseStyles, useTheme } from "react-jss";
import cn from "classnames";

function Button({ className, type, label, isEnable = true, onClick }) {
  const theme = useTheme();
  const classes = useStyles({ theme, isEnable });

  const handleClick = () => {
    if(isEnable && onClick) onClick();
  }

  return (
    <button className={cn(classes.root, className)} type={type} onClick={handleClick}>{label}</button>
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
    backgroundColor: ({ theme, isEnable }) => isEnable ? theme.colors.primaryBlue : theme.colors.gray.light,
    color: ({ theme, isEnable }) => isEnable ? "white" : theme.colors.bodyText.light,
    cursor: ({ isEnable }) => isEnable ? "pointer" : "default"
  }
});