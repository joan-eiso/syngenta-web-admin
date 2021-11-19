import { useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducers } from "../../../redux/producer/duck";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import ProducerCard from "../../molecules/cards/ProducerCard/ProducerCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function ProducerDirectory() {
  const dispatch = useDispatch();
  const producers = useSelector(state => state.producer.producers);

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Productores</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
        </div>
      </header>
      <div className={classes.producerList}>
        {producers.map(producer => (
          <ProducerCard 
            key={producer.id}  
            id={producer.id}  
            name={producer.name}
            identification={producer.identification}
            propertyQuantity={producer.propertyQuantity}
          />
        ))}
      </div>
    </div>
  )
}

export default ProducerDirectory;

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
  
  producerList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 1fr)",
      templateRows: "repeat(4, minmax(10px, 1fr))",
      rowGap: "10px",
    },
  }
});