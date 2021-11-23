import { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../../redux/property/duck";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import PropertyCard from "../../molecules/cards/PropertyCard/PropertyCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import PropertyDetail from "../dialogs/PropertyDetail/PropertyDetail";

function PropertyDirectory() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const properties = useSelector(state => state.property.properties);

  useEffect(() => {
    dispatch(fetchProperties(token, distAuth));
  }, [dispatch, token, distAuth]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(undefined);

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

  // const properties = [
  //   {
  //     id: 1,
  //     name: "Hacienda El Cóndor Andino",
  //     country: "Colombia",
  //     department: "Huila",
  //     city: "Neiva",
  //     subregion: "Caribe seco",
  //     hectares: 350
  //   },
  //   {
  //     id: 2,
  //     name: "Hacienda El Molino",
  //     country: "Colombia",
  //     department: "Antioquia",
  //     city: "Necoclí",
  //     subregion: "Valle templado",
  //     hectares: 400
  //   }
  // ];
  
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
          <SearchBar />
        </div>
      </header>
      <div className={classes.propertyList}>
        {properties.map(property => (
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