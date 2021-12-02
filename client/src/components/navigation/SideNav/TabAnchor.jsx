import { createUseStyles } from "react-jss";

function TabAnchor({ Icon, href, label }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon className={classes.icon} color="white" size={18} />
      <a className={classes.link} href={href} target="_blank" rel="noreferrer">{label}</a>
    </div>
  )
}

export default TabAnchor;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flex: {
      alignItems: "center",
    },
    padding: "20px 30px",
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