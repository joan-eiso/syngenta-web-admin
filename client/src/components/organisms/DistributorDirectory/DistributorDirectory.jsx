import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "../../../redux/filter/duck";

import EditForm from "./EditForm";
import FilterList from "./FilterList";
import Button from "../../atoms/Button/Button";
import FilterButton from "../../atoms/FilterButton/FilterButton";
import DistributorCard from "../../molecules/cards/DistributorCard/DistributorCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";

import { searchByQuery } from "../../../utils/search.util";

function DistributorDirectory() {
  const dispatch = useDispatch();
  const distributorSortingRule = useSelector(state => state.filter.distributorSortingRule);
  const distributorFilters = useSelector(state => state.filter.distributorFilters);
  const sortedDistributors = useSelector(state => state.filter.distributors);
  const distributors = useSelector(state => state.user.distributors);
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [selectedDist, setSelectedDist] = useState(undefined);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, distributors));
  }
  
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  }

  const openFilterModal = () => {
    setFilterModalIsOpen(true);
  }

  const closeFilterModal = () => {
    setFilterModalIsOpen(false);
  }

  const handleEditDistributor = (distributor) => {
    setEditModalIsOpen(true);
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
        {filterModalIsOpen && 
          <Modal handleClose={closeFilterModal}>
            <FilterList handleClose={closeFilterModal} />
          </Modal>
        }
        {editModalIsOpen && 
          <Modal handleClose={closeEditModal}>
            <EditForm distributor={selectedDist} handleClose={closeEditModal} />
          </Modal>
        }
      </AnimatePresence>
      <div className={classes.listHeader}>
        <h1 className={classes.title}>Distribuidores</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} onClick={openFilterModal} />
          <SearchBar placeholder="Buscar por nombre del distribuidor" setIsSearching={setIsSearching} handleSearch={handleSearch} />
          <Button className={classes.createButton} label="Crear" onClick={handleCreate} />      
        </div>
      </div>
      <section className={classes.distributorList}>
        {Array.from(isSearching ? searchResults : (distributorSortingRule || Object.keys(distributorFilters).length > 0 ? sortedDistributors : distributors)).map(distributor => (
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