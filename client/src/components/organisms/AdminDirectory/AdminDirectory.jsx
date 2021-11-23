import { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router";
import { AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/user/duck";

import Button from "../../atoms/Button/Button";
import FilterButton from "../../atoms/FilterButton/FilterButton";
import UserCard from "../../molecules/cards/AdminCard/AdminCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import EditForm from "./EditForm";

function AdminDirectory() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const administrators = useSelector(state => state.user.administrators);

  useEffect(() => {
    dispatch(fetchUsers(token, distAuth));
  }, [dispatch, token, distAuth]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(undefined);

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleEditUser = (administrator) => {
    setModalIsOpen(true);
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
        {modalIsOpen && 
          <Modal handleClose={closeModal}>
            <EditForm administrator={selectedAdmin} handleClose={closeModal} />
          </Modal>
        }
      </AnimatePresence>
      <header className={classes.header}>
        <h1 className={classes.title}>Administradores</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
          <Button className={classes.createButton} label="Crear" onClick={handleCreate} />      
        </div>
      </header>
      <div className={classes.userList}>
        {administrators.map(administrator => (
          <UserCard 
            key={administrator.id}  
            id={administrator.id}  
            onEdit={handleEditUser}
          />
        ))}
      </div>
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
  
  userList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "repeat(4, minmax(10px, 1fr))",
      templateRows: "repeat(2, minmax(10px, 1fr))",
      gap: "10px",
    },
  }
});