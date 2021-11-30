import { useState } from "react";
import { useHistory } from "react-router";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import { useSelector } from "react-redux";

import EditForm from "./EditForm";
import Button from "../../atoms/Button/Button";
// import FilterButton from "../../atoms/FilterButton/FilterButton";
import DistributorCard from "../../molecules/cards/DistributorCard/DistributorCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";

import { searchByQuery } from "../../../utils/search.util";

function DistributorDirectory() {
  const distributors = useSelector(state => state.user.distributors);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDist, setSelectedDist] = useState(undefined);

  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, distributors));
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleEditDistributor = (distributor) => {
    setModalIsOpen(true);
    setSelectedDist({
      id: distributor.id, 
      name: distributor.name,
      identification: distributor.identification,
      email: distributor.email,
      password: distributor.password,
      temp: distributor.temp,
      status: distributor.status,
      company: distributor.company,
      groupId: distributor.groupId,
      rank: distributor.rank,
    });
  }

  const history = useHistory();

  const handleCreate = () => {
    history.push("/distribuidores/añadir");
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
            <EditForm distributor={selectedDist} handleClose={closeModal} />
          </Modal>
        }
      </AnimatePresence>
      <div className={classes.listHeader}>
        <h1 className={classes.title}>Distribuidores</h1>
        <div className={classes.actions}>
          {/* <FilterButton className={classes.filterButton} /> */}
          <SearchBar placeholder="Buscar por nombre del distribuidor" setIsSearching={setIsSearching} handleSearch={handleSearch} />
          <Button className={classes.createButton} label="Crear" onClick={handleCreate} />      
        </div>
      </div>
      <section className={classes.distributorList}>
        {Array.from(isSearching ? searchResults : distributors).map(distributor => (
          <DistributorCard 
            key={distributor.id}  
            id={distributor.id}  
            onEdit={handleEditDistributor}
          />
        ))}
      </section>
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

  createButton: {
    marginLeft: 20,
  },
  
  distributorList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      templateRows: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
    },
  }
});