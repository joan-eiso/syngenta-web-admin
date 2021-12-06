import { createUseStyles, useTheme } from "react-jss";
import { useSelector } from "react-redux";
import { FiX } from "react-icons/fi";

import { selectPropertyById } from "../../../../redux/property/duck";
import { selectCityById, selectCountryById, selectDepartmentById, selectSubregionById } from "../../../../redux/zone/duck";

function PropertyDetail({ id, handleClose}) {
  const { name, countryId, departmentId, cityId, subregionId, lat, long, hectares } = useSelector(state => selectPropertyById(state, id));
  const { name: countryName } = useSelector(state => selectCountryById(state, countryId));
  const { name: departmentName } = useSelector(state => selectDepartmentById(state, departmentId));
  const { name: cityName } = useSelector(state => selectCityById(state, cityId));
  const { name: subregionName } = useSelector(state => selectSubregionById(state, subregionId));

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div>
      <div className={classes.headingWrapper}>
        <h2 className={classes.title}>Datos del Predio</h2>
        <FiX className={classes.closeIcon} size={24} color={theme.colors.gray.base} onClick={handleClose} />
      </div>

      <div className={classes.item}>
        <p className={classes.itemLabel}>Nombre</p>
        <p className={classes.itemValue}>{name}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>País</p>
        <p className={classes.itemValue}>{countryName}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Departamento</p>
        <p className={classes.itemValue}>{departmentName}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Ciudad</p>
        <p className={classes.itemValue}>{cityName}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Subregión</p>
        <p className={classes.itemValue}>{subregionName}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Coordenadas</p>
        <p className={classes.itemValue}>{lat}, {long}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Hectareas</p>
        <p className={classes.itemValue}>{hectares}</p>
      </div>
    </div>
  )
}

export default PropertyDetail;

const useStyles = createUseStyles({
  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 21,
    color: ({ theme }) => theme.colors.bodyText.base,
  },

  closeIcon: {
    cursor: "pointer"
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,

    "&:last-child": {
      marginBottom: 0
    }
  },

  itemLabel: {
    flex: 1,
    marginRight: 20,
    marginBottom: 5,
    fontSize: 12,
  },

  itemValue: {
    flex: 2,
    padding: "10px 20px",
    border: {
      style: "none",
    },
    backgroundColor: ({ theme }) => theme.colors.gray.lightest,
  },

  submitButton: {
    alignSelf: "flex-end",
  }
});