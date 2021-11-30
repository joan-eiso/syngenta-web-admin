export const FETCH_PRODUCERS_REQUESTED = "/producer/FETCH_PRODUCERS/REQUESTED";
export const FETCH_PRODUCERS_SUCCESS = "/producer/FETCH_PRODUCERS/SUCCESS";
export const FETCH_PRODUCERS_FAILURE = "/producer/FETCH_PRODUCERS/FAILURE";
export const SET_PRODUCER_AS_CLIENT = "/producer/SET_PRODUCER_AS_CLIENT";

const initialState = {
  producers: [],
  fetchProducersSucceed: undefined,
  fetchProducersError: undefined
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

export const setProducerAsClient = (producerId) => ({
  type: SET_PRODUCER_AS_CLIENT,
  producerId
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_PRODUCERS_SUCCESS:
      let producers = action.producers;
      return {
        ...state, 
        producers,
        fetchProducersSucceed: true,
      }

    case FETCH_PRODUCERS_FAILURE:
      let fetchProducersError = action.error;
      return {
        ...state, fetchProducersError
      }

    case SET_PRODUCER_AS_CLIENT:
      let newClientId = action.producerId;
      let clientIndex = state.producers.findIndex((producer) => producer.id === newClientId);

      let updatedProducers = state.producers.map((producer, index) => {
        if(index === clientIndex) return { ...producer, isClient: true }
        return producer;
      })

      return {
        ...state, producers: updatedProducers
      }

    default:
      return state;
  } 
}

export default reducer;