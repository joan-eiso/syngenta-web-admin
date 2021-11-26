import { createUseStyles } from "react-jss";
import { FiSearch } from "react-icons/fi";

function SearchBar({ placeholder, setIsSearching, handleSearch }) {  
  const handleInputChange = (e) => {
    let text = e.target.value;
    if(text === "") setIsSearching(false);
    else setIsSearching(true);
    handleSearch(text);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input 
        className={classes.input} 
        type="text" 
        placeholder={placeholder ?? "Buscar"} 
        onChange={handleInputChange} 
      />
      <FiSearch size={16} color="#9E9E9E" />
    </div>
  )
}

export default SearchBar;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    border: {
      style: "solid",
      width: 1,
      color: "#9E9E9E",
      radius: 8,
    },
    backgroundColor: "white",
  },

  input: {
    flex: 1,
    fontSize: 14,
    outline: "none",
    border: "none",
  }
});