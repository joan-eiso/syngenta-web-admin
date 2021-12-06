import { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";

import { useDispatch, useSelector } from "react-redux";
import { downloadLicense, onDownloadLicenseReset } from "../../../redux/license/duck";

// import FilterButton from "../../atoms/FilterButton/FilterButton";
import LicenseCard from "../../molecules/cards/LicenseCard/LicenseCard";
import SearchBar from "../../molecules/SearchBar/SearchBar";

import { searchByQuery } from "../../../utils/search.util";

function LicenseDirectory() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const licenses = useSelector(state => state.license.licenses);
  const fileToDownload = useSelector(state => state.license.fileToDownload);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
  
  const handleSearch = (query) => {
    setSearchResults(searchByQuery(query, licenses));
  }
  
  const handleDownload = (id) => {
    dispatch(downloadLicense(token, distAuth, id, distAuth));
  }

  const dataURIToBlob = (dataURI) => {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf'});
    return blob;
  }

  useEffect(() => {
    if(fileToDownload) {
      const blob = dataURIToBlob(fileToDownload);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      dispatch(onDownloadLicenseReset());
    }
  }, [dispatch, fileToDownload]);

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.listHeader}>
        <h1 className={classes.title}>Licencias</h1>
        <div className={classes.actions}>
          {/* <FilterButton className={classes.filterButton} /> */}
          <SearchBar placeholder="Buscar por nombre del predio o ID de licencia" setIsSearching={setIsSearching} handleSearch={handleSearch} />
        </div>
      </div>
      <section className={classes.licenseList}>
        {Array.from(isSearching ? searchResults : licenses).map(license => (
          <LicenseCard 
            key={license.id}
            id={license.id}  
            handleDownload={handleDownload}
          />
        ))}
      </section>
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
    overflowY: "scroll",
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
  
  licenseList: {
    flex: 1,
    display: "grid",
    grid: {
      templateRows: "repeat(auto-fill, 120px)",
      rowGap: "10px",
    },
  }
});