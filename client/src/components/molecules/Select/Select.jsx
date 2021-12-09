import ReactSelect from "react-select";
import { Field } from "formik";

function Select({ flex, name, options, value }) {
  const getDefaultOption = () => {
    return options.find(option => option.value === value);
  }

  const handleChange = (option, form, field) => {
    form.setFieldValue(field.name, option?.value);
  }

  return (
    <Field name={name}>
      {({ field, form }) => (
        <ReactSelect
          flex={flex}
          styles={{
            container: (provided, { selectProps }) => ({
              ...provided,
              flex: selectProps.flex
            })
          }}
          isClearable
          backspaceRemovesValue
          placeholder="Seleccionar"
          options={options} 
          defaultValue={getDefaultOption}
          onChange={(option) => handleChange(option, form, field)}
        />
      )}
    </Field>
  )
}

export default Select;
