export const FETCH_PRODUCERS_REQUESTED = "/producer/FETCH_PRODUCERS/REQUESTED";
export const FETCH_PRODUCERS_SUCCESS = "/producer/FETCH_PRODUCERS/SUCCESS";
export const FETCH_PRODUCERS_FAILURE = "/producer/FETCH_PRODUCERS/FAILURE";

const initialState = {
  producers: [],
}

export const fetchProducers = (distAuth, token) => ({
  type: FETCH_PRODUCERS_REQUESTED,
  distAuth,
  token
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_PRODUCERS_SUCCESS:
      let producers = action.producers;
      return {
        ...state, producers
      }

    default:
      return state;
  } 
}

export default reducer;