import { createUseStyles, useTheme } from "react-jss";
import { Form, Formik } from "formik";
import { FiX } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { sortAndFilterDistributors } from "../../../redux/filter/duck";

import Button from "../../atoms/Button/Button";
import Select from "../../molecules/Select/Select";

function FilterList({ handleClose }) {
  const dispatch = useDispatch();
  const distributors = useSelector(state => state.user.distributors);
  const distributorSortingRule = useSelector(state => state.filter.distributorSortingRule);
  const distributorFilters = useSelector(state => state.filter.distributorFilters);

  const orderOptions = [
    { value: "alphabetic", label: "A-Z" },
    { value: "reverse-alphabetic", label: "Z-A" }
  ];

  const statusOptions = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" }
  ];

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.headingWrapper}>
        <h2 className={classes.title}>Filtrar</h2>
        <FiX className={classes.closeIcon} size={24} color={theme.colors.gray.base} onClick={handleClose} />
      </div>
      <Formik
        initialValues={{
          order: distributorSortingRule,
          status: distributorFilters["status"]
        }}
        onSubmit={(values) => {
          let filters = {
            status: values.status
          }
          dispatch(sortAndFilterDistributors(values.order, filters, distributors));
          handleClose();
        }}
      >
        {({ values }) => (
          <Form className={classes.form}>
            <div className={classes.groupsWrapper}>
              <section className={classes.filterGroup}>
                <div className={classes.filterGroupHeadingWrapper}>
                  <h3 className={classes.filterGroupHeading}>Ordenar</h3>
                  <div className={classes.filterGroupDivider}></div>
                </div>
                <div>
                  <div className={classes.item}>
                    <p className={classes.itemLabel}>Alfabeticamente</p>
                    <Select styles={selectStyles} flex={1} name="order" options={orderOptions} value={values.order}/>
                  </div>
                  <div className={classes.item}>
                    <p className={classes.itemLabel}>Estado</p>
                    <Select styles={selectStyles} flex={1} name="status" options={statusOptions} value={values.status}/>
                  </div>
                </div>
              </section>
            </div>
            <Button className={classes.saveButton} label="Guardar" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FilterList;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap"
  },

  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  
  title: {
    margin: 0,
    fontSize: 21,
    color: ({ theme }) => theme.colors.bodyText.base,
  },
  
  closeIcon: {
    cursor: "pointer"
  },

  form: {
    display: "flex",
    flexFlow: "column nowrap"
  },

  groupsWrapper: {
    marginBottom: 20,
  },

  filterGroup: {
    marginBottom: 30,
    
    "&:last-child": {
      marginBottom: 0,
    }
  },

  filterGroupHeadingWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  
  filterGroupHeading: {
    margin: "0 20px 0 0",
    fontSize: 16,
  },
  
  filterGroupDivider: {
    width: "100%",
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#9E9E9E",
    }
  },
  
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    
    "&:last-child": {
      marginBottom: 0,
    }
  },
  
  itemLabel: {
    flex: 1,
    marginRight: 20,
    fontSize: 14,
  },

  saveButton: {
    alignSelf: "flex-end",
  }
});

const selectStyles = {
  flex: 2
}