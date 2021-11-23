export const FETCH_PROPERTIES_REQUESTED = "/property/FETCH_PROPERTIES/REQUESTED";
export const FETCH_PROPERTIES_SUCCESS = "/property/FETCH_PROPERTIES/SUCCESS";
export const FETCH_PROPERTIES_FAILURE = "/property/FETCH_PROPERTIES/FAILURE";

const initialState = {
  properties: [],
  fetchError: undefined,
}

export const fetchProperties = (token, distAuth) => ({
  type: FETCH_PROPERTIES_REQUESTED,
  token,
  distAuth
});

export const onFetchPropertiesSuccess = (properties) => ({
  type: FETCH_PROPERTIES_SUCCESS,
  properties
});

export const onFetchPropertiesFailure = (error) => ({
  type: FETCH_PROPERTIES_FAILURE,
  error
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_PROPERTIES_SUCCESS:
      let properties = action.properties;
      return {
        ...state, properties
      }

    case FETCH_PROPERTIES_FAILURE:
      let error = action.error;
      return {
        ...state, fetchError: error
      }

    default:
      return state;
  } 
}

export default reducer;