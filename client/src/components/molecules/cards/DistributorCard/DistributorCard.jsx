import { createUseStyles, useTheme } from "react-jss";

import { useSelector } from "react-redux";

import { FaUserCircle } from "react-icons/fa";
import Button from "../../../atoms/Button/Button";
import StatusIndicator from "../../StatusIndicator/StatusIndicator";

function DistributorCard({ id, onEdit }) {
  const users = useSelector(state => state.user.users);
  const { name, identification, email, password, temp, status, company, groupId, rank } = users.find(user => user.id === id);

  const handleEdit = () => {
    let distributorData = {
      id,
      name,
      identification,
      email,
      password,
      temp,
      status,
      company,
      groupId,
      rank,
    }
    onEdit(distributorData);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <FaUserCircle size={56} color={theme.colors.gray.base} />
      <p className={classes.name}>{name}</p>
      <div className={classes.bottomContainer}>
        <StatusIndicator className={classes.statusIndicator} isActive={status} />
        <Button className={classes.button} label="Editar" onClick={handleEdit} />
      </div>
    </div>
  )
}

export default DistributorCard;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "20px 30px",
    borderRadius: 8,
    backgroundColor: "white",
  },
  
  name: {
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 1.2,
  },
  
  bottomContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  
  statusIndicator: {
    width: "100%",
    marginBottom: 10,
  },
  
  button: {
    width: "100%",
  }
});
