export const SORT_PRODUCERS = "/filter/SORT_PRODUCERS";
export const SORT_AND_FILTER_PROPERTIES = "/filter/SORT_AND_FILTER_PROPERTIES";
export const SORT_AND_FILTER_DISTRIBUTORS = "/filter/SORT_AND_FILTER_DISTRIBUTORS";
export const SORT_AND_FILTER_ADMINISTRATORS = "/filter/SORT_AND_FILTER_ADMINISTRATORS";
export const RESET_FILTERS = "/filter/RESET_FILTERS";

const initialState = {
  producerSortingRule: undefined,
  producers: [],
  propertySortingRule: undefined,
  propertyFilters: {},
  properties: [],
  distributorSortingRule: undefined,
  distributorFilters: {},
  distributors: [],
  administratorSortingRule: undefined,
  administratorFilters: {},
  administrators: [],
}

const alphabeticSort = (array, key) => {
  array.sort((a, b) => {
    if(a[key] < b[key]) return -1;    
    else if(a[key] > b[key]) return 1;    
    return 0;    
  })
}

const reverseAlphabeticSort = (array, key) => {
  array.sort((a, b) => {
    if(a[key] < b[key]) return 1;    
    else if(a[key] > b[key]) return -1;    
    return 0;    
  })
}

export const sortProducers = (producerSortingRule, producersToSort) => ({
  type: SORT_PRODUCERS,
  producerSortingRule,
  producersToSort
});

export const sortAndFilterProperties = (propertySortingRule, filters, propertiesToSort) => ({
  type: SORT_AND_FILTER_PROPERTIES,
  propertySortingRule,
  filters,
  propertiesToSort
});

export const sortAndFilterDistributors = (distributorSortingRule, filters, distributorsToSort) => ({
  type: SORT_AND_FILTER_DISTRIBUTORS,
  distributorSortingRule,
  filters,
  distributorsToSort
});

export const sortAndFilterAdministrators = (administratorSortingRule, filters, administratorsToSort) => ({
  type: SORT_AND_FILTER_ADMINISTRATORS,
  administratorSortingRule,
  filters,
  administratorsToSort
});

export const resetFilters = () => ({
  type: RESET_FILTERS
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch (type) {
    case SORT_PRODUCERS:
      let producerSortingRule = action.producerSortingRule;
      let producers = [...action.producersToSort];

      if(producerSortingRule === "alphabetic") alphabeticSort(producers, "name");
      else if(producerSortingRule === "reverse-alphabetic") reverseAlphabeticSort(producers, "name");
      
      return {
        ...state,
        producerSortingRule,
        producers
      };
  
    case SORT_AND_FILTER_PROPERTIES:
      let propertySortingRule = action.propertySortingRule;
      let propertyFilters = action.filters;
      let properties = [...action.propertiesToSort];
      
      if(propertySortingRule === "alphabetic") alphabeticSort(properties, "name");
      else if(propertySortingRule === "reverse-alphabetic") reverseAlphabeticSort(properties, "name");
      
      Object.keys(propertyFilters).forEach((key) => {
        if(propertyFilters[key] !== undefined) properties = properties.filter((distributor) => distributor[key] === propertyFilters[key]);
      });
      
      return {
        ...state,
        propertySortingRule,
        propertyFilters,
        properties
      };

    case SORT_AND_FILTER_DISTRIBUTORS:
      let distributorSortingRule = action.distributorSortingRule;
      let distributorFilters = action.filters;
      let distributors = [...action.distributorsToSort];
      
      if(distributorSortingRule === "alphabetic") alphabeticSort(distributors, "name");
      else if(distributorSortingRule === "reverse-alphabetic") reverseAlphabeticSort(distributors, "name");
      
      Object.keys(distributorFilters).forEach((key) => {
        if(distributorFilters[key] !== undefined) distributors = distributors.filter((distributor) => distributor[key] === distributorFilters[key]);
      });
      
      return {
        ...state,
        distributorSortingRule,
        distributorFilters,
        distributors
      };
  
    case SORT_AND_FILTER_ADMINISTRATORS:
      let administratorSortingRule = action.administratorSortingRule;
      let administratorFilters = action.filters;
      let administrators = [...action.administratorsToSort];
      
      if(administratorSortingRule === "alphabetic") alphabeticSort(administrators, "name");
      else if(administratorSortingRule === "reverse-alphabetic") reverseAlphabeticSort(administrators, "name");
      
      Object.keys(administratorFilters).forEach((key) => {
        if(administratorFilters[key] !== undefined) administrators = administrators.filter((administrator) => administrator[key] === administratorFilters[key]);
      });
      
      return {
        ...state,
        administratorSortingRule,
        administratorFilters,
        administrators
      };
  
    case RESET_FILTERS: 
      return {
        ...initialState
      }
      
    default:
      return state;
  }
}

export default reducer;