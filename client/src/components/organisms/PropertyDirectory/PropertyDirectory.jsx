import { createUseStyles, useTheme } from "react-jss";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import PropertyCard from "../../molecules/cards/PropertyCard/PropertyCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function PropertyDirectory() {
  const properties = [
    {
      id: 1,
      name: "Hacienda El Cóndor Andino",
      department: "Huila",
      city: "Neiva",
      hectares: 350
    },
    {
      id: 2,
      name: "Hacienda El Molino",
      department: "Antioquia",
      city: "Necoclí",
      hectares: 400
    }
  ];
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Predios</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
        </div>
      </header>
      <div className={classes.propertyList}>
        {properties.map(property => (
          <PropertyCard 
            key={property.id}  
            id={property.id}  
            name={property.name}
            department={property.department}
            city={property.city}
            hectares={property.hectares}
          />
        ))}
      </div>
    </div>
  )
}

export default PropertyDirectory;

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
  
  propertyList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 1fr)",
      templateRows: "repeat(4, minmax(10px, 1fr))",
      rowGap: "10px",
    },
  }
});