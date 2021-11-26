import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import PropertyCard from "../../molecules/cards/PropertyCard/PropertyCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import PropertyDetail from "../dialogs/PropertyDetail/PropertyDetail";

import { searchByQuery } from "../../../utils/search.util";

function PropertyDirectory() {
  const properties = useSelector(state => state.property.properties);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(undefined);

  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, properties));
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleViewProperty = (id, name, country, department, city, subregion, hectares) => {
    setModalIsOpen(true);
    setSelectedProperty({
      id, 
      name, 
      country,
      department, 
      city, 
      subregion, 
      hectares
    });
  }
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <AnimatePresence
        initial="none"
        exitBeforeEnter={true}
        >
        {modalIsOpen && 
          <Modal handleClose={closeModal}>
            <PropertyDetail data={selectedProperty} handleClose={closeModal} />
          </Modal>
        }
      </AnimatePresence>
      <header className={classes.header}>
        <h1 className={classes.title}>Predios</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar placeholder="Buscar por nombre del predio" setIsSearching={setIsSearching} handleSearch={handleSearch} />
        </div>
      </header>
      <div className={classes.propertyList}>
        {Array.from(isSearching ? searchResults : properties).map(property => (
          <PropertyCard 
            key={property.id}  
            id={property.id}  
            name={property.name}
            country={property.countryId}
            department={property.departmentId}
            city={property.cityId}
            subregion={property.subregionId}
            hectares={property.hectares}
            onClick={handleViewProperty}
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
    overflowY: "scroll",
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