export const FETCH_PRODUCERS_REQUESTED = "/producer/FETCH_PRODUCERS/REQUESTED";
export const FETCH_PRODUCERS_SUCCESS = "/producer/FETCH_PRODUCERS/SUCCESS";
export const FETCH_PRODUCERS_FAILURE = "/producer/FETCH_PRODUCERS/FAILURE";

const initialState = {
  producers: [],
  fetchError: undefined
}

export const fetchProducers = (token, distAuth) => ({
  type: FETCH_PRODUCERS_REQUESTED,
  token,
  distAuth
});

export const onFetchProducersSuccess = (producers) => ({
  type: FETCH_PRODUCERS_SUCCESS,
  producers
});

export const onFetchProducersFailure = (error) => ({
  type: FETCH_PRODUCERS_FAILURE,
  error
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_PRODUCERS_SUCCESS:
      let producers = action.producers;
      return {
        ...state, producers
      }

    case FETCH_PRODUCERS_FAILURE:
      let error = action.error;
      return {
        ...state, fetchError: error
      }

    default:
      return state;
  } 
}

export default reducer;