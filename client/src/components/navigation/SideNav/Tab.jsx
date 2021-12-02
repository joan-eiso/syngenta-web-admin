import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

function Tab({ Icon, to, label }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon className={classes.icon} color="white" size={18} />
      <Link className={classes.link} to={to}>{label}</Link>
    </div>
  )
}

export default Tab;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flex: {
      alignItems: "center",
    },
    padding: "15px 30px",
  },

  icon: {
    marginRight: "20px",
  },

  link: {
    fontSize: 14,
    fontWeight: 300,
    color: "white",
    textDecoration: "none",
    letterSpacing: "1px"
  },
});