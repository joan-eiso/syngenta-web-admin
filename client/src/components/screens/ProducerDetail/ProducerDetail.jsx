import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../../../redux/filter/duck";

import FilterList from "./FilterList";
import FilterButton from "../../atoms/FilterButton/FilterButton";
import PropertyCard from "../../molecules/cards/PropertyCard/PropertyCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../../organisms/Modal/Modal";
import PropertyDetail from "../../organisms/dialogs/PropertyDetail/PropertyDetail";

import { searchByQuery } from "../../../utils/search.util";
import ProducerInfo from "../../molecules/ProducerInfo/ProducerInfo";

function ProducerDetail() {
  const dispatch = useDispatch();
  const { id: producerId } = useParams();
  const properties = useSelector(state => state.property.properties);
  const producerProperties = properties.filter(property => property.producerId === parseInt(producerId));
  const propertySortingRule = useSelector(state => state.filter.propertySortingRule);
  const propertyFilters = useSelector(state => state.filter.propertyFilters);
  const sortedProperties = useSelector(state => state.filter.properties);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [propertyModalIsOpen, setPropertyModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(undefined);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, producerProperties));
  }

  const openFilterModal = () => {
    setFilterModalIsOpen(true);
  }

  const closeFilterModal = () => {
    setFilterModalIsOpen(false);
  }

  const closePropertyModal = () => {
    setPropertyModalIsOpen(false);
  }

  const handleViewProperty = (id) => {
    setPropertyModalIsOpen(true);
    setSelectedPropertyId(id);
  }
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <AnimatePresence
        initial="none"
        exitBeforeEnter={true}
      >
        {filterModalIsOpen && 
          <Modal handleClose={closeFilterModal}>
            <FilterList producerProperties={producerProperties} handleClose={closeFilterModal} />
          </Modal>
        }
        {propertyModalIsOpen && 
          <Modal handleClose={closePropertyModal}>
            <PropertyDetail id={selectedPropertyId} handleClose={closePropertyModal} />
          </Modal>
        }
      </AnimatePresence>

      <header className={classes.listHeader}>
        <h1 className={classes.title}>Predios</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} onClick={openFilterModal} />
          <SearchBar placeholder="Buscar por nombre del predio" setIsSearching={setIsSearching} handleSearch={handleSearch} />
        </div>
      </header>

      <section className={classes.producerInfo}>
        <ProducerInfo id={producerId} />
      </section>

      <section className={classes.propertyList}>
        {Array.from(isSearching ? searchResults : (propertySortingRule || Object.keys(propertyFilters).length > 0 ? sortedProperties : producerProperties)).map(property => (
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