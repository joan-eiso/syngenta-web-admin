import { createUseStyles, useTheme } from "react-jss";
import { RiMenu2Line } from "react-icons/ri";
import { FaBell } from "react-icons/fa";

function TopBar() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <RiMenu2Line size={18} color={theme.colors.primaryBlue} />
      <FaBell size={18} color={theme.colors.primaryBlue} />
    </div>
  )
}

export default TopBar;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "white",
  }
});