export const FETCH_PROPERTIES_REQUESTED = "/property/FETCH_PROPERTIES/REQUESTED";
export const FETCH_PROPERTIES_SUCCESS = "/property/FETCH_PROPERTIES/SUCCESS";
export const FETCH_PROPERTIES_FAILURE = "/property/FETCH_PROPERTIES/FAILURE";
export const NOTIFY_CLIENT = "/property/NOTIFY_CLIENT";

const initialState = {
  properties: [],
  hectareCount: undefined,
  fetchPropertiesSucceed: undefined,
  fetchPropertiesError: undefined,
}

export const fetchProperties = (token, distAuth) => ({
  type: FETCH_PROPERTIES_REQUESTED,
  token,
  distAuth
});

export const onFetchPropertiesSuccess = (properties, hectareCount) => ({
  type: FETCH_PROPERTIES_SUCCESS,
  properties,
  hectareCount
});

export const onFetchPropertiesFailure = (error) => ({
  type: FETCH_PROPERTIES_FAILURE,
  error
});

export const notifyClient = (propertyId, licenseYear) => ({
  type: NOTIFY_CLIENT,
  propertyId,
  licenseYear
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_PROPERTIES_SUCCESS:
      let properties = action.properties;
      let hectareCount = action.hectareCount;
      return {
        ...state, 
        properties,
        hectareCount,
        fetchPropertiesSucceed: true
      }

    case FETCH_PROPERTIES_FAILURE:
      let fetchPropertiesError = action.error;
      return {
        ...state, fetchPropertiesError
      }

    default:
      return state;
  } 
}

export default reducer;

export const selectHectaresCountPerMonthInCurrentCampaign = (state) => {
  const currentCampaign = state.campaign.currentCampaign;
  let hectaresPerMonth = {}
  state.property.properties.forEach((property) => {
    if(property.year === currentCampaign) {
      if(!Number.isInteger(hectaresPerMonth[property.month])) hectaresPerMonth[property.month] = 0;
      hectaresPerMonth[property.month] += property.hectares;
    }
  });
  return hectaresPerMonth;
}

export const selectPropertyById = (state, id) => {
  return state.property.properties.find((property) => property.id === id);
}