import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AnimatePresence } from "framer-motion";
import { createUseStyles, useTheme } from "react-jss";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/user/duck";

import EditForm from "./EditForm";
import Button from "../../atoms/Button/Button";
import FilterButton from "../../atoms/FilterButton/FilterButton";
import DistributorCard from "../../molecules/cards/DistributorCard/DistributorCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";

function DistributorDirectory() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const distributors = useSelector(state => state.user.distributors);

  useEffect(() => {
    dispatch(fetchUsers(token, distAuth));
  }, [dispatch, token, distAuth]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDist, setSelectedDist] = useState(undefined);

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
      <header className={classes.header}>
        <h1 className={classes.title}>Distribuidores</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
          <Button className={classes.createButton} label="Crear" onClick={handleCreate} />      
        </div>
      </header>
      <div className={classes.distributorList}>
        {distributors.map(distributor => (
          <DistributorCard 
            key={distributor.id}  
            id={distributor.id}  
            onEdit={handleEditDistributor}
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