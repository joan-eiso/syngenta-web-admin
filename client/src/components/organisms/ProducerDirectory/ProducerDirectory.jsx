import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

import { useSelector } from "react-redux";

// import FilterButton from "../../atoms/FilterButton/FilterButton";
import ProducerCard from "../../molecules/cards/ProducerCard/ProducerCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

import { searchByQuery } from "../../../utils/search.util";

function ProducerDirectory() {
  const producers = useSelector(state => state.producer.producers);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);

  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, producers));
  }
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.listHeader}>
        <h1 className={classes.title}>Productores</h1>
        <div className={classes.actions}>
          {/* <FilterButton className={classes.filterButton} /> */}
          <SearchBar placeholder="Buscar por nombre del productor" setIsSearching={setIsSearching} handleSearch={handleSearch} />
        </div>
      </div>
      <section className={classes.producerList}>
        {Array.from(isSearching ? searchResults : producers).map(producer => (
          <ProducerCard 
            key={producer.id}  
            id={producer.id}  
            name={producer.name}
            identification={producer.identification}
            propertyQuantity={producer.propertyQuantity}
          />
        ))}
      </section>
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
    overflowY: "scroll",
  },
  
  listHeader: {
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
      templateRows: "repeat(auto-fill, 120px)",
      rowGap: "10px",
    },
  }
});