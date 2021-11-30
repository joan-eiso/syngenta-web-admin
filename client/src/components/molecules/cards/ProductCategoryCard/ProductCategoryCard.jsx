import { createUseStyles, useTheme } from "react-jss";

import Button from "../../../atoms/Button/Button";
import Chip from "../../../atoms/Chip/Chip";

function ProductCategoryCard({ onCreateIsEnable, categoryName, Icon, setModalIsOpen, items }) {  
  const openModal = () => {
    setModalIsOpen(true);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.topWrapper}>
        <div className={classes.heading}>
          <Icon className={classes.icon} color={theme.colors.gray.base} />
          <p className={classes.categoryName}>{categoryName}</p>
          <div className={classes.divider}></div>
          {onCreateIsEnable && <Button className={classes.addButton} label="Agregar" onClick={openModal} />} 
        </div>
      </div>
      <div className={classes.itemsWrapper}>
        {items.map((item) => 
          <Chip key={item.id} name={item.name} color="#E0EDE0" textColor={theme.colors.bodyText.base} />
        )}
      </div>
    </div>
  )
}

export default ProductCategoryCard;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    borderRadius: 8,
    backgroundColor: "white",
  },
  
  topWrapper: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    padding: "20px 30px 0px",
  },

  heading: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    marginRight: 5,
  },

  categoryName: ({ theme }) => ({
    fontSize: 14,
    fontWeight: 400,
    color: theme.colors.bodyText.light,
    textTransform: "uppercase",
    letterSpacing: 1,
  }),
  
  divider: {
    flex: 1,
    margin: "0 20px",
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#CCCCCC",
    }
  },

  addButton: {
    padding: "10px 20px",
    fontSize: 10,
  },

  content: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },

  itemCount: ({ theme }) => ({
    flex: 1,
    fontSize: 24,
    fontWeight: 500,
    color: theme.colors.bodyText.base
  }),

  itemsWrapper: {
    display: "grid",
    grid: {
      templateColumns: "repeat(5, minmax(10px, 1fr))",
      gap: 10,
    },
    padding: 20,
  }
});