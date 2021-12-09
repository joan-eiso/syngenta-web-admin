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
import UserCard from "../../molecules/cards/AdminCard/AdminCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";

import { searchByQuery } from "../../../utils/search.util";

function AdminDirectory() {
  const dispatch = useDispatch();
  const administrators = useSelector(state => state.user.administrators);
  const administratorSortingRule = useSelector(state => state.filter.administratorSortingRule);
  const administratorFilters = useSelector(state => state.filter.administratorFilters);
  const sortedAdministrators = useSelector(state => state.filter.administrators);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(undefined);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);
  
  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, administrators));
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

  const handleEditUser = (administrator) => {
    setEditModalIsOpen(true);
    setSelectedAdmin({
      id: administrator.id, 
      name: administrator.name,
      identification: administrator.identification,
      email: administrator.email,
      password: administrator.password,
      temp: administrator.temp,
      status: administrator.status,
      company: administrator.company,
      groupId: administrator.groupId,
      rank: administrator.rank,
    });
  }

  const history = useHistory();

  const handleCreate = () => {
    history.push("/administradores/añadir");
  }
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <AnimatePresence
        initial="none"
        exitBeforeEnter={true}
        >
        {editModalIsOpen && 
          <Modal handleClose={closeEditModal}>
            <EditForm administrator={selectedAdmin} handleClose={closeEditModal} />
          </Modal>
        }
        {filterModalIsOpen && 
          <Modal handleClose={closeFilterModal}>
            <FilterList handleClose={closeFilterModal} />
          </Modal>
        }
      </AnimatePresence>
      <div className={classes.listHeader}>
        <h1 className={classes.title}>Administradores</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} onClick={openFilterModal} />
          <SearchBar placeholder="Buscar por nombre del administrador" setIsSearching={setIsSearching} handleSearch={handleSearch} />
          <Button className={classes.createButton} label="Crear" onClick={handleCreate} />      
        </div>
      </div>
      <section className={classes.adminList}>
        {Array.from(isSearching ? searchResults : (administratorSortingRule || Object.keys(administratorFilters).length > 0 ? sortedAdministrators : administrators)).map(administrator => (
          <UserCard 
            key={administrator.id}  
            id={administrator.id}  
            onEdit={handleEditUser}
          />
        ))}
      </section>
    </div>
  )
}

export default AdminDirectory;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px",
    overflowY: "scroll"
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
  
  adminList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      templateRows: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "10px",
    },
  }
});