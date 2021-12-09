import { createUseStyles } from "react-jss";
import cn from "classnames";
import { BsFilter } from "react-icons/bs";


function FilterButton({ className, onClick }) {
  const classes = useStyles();
  return (
    <div className={cn(classes.root, className)} onClick={onClick}>
      <BsFilter size={16} />
    </div>
  )
}

export default FilterButton;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    padding: 10,
    border: {
      style: "solid",
      width: 1,
      color: "#9E9E9E",
      radius: 8,
    },
    backgroundColor: "white",
    cursor: "pointer"
  }
});
