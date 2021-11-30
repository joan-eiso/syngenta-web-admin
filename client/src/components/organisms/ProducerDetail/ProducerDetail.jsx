import { useState } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";

// import FilterButton from "../../atoms/FilterButton/FilterButton";
import PropertyCard from "../../molecules/cards/PropertyCard/PropertyCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import PropertyDetail from "../dialogs/PropertyDetail/PropertyDetail";

import { searchByQuery } from "../../../utils/search.util";
import ProducerInfo from "../../molecules/ProducerInfo/ProducerInfo";

function ProducerDetail() {
  const { id: producerId } = useParams();
  const properties = useSelector(state => state.property.properties);
  const producerProperties = properties.filter(property => property.producerId === parseInt(producerId));

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(undefined);

  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, producerProperties));
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

      <header className={classes.listHeader}>
        <h1 className={classes.title}>Predios</h1>
        <div className={classes.actions}>
          {/* <FilterButton className={classes.filterButton} /> */}
          <SearchBar placeholder="Buscar por nombre del predio" setIsSearching={setIsSearching} handleSearch={handleSearch} />
        </div>
      </header>

      <section className={classes.producerInfo}>
        <ProducerInfo id={producerId} />
      </section>

      <section className={classes.propertyList}>
        {Array.from(isSearching ? searchResults : producerProperties).map(property => (
          <PropertyCard 
            key={property.id}  
            id={property.id}  
            name={property.name}
            countryId={property.countryId}
            departmentId={property.departmentId}
            cityId={property.cityId}
            subregionId={property.subregionId}
            hectares={property.hectares}
            onClick={handleViewProperty}
          />
        ))}
      </section>
    </div>
  )
}

export default ProducerDetail;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px",
    overflowY: "scroll",
  },

  producerInfo: {
    marginBottom: 20,
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
  
  propertyList: {
    flex: 1,
    display: "grid",
    grid: {
      templateRows: "repeat(auto-fill, 120px)",
      rowGap: "10px",
    },
  }
});