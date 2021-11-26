import { createUseStyles, useTheme } from "react-jss";

import Button from "../../../atoms/Button/Button";

function PropertyCard({ id, name, country, department, city, subregion, hectares, onClick }) {
  const handleClick = () => {
    onClick(id, name, country, department, city, subregion, hectares);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <p className={classes.propertyName}>{name}</p>
      <div className={classes.divider}></div>
      <p>{department} - {city}</p>
      <div className={classes.bottomRightContainer}>
        <p className={classes.hectares}>{`${hectares} hectarea${hectares === 1 ? "" : "s"}`}</p>
        <Button className={classes.button} label="Ver" onClick={handleClick} />
      </div>
    </div>
  )
}

export default PropertyCard;

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

  propertyName: ({ theme }) => ({
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

  hectares: {
    flex: 2,
    marginRight: "40px"
  },

  button: {
    flex: 1,
  }
});