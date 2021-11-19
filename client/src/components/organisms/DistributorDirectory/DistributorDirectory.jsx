import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router";
import Button from "../../atoms/Button/Button";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import DistributorCard from "../../molecules/cards/DistributorCard/DistributorCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function DistributorDirectory() {
  const producers = [
    {
      id: 1,
      name: "Maria Cristina Monsalve",
      isActive: false,
    },
    {
      id: 2,
      name: "Ricardo Acevedo",
      isActive: true,
    },
    {
      id: 3,
      name: "Julian Lopez Rodríguez",
      isActive: true,
    },
    {
      id: 4,
      name: "Maria del Pilar Zambrano",
      isActive: false,
    },
    {
      id: 5,
      name: "Guillermo Molano",
      isActive: true,
    },
  ];

  const history = useHistory();

  const handleCreate = () => {
    history.push("/distribuidores/añadir");
  }
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Distribuidores</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
          <Button className={classes.createButton} label="Crear" onClick={handleCreate} />      
        </div>
      </header>
      <div className={classes.distributorList}>
        {producers.map(producer => (
          <DistributorCard 
            key={producer.id}  
            id={producer.id}  
            name={producer.name}
            isActive={producer.isActive}
          />
        ))}
      </div>
    </div>
  )
}

export default DistributorDirectory;

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

  createButton: {
    marginLeft: 20,
  },
  
  distributorList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "repeat(4, minmax(10px, 1fr))",
      templateRows: "repeat(2, minmax(10px, 1fr))",
      gap: "10px",
    },
  }
});