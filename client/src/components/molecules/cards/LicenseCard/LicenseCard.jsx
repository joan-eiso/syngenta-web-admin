import { createUseStyles, useTheme } from "react-jss";

import { useSelector } from "react-redux";
import { selectLicenseById } from "../../../../redux/license/duck";

import Button from "../../../atoms/Button/Button";

function LicenseCard({ id, handleDownload }) {
  const data = useSelector((state) => selectLicenseById(state, id));
  let date = new Date(data.date);
  let day = date.getDate().toString().length > 1 ? date.getDate() : "0" + date.getDate();
  let month = (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : "0" + (date.getDate() + 1);
  let year = date.getFullYear();
  date = `${day}/${month}/${year}`

  const handleClick = () => {
    handleDownload(id);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <p className={classes.licenseNumber}>Licencia #{data.id}</p>
      <div className={classes.divider}></div>
      <p>{data.propertyName}</p>
      <div className={classes.bottomRightContainer}>
        <p className={classes.location}>Fecha: {date}</p>
        <Button className={classes.button} label="Ver" onClick={handleClick} />
      </div>
    </div>
  )
}

export default LicenseCard;

const useStyles = createUseStyles({
  root: {
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 1fr) minmax(10px, 1fr)",
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