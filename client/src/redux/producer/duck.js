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

export const setProducerAsClient = (producerId, { isFormerClient = undefined }) => ({
  type: SET_PRODUCER_AS_CLIENT,
  producerId,
  isFormerClient
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
      let isFormerClient = action.isFormerClient;
      let clientIndex = state.producers.findIndex((producer) => producer.id === newClientId);

      let updatedProducers = state.producers.map((producer, index) => {
        if(index === clientIndex && !isFormerClient) return { ...producer, isClient: true }
        else if(index === clientIndex && isFormerClient) return { ...producer, isFormerClient: true }
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

export const selectClientCountInFormerCampaign = (state) => {
  return state.producer.producers.reduce((acc, producer) => {
    if(producer.isFormerClient) return acc + 1;
    return acc;
  }, 0);
}

export const selectClientCountInBothCampaigns = (state) => {
  return state.producer.producers.reduce((acc, producer) => {
    if(producer.isClient && producer.isFormerClient) return acc + 1;
    return acc;
  }, 0);
}