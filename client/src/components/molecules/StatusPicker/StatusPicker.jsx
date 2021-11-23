import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import cn from "classnames";

function StatusPicker({ className, value, onChange }) {
  const [isActive, setIsActive] = useState(value ?? false);

  const handleChange = (value) => {
    if(onChange) onChange(value);
  }

  const handleActive = () => {
    if(!isActive) {
      handleChange(true);
      setIsActive(true);
    }
  }
  
  const handleInactive = () => {
    if(isActive) {
      handleChange(false);
      setIsActive(false);
    }
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={cn(classes.root, className)}>
      <div className={cn(classes.labelContainer, isActive && classes.active)} onClick={handleActive}>
        <p className={classes.label}>Activo</p>
      </div>
      <div className={cn(classes.labelContainer, !isActive && classes.inactive)} onClick={handleInactive}>
        <p className={classes.label}>Inactivo</p>
      </div>
    </div>
  )
}

export default StatusPicker;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    borderRadius: 4,
    overflow: "hidden"
  },
  
  labelContainer: ({ theme }) => ({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px 20px",
    backgroundColor: theme.colors.gray.lightest,
    cursor: "pointer",
  }),
  
  label: {
    fontSize: 12,
  },
  
  active: ({ theme }) => ({
    backgroundColor: theme.colors.primaryGreen,
    color: "white",
  }),
  
  inactive: ({ theme }) => ({
    backgroundColor: theme.colors.primaryRed,
    color: "white",
  })
});