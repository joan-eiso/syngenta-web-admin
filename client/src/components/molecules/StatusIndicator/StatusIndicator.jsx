import { createUseStyles, useTheme } from "react-jss";
import cn from "classnames";

function StatusIndicator({ className, isActive }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={cn(classes.root, className)}>
      <div className={cn(classes.labelContainer, isActive && classes.active)}>
        <p className={classes.label}>Activo</p>
      </div>
      <div className={cn(classes.labelContainer, !isActive && classes.inactive)}>
        <p className={classes.label}>Inactivo</p>
      </div>    
    </div>
  )
}

export default StatusIndicator;

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
    backgroundColor: theme.colors.gray.lightest
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