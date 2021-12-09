import { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Form, Formik } from "formik";
import { FiX } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { sortAndFilterProperties } from "../../../redux/filter/duck";

import Button from "../../atoms/Button/Button";
import Select from "../../molecules/Select/Select";

function FilterSetup({ producerProperties, handleClose }) {
  const dispatch = useDispatch();
  const propertySortingRule = useSelector(state => state.filter.propertySortingRule);
  const propertyFilters = useSelector(state => state.filter.propertyFilters);
  const departments = useSelector(state => state.zone.departments);
  const cities = useSelector(state => state.zone.cities);

  const [departmentOptionValue, setDepartmentOptionValue] = useState(propertyFilters["departmentId"]);
  const filteredCities = cities.filter((city) => city.departmentId === departmentOptionValue);

  const orderOptions = [
    { value: "alphabetic", label: "A-Z" },
    { value: "reverse-alphabetic", label: "Z-A" }
  ];

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name
  }));

  const cityOptions = Array.from(departmentOptionValue ? filteredCities : cities).map((city) => ({
    value: city.id,
    label: city.name
  }));

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
          order: propertySortingRule,
          departmentId: propertyFilters["departmentId"],
          cityId: propertyFilters["cityId"],
        }}
        validate={({ departmentId }) => {
          setDepartmentOptionValue(departmentId);
        }}
        onSubmit={(values) => {
          let filters = {
            departmentId: values.departmentId,
            cityId: values.cityId
          }

          dispatch(sortAndFilterProperties(values.order, filters, producerProperties));
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
                </div>
              </section>
              <section className={classes.filterGroup}>
                <div className={classes.filterGroupHeadingWrapper}>
                  <h3 className={classes.filterGroupHeading}>Datos del predio</h3>
                  <div className={classes.filterGroupDivider}></div>
                </div>
                <div>
                  <div className={classes.item}>
                    <p className={classes.itemLabel}>Departamento</p>
                    <Select styles={selectStyles} flex={1} name="departmentId" options={departmentOptions} value={values.departmentId}/>
                  </div>
                  <div className={classes.item}>
                    <p className={classes.itemLabel}>Ciudad</p>
                    <Select styles={selectStyles} flex={1} name="cityId" options={cityOptions} value={values.cityId}/>
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

export default FilterSetup;

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
    flex: 1,
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