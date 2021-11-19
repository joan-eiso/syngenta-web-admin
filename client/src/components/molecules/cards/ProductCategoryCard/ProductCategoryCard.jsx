import { createUseStyles, useTheme } from "react-jss";

import Button from "../../../atoms/Button/Button";

function ProductCategoryCard({ categoryName, Icon, data, isEnable }) {  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Icon className={classes.icon} color={theme.colors.gray.base} />
        <p className={classes.categoryName}>{categoryName}</p>
        <div className={classes.divider}></div>
      </div>
      <div className={classes.content}>
        <p className={classes.itemCount}>5 items</p>
        {isEnable && <Button label="Agregar" />} 
      </div>
    </div>
  )
}

export default ProductCategoryCard;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    padding: "20px 30px",
    borderRadius: 8,
    backgroundColor: "white",
  },

  heading: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    marginRight: 5,
  },

  categoryName: ({ theme }) => ({
    marginRight: 20,
    fontSize: 14,
    fontWeight: 400,
    color: theme.colors.bodyText.light,
    textTransform: "uppercase",
    letterSpacing: 1,
  }),
  
  divider: {
    flex: 1,
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#CCCCCC",
    }
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
  })
});