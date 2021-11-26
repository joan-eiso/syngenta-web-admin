import { createUseStyles, useTheme } from "react-jss";

function Chip({ name, color, textColor }) {
  const theme = useTheme();
  const classes = useStyles({ theme, color, textColor });
  return (
    <div className={classes.root}>
      <p className={classes.name}>{name}</p>
    </div>
  )
}

export default Chip;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 30px",
    borderRadius: 8,
    backgroundColor: ({ theme, color }) => color ? color : theme.colors.gray.lightest,
  },

  name: {
    fontSize: 12,
    fontWeight: 400,
    color: ({ textColor }) => textColor,
    textTransform: "uppercase",
    letterSpacing: 1,
  }
});
