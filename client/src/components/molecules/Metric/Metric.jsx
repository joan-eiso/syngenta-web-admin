import { createUseStyles, useTheme } from "react-jss";

function Metric({ title, value, label, backgroundColor, color }) {
  const theme = useTheme();
  const classes = useStyles({ theme, backgroundColor, color });
  return (
    <div className={classes.root}>
      <h5 className={classes.title}>{title}</h5>
      <p className={classes.value}>{value}</p>
      <p className={classes.label}>{label}</p>
      <div className={classes.tag}></div>
    </div>
  )
}

export default Metric;

const useStyles = createUseStyles({
  root: {
    position: "relative",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    overflow: "hidden",
  },

  title: {
    margin: 5,
    fontSize: 12,
    fontWeight: 400,
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 1.1,
  },
  
  value: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
  },
  
  label: {
    marginBottom: 10,
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 1.1,
  },

  tag: ({ color }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 10,
    backgroundColor: color,
  })
});