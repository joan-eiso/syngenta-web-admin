import { createUseStyles, useTheme } from "react-jss";
import { FiX } from "react-icons/fi";

function PropertyDetail({ data: { id, name, country, department, city, subregion, hectares }, handleClose}) {
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
        <p className={classes.itemValue}>{country}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Departamento</p>
        <p className={classes.itemValue}>{department}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Ciudad</p>
        <p className={classes.itemValue}>{city}</p>
      </div>
      <div className={classes.item}>
        <p className={classes.itemLabel}>Subregión</p>
        <p className={classes.itemValue}>{subregion}</p>
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