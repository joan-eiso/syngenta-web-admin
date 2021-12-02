import { createUseStyles } from "react-jss";

function TabButton({ Icon, label, onClick }) {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <Icon className={classes.icon} color="white" size={18} />
      <p className={classes.label} >{label}</p>
    </div>
  )
}

export default TabButton;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flex: {
      alignItems: "center",
    },
    padding: "20px 30px",
    backgroundColor: "#126A47",
  },

  icon: {
    marginRight: "20px",
  },

  label: {
    fontSize: 14,
    fontWeight: 300,
    color: "white",
    textDecoration: "none",
    letterSpacing: "1px",
    cursor: "pointer"
  },
});