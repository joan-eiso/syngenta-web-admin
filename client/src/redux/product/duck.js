export const FETCH_CROPS_REQUESTED = "/product/FETCH_CROPS/REQUESTED";
export const FETCH_CROPS_SUCCESS = "/product/FETCH_CROPS/SUCCESS";
export const FETCH_CROPS_FAILURE = "/product/FETCH_CROPS/FAILURE";
export const CREATE_CROP_REQUESTED = "/product/CREATE_CROP/REQUESTED";
export const CREATE_CROP_SUCCESS = "/product/CREATE_CROP/SUCCESS";
export const CREATE_CROP_FAILURE = "/product/CREATE_CROP/FAILURE";
export const RESET_CREATE_CROP = "/product/CREATE_CROP/RESET";
export const FETCH_TECHNOLOGIES_REQUESTED = "/product/FETCH_TECHNOLOGIES/REQUESTED";
export const FETCH_TECHNOLOGIES_SUCCESS = "/product/FETCH_TECHNOLOGIES/SUCCESS";
export const FETCH_TECHNOLOGIES_FAILURE = "/product/FETCH_TECHNOLOGIES/FAILURE";
export const FETCH_TECH_TRAITS_REQUESTED = "/product/FETCH_TECH_TRAITS/REQUESTED";
export const FETCH_TECH_TRAITS_SUCCESS = "/product/FETCH_TECH_TRAITS/SUCCESS";
export const FETCH_TECH_TRAITS_FAILURE = "/product/FETCH_TECH_TRAITS/FAILURE";

const initialState = {
  crops: [],
  technologies: [],
  techTraits: [],
  fetchCropsSucceed: undefined,
  fetchCropsError: undefined,
  createCropSucceed: undefined,
  createCropError: undefined,
  fetchTechnologiesSucceed: undefined,
  fetchTechnologiesError: undefined,
  fetchTechTraitsSucceed: undefined,
  fetchTechTraitsError: undefined,
}

export const fetchCrops = (token, distAuth) => ({
  type: FETCH_CROPS_REQUESTED,
  token,
  distAuth
});

export const onFetchCropsSuccess = (crops) => ({
  type: FETCH_CROPS_SUCCESS,
  crops
});

export const onFetchCropsFailure = (error) => ({
  type: FETCH_CROPS_FAILURE,
  error
});

export const createCrop = (token, distAuth, name) => ({
  type: CREATE_CROP_REQUESTED,
  token,
  distAuth,
  name
});

export const onCreateCropSuccess = () => ({
  type: CREATE_CROP_SUCCESS
});

export const onCreateCropFailure = (error) => ({
  type: CREATE_CROP_FAILURE,
  error
});

export const resetCreateCrop = () => ({
  type: RESET_CREATE_CROP,
});

export const fetchTechnologies = (token, distAuth) => ({
  type: FETCH_TECHNOLOGIES_REQUESTED,
  token,
  distAuth
});

export const onFetchTechnologiesSuccess = (technologies) => ({
  type: FETCH_TECHNOLOGIES_SUCCESS,
  technologies
});

export const onFetchTechnologiesFailure = (error) => ({
  type: FETCH_TECHNOLOGIES_FAILURE,
  error
});

export const fetchTechTraits = (token, distAuth) => ({
  type: FETCH_TECH_TRAITS_REQUESTED,
  token,
  distAuth
});

export const onFetchTechTraitsSuccess = (techTraits) => ({
  type: FETCH_TECH_TRAITS_SUCCESS,
  techTraits
});

export const onFetchTechTraitsFailure = (error) => ({
  type: FETCH_TECH_TRAITS_FAILURE,
  error
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_CROPS_SUCCESS:
      let { crops } = action;
      return {
        ...state, 
        crops,
        fetchCropsSucceed: true
      }

    case FETCH_CROPS_FAILURE:
      let fetchCropsError = action.error;
      return {
        ...state, fetchCropsError
      }

    case CREATE_CROP_SUCCESS:
      return {
        ...state, createCropSucceed: true,
      }

    case CREATE_CROP_FAILURE:
      let createCropError = action.error;
      return {
        ...state, createCropError
      }

    case RESET_CREATE_CROP:
      return {
        ...state, 
        createCropSucceed: undefined,
        createCropError: undefined
      }

    case FETCH_TECHNOLOGIES_SUCCESS:
      let { technologies } = action;
      return {
        ...state, 
        technologies,
        fetchTechnologiesSucceed: true
      }

    case FETCH_TECHNOLOGIES_FAILURE:
      let fetchTechnologiesError = action.error;
      return {
        ...state, fetchTechnologiesError
      }

    case FETCH_TECH_TRAITS_SUCCESS:
      let { techTraits } = action;
      return {
        ...state, 
        techTraits,
        fetchTechTraitsSucceed: true
      }

    case FETCH_TECH_TRAITS_FAILURE:
      let fetchTechTraitsError = action.error;
      return {
        ...state, fetchTechTraitsError
      }

    default:
      return state;
  } 
}

export default reducer;