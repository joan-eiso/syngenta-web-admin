export const FETCH_COUNTRIES_REQUESTED = "/property/FETCH_COUNTRIES/REQUESTED";
export const FETCH_COUNTRIES_SUCCESS = "/property/FETCH_COUNTRIES/SUCCESS";
export const FETCH_COUNTRIES_FAILURE = "/property/FETCH_COUNTRIES/FAILURE";
export const FETCH_DEPARTMENTS_REQUESTED = "/property/FETCH_DEPARTMENTS/REQUESTED";
export const FETCH_DEPARTMENTS_SUCCESS = "/property/FETCH_DEPARTMENTS/SUCCESS";
export const FETCH_DEPARTMENTS_FAILURE = "/property/FETCH_DEPARTMENTS/FAILURE";
export const FETCH_CITIES_REQUESTED = "/property/FETCH_CITIES/REQUESTED";
export const FETCH_CITIES_SUCCESS = "/property/FETCH_CITIES/SUCCESS";
export const FETCH_CITIES_FAILURE = "/property/FETCH_CITIES/FAILURE";
export const FETCH_SUBREGIONS_REQUESTED = "/property/FETCH_SUBREGIONS/REQUESTED";
export const FETCH_SUBREGIONS_SUCCESS = "/property/FETCH_SUBREGIONS/SUCCESS";
export const FETCH_SUBREGIONS_FAILURE = "/property/FETCH_SUBREGIONS/FAILURE";

const initialState = {
  countries: [],
  departments: [],
  cities: [],
  subregions: [],
  fetchCountriesSucceed: undefined,
  fetchCountriesError: undefined,
  fetchDepartmentsSucceed: undefined,
  fetchDepartmentsError: undefined,
  fetchCitiesSucceed: undefined,
  fetchCitiesError: undefined,
  fetchSubregionsSucceed: undefined,
  fetchSubregionsError: undefined,
}

export const fetchCountries = (token, distAuth) => ({
  type: FETCH_COUNTRIES_REQUESTED,
  token,
  distAuth
});

export const onFetchCountriesSuccess = (countries) => ({
  type: FETCH_COUNTRIES_SUCCESS,
  countries
});

export const onFetchCountriesFailure = (error) => ({
  type: FETCH_COUNTRIES_FAILURE,
  error
});

export const fetchDepartments = (token, distAuth) => ({
  type: FETCH_DEPARTMENTS_REQUESTED,
  token,
  distAuth
});

export const onFetchDepartmentsSuccess = (departments) => ({
  type: FETCH_DEPARTMENTS_SUCCESS,
  departments
});

export const onFetchDepartmentsFailure = (error) => ({
  type: FETCH_DEPARTMENTS_FAILURE,
  error
});

export const fetchCities = (token, distAuth) => ({
  type: FETCH_CITIES_REQUESTED,
  token,
  distAuth
});

export const onFetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  cities
});

export const onFetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  error
});

export const fetchSubregions = (token, distAuth) => ({
  type: FETCH_SUBREGIONS_REQUESTED,
  token,
  distAuth
});

export const onFetchSubregionsSuccess = (subregions) => ({
  type: FETCH_SUBREGIONS_SUCCESS,
  subregions
});

export const onFetchSubregionsFailure = (error) => ({
  type: FETCH_SUBREGIONS_FAILURE,
  error
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_COUNTRIES_SUCCESS:
      let countries = action.countries;
      return {
        ...state, 
        countries, 
        fetchCountriesSucceed: true
      }

    case FETCH_COUNTRIES_FAILURE:
      let fetchCountriesError = action.error;
      return {
        ...state, fetchCountriesError
      }

    case FETCH_DEPARTMENTS_SUCCESS:
      let departments = action.departments;
      return {
        ...state, 
        departments,
        fetchDepartmentsSucceed: true
      }

    case FETCH_DEPARTMENTS_FAILURE:
      let fetchDepartmentsError = action.error;
      return {
        ...state, fetchDepartmentsError
      }

    case FETCH_CITIES_SUCCESS:
      let cities = action.cities;
      return {
        ...state, 
        cities,
        fetchCitiesSucceed: true
      }

    case FETCH_CITIES_FAILURE:
      let fetchCitiesError = action.error;
      return {
        ...state, fetchCitiesError
      }

    case FETCH_SUBREGIONS_SUCCESS:
      let subregions = action.subregions;
      return {
        ...state, 
        subregions,
        fetchSubregionsSucceed: true
      }

    case FETCH_SUBREGIONS_FAILURE:
      let fetchSubregionsError = action.error;
      return {
        ...state, fetchSubregionsError
      }

    default:
      return state;
  } 
}

export default reducer;