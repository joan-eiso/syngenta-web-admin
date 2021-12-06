import { createUseStyles, useTheme } from "react-jss";

import { useSelector } from "react-redux";
import { selectPropertyById } from "../../../../redux/property/duck";
import { selectCityById, selectDepartmentById } from "../../../../redux/zone/duck";

import Button from "../../../atoms/Button/Button";

function PropertyCard({ id, onClick }) {
  const { name, departmentId, cityId, hectares } = useSelector(state => selectPropertyById(state, id));
  const { name: departmentName } = useSelector(state => selectDepartmentById(state, departmentId));
  const { name: cityName } = useSelector(state => selectCityById(state, cityId));

  const handleClick = () => {
    onClick(id);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <p className={classes.propertyName}>{name}</p>
      <div className={classes.divider}></div>
      <p>{departmentName} - {cityName}</p>
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