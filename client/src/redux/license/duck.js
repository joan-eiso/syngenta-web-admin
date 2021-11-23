export const FETCH_LICENSES_REQUESTED = "/license/FETCH_LICENSES/REQUESTED";
export const FETCH_LICENSES_SUCCESS = "/license/FETCH_LICENSES/SUCCESS";
export const FETCH_LICENSES_FAILURE = "/license/FETCH_LICENSES/FAILURE";

const initialState = {
  licenses: [],
  fetchError: undefined
}

export const fetchLicenses = (token, distAuth) => ({
  type: FETCH_LICENSES_REQUESTED,
  token,
  distAuth
});

export const onFetchLicensesSuccess = (licenses) => ({
  type: FETCH_LICENSES_SUCCESS,
  licenses
});

export const onFetchLicensesFailure = (error) => ({
  type: FETCH_LICENSES_FAILURE,
  error
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_LICENSES_SUCCESS:
      let licenses = action.licenses;
      return {
        ...state, licenses
      }

    case FETCH_LICENSES_FAILURE:
      let error = action.error;
      return {
        ...state, fetchError: error
      }

    default:
      return state;
  } 
}

export default reducer;