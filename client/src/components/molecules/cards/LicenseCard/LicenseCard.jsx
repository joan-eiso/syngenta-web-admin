import { createUseStyles, useTheme } from "react-jss";

import Button from "../../../atoms/Button/Button";

function LicenseCard({ id, propertyName, department, city }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <p className={classes.licenseNumber}>Licencia #{id}</p>
      <div className={classes.divider}></div>
      <p>{propertyName}</p>
      <div className={classes.bottomRightContainer}>
        <p className={classes.location}>{`${department} - ${city}`}</p>
        <Button className={classes.button} label="Ver" onClick={null} />
      </div>
    </div>
  )
}

export default LicenseCard;

const useStyles = createUseStyles({
  root: {
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 1fr) minmax(10px, 2fr)",
    },
    alignItems: "center",
    padding: "20px 30px",
    borderRadius: 8,
    backgroundColor: "white",
  },

  licenseNumber: ({ theme }) => ({
    fontWeight: 700,
    color: theme.colors.primaryBlue,
  }),

  divider: {
    width: "100%",
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#9E9E9E",
    }
  },

  bottomRightContainer: {
    display: "flex",
    alignItems: "center",
  },

  location: {
    flex: 2,
    marginRight: "40px"
  },

  button: {
    flex: 1,
  }
});