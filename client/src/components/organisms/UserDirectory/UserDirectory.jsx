import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { AnimatePresence } from "framer-motion";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import UserCard from "../../molecules/cards/UserCard/UserCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import EditForm from "./EditForm";

function UserDirectory() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleEditUser = (id, isActive, name, identification, address, phone, email) => {
    setModalIsOpen(true);
    setSelectedUser({
      id, 
      isActive,
      name, 
      identification, 
      address, 
      phone, 
      email
    });
  }

  const users = [
    {
      id: 1,
      name: "Joan Cáliz Ortiz",
      identification: 1107500240,
      address: "Cll 25A #12-21",
      phone: 3154002530,
      email: "joan.caliz@eiso.com.co",
      isActive: false,
    },
    {
      id: 2,
      name: "Andrés Tabares",
      identification: 60800536,
      address: "Cll 120 #65-12",
      phone: 3014122020,
      email: "andres.tabares@eiso.com.co",
      isActive: true,
    },
    {
      id: 3,
      name: "David Pinilla",
      identification: 90360502,
      address: "Cll 45 #65-05",
      phone: 3162905060,
      email: "dpinilla@asylummarketing.com",
      isActive: true,
    }
  ];
  
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
            <EditForm user={selectedUser} />
          </Modal>
        }
      </AnimatePresence>
      <header className={classes.header}>
        <h1 className={classes.title}>Usuarios</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
        </div>
      </header>
      <div className={classes.userList}>
        {users.map(user => (
          <UserCard 
            key={user.id}  
            id={user.id}  
            name={user.name}
            identification={user.identification}
            address={user.address}
            phone={user.phone}
            email={user.email}
            isActive={user.isActive}
            onEdit={handleEditUser}
          />
        ))}
      </div>
    </div>
  )
}

export default UserDirectory;

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