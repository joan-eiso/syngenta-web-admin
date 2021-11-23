import { useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";

import { useDispatch, useSelector } from "react-redux";
import { fetchLicenses } from "../../../redux/license/duck";

import FilterButton from "../../atoms/FilterButton/FilterButton";
import LicenseCard from "../../molecules/cards/LicenseCard/LicenseCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function LicenseDirectory() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const licenses = useSelector(state => state.license.licenses);

  useEffect(() => {
    dispatch(fetchLicenses(token, distAuth));
  }, [dispatch, token, distAuth]);
  
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Licencias</h1>
        <div className={classes.actions}>
          <FilterButton className={classes.filterButton} />
          <SearchBar />
        </div>
      </header>
      <div className={classes.licenseList}>
        {licenses.map(license => (
          <LicenseCard 
            key={license.id}
            id={license.id}  
            propertyId={license.propertyId}
            date={license.date}
          />
        ))}
      </div>
    </div>
  )
}

export default LicenseDirectory;


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
  
  licenseList: {
    flex: 1,
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 1fr)",
      templateRows: "repeat(4, minmax(10px, 1fr))",
      rowGap: "10px",
    },
  }
});