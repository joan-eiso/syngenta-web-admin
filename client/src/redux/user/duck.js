export const FETCH_USERS_REQUESTED = "/user/FETCH_USERS/REQUESTED";
export const FETCH_USERS_SUCCESS = "/user/FETCH_USERS/SUCCESS";
export const FETCH_USERS_FAILURE = "/user/FETCH_USERS/FAILURE";
export const RESET_FETCH_USERS = "/user/FETCH_USERS/RESET";
export const CREATE_USER_REQUESTED = "/user/CREATE_USER/REQUESTED";
export const CREATE_USER_SUCCESS = "/user/CREATE_USER/SUCCESS";
export const CREATE_USER_FAILURE = "/user/CREATE_USER/FAILURE";
export const RESET_CREATE_USER = "/user/CREATE_USER/RESET";
export const EDIT_USER_REQUESTED = "/user/EDIT_USER/REQUESTED";
export const EDIT_USER_SUCCESS = "/user/EDIT_USER/SUCCESS";
export const EDIT_USER_FAILURE = "/user/EDIT_USER/FAILURE";
export const RESET_EDIT_USER = "/user/EDIT_USER/RESET";

const initialState = {
  users: [],
  administrators: [],
  distributors: [],
  fetchError: undefined,
  createUserSucceed: undefined,
  createUserError: undefined,
  editUserSucceed: undefined,
  editUserError: undefined,
}

export const fetchUsers = (token, distAuth) => ({
  type: FETCH_USERS_REQUESTED,
  token,
  distAuth
});

export const onFetchUsersSuccess = (users, distributors, administrators) => ({
  type: FETCH_USERS_SUCCESS,
  users,
  distributors,
  administrators
});

export const onFetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  error
});

export const resetFetchUsers = () => ({
  type: RESET_FETCH_USERS,
});

export const createUser = (token, userPayload) => ({
  type: CREATE_USER_REQUESTED,
  token,
  userPayload
});

export const onCreateUserSuccess = (users, distributors, administrators) => ({
  type: CREATE_USER_SUCCESS
});

export const onCreateUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  error
});

export const resetCreateUser = () => ({
  type: RESET_CREATE_USER,
});

export const editUser = (token, userPayload) => ({
  type: EDIT_USER_REQUESTED,
  token,
  userPayload
});

export const onEditUserSuccess = () => ({
  type: EDIT_USER_SUCCESS,
});

export const onEditUserFailure = (error) => ({
  type: EDIT_USER_FAILURE,
  error
});

export const resetEditUser = () => ({
  type: RESET_EDIT_USER,
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_USERS_SUCCESS:
      let { users, administrators, distributors } = action;
      return {
        ...state, 
        users,
        administrators,
        distributors
      }

    case FETCH_USERS_FAILURE:
      let fetchError = action.error;
      return {
        ...state, fetchError
      }

    case RESET_FETCH_USERS:
      return {
        ...state, 
        fetchError: undefined
      }

    case CREATE_USER_SUCCESS:
      return {
        ...state, createUserSucceed: true,
      }

    case CREATE_USER_FAILURE:
      let createUserError = action.error;
      return {
        ...state, createUserError
      }

    case RESET_CREATE_USER:
      return {
        ...state, 
        createUserSucceed: undefined,
        createUserError: undefined
      }

    case EDIT_USER_SUCCESS:
      return {
        ...state, editUserSucceed: true,
      }

    case EDIT_USER_FAILURE:
      let editUserError = action.error;
      return {
        ...state, editUserError
      }

    case RESET_EDIT_USER:
      return {
        ...state, 
        editUserSucceed: undefined,
        editUserError: undefined
      }

    default:
      return state;
  } 
}

export default reducer;