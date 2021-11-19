import { createUseStyles, useTheme } from "react-jss";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import LicenseCard from "../../molecules/cards/LicenseCard/LicenseCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function LicenseDirectory() {
  const licenses = [
    {
      id: 1,
      propertyName: "Hacienda El Cóndor Andino",
      department: "Caldas",
      city: "Manizales",
    },
    {
      id: 2,
      propertyName: "Hacienda El Molino",
      department: "Valle del Cauca",
      city: "Potrerito",
    }
  ];
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Licencias</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
        </div>
      </header>
      <div className={classes.licenseList}>
        {licenses.map(license => (
          <LicenseCard 
            key={license.id}
            id={license.id}  
            propertyName={license.propertyName}
            department={license.department}
            city={license.city}
          />
        ))}
      </div>
    </div>
  )
}

export default LicenseDirectory;


const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px",
  },
  
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  
  title: ({ theme }) => ({
    flex: 2,
    fontWeight: 700,
    letterSpacing: 1,
    color: theme.colors.bodyText.base
  }),

  actions: {
    flex: 3,
    display: "flex",
    alignItems: "center",
  },

  filterButton: {
    marginRight: 20,
  },
  
  licenseList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 1fr)",
      templateRows: "repeat(4, minmax(10px, 1fr))",
      rowGap: "10px",
    },
  }
});