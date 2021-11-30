export const LOGIN_REQUESTED = "/authentication/LOGIN/REQUESTED";
export const LOGIN_SUCCESS = "/authentication/LOGIN/SUCCESS";
export const LOGIN_FAILURE = "/authentication/LOGIN/FAILURE";
export const LOAD_DATA_SUCCESS = "/authentication/LOAD_DATA/SUCCESS";
export const LOGOUT = "/authentication/LOGOUT";
export const RESET_PWD_RECOVERY_STATUS = "/authentication/RESET_PWD_RECOVERY_STATUS";
export const SEND_PWD_RECOVERY_CODE_REQUESTED = "/authentication/SEND_PWD_RECOVERY_CODE/REQUESTED";
export const SEND_PWD_RECOVERY_CODE_SUCCESS = "/authentication/SEND_PWD_RECOVERY_CODE/SUCCESS";
export const SEND_PWD_RECOVERY_CODE_FAILURE = "/authentication/SEND_PWD_RECOVERY_CODE/FAILURE";
export const VERIFY_PWD_RECOVERY_CODE_REQUESTED = "/authentication/VERIFY_PWD_RECOVERY_CODE/REQUESTED";
export const VERIFY_PWD_RECOVERY_CODE_SUCCESS = "/authentication/VERIFY_PWD_RECOVERY_CODE/SUCCESS";
export const VERIFY_PWD_RECOVERY_CODE_FAILURE = "/authentication/VERIFY_PWD_RECOVERY_CODE/FAILURE";
export const RESTORE_PWD_REQUESTED = "/authentication/RESTORE_PWD/REQUESTED";
export const RESTORE_PWD_SUCCESS = "/authentication/RESTORE_PWD/SUCCESS";
export const RESTORE_PWD_FAILURE = "/authentication/RESTORE_PWD/FAILURE";

const initialPwdRecoveryStatus = {
  sendPwdRecoveryCodeSucceed: undefined,
  sendPwdRecoveryCodeError: undefined,
  verifyPwdRecoveryCodeSucceed: undefined,
  verifyPwdRecoveryCodeError: undefined,
  pwdRecoverySucceed: undefined,
  pwdRecoveryError: undefined,
}

const initialState = {
  token: undefined,
  distAuth: undefined,
  loginError: undefined,
  loadDataSucceed: undefined,
  ...initialPwdRecoveryStatus
};

export const login = (email, password) => ({
  type: LOGIN_REQUESTED,
  email,
  password
});

export const onLoginSuccess = (token, distAuth) => ({
  type: LOGIN_SUCCESS,
  token,
  distAuth
});

export const onLoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const onLoadDataSuccess = () => ({
  type: LOAD_DATA_SUCCESS,
});

export const resetPwdRecoveryStatus = () => ({
  type: RESET_PWD_RECOVERY_STATUS,
});

export const sendPwdRecoveryCode = (email) => ({
  type: SEND_PWD_RECOVERY_CODE_REQUESTED,
  email
});

export const onSendPwdRecoveryCodeSuccess = () => ({
  type: SEND_PWD_RECOVERY_CODE_SUCCESS,
});

export const onSendPwdRecoveryCodeFailure = (error) => ({
  type: SEND_PWD_RECOVERY_CODE_FAILURE,
  error
});

export const verifyPwdRecoveryCode = (code) => ({
  type: VERIFY_PWD_RECOVERY_CODE_REQUESTED,
  code
});

export const onVerifyPwdRecoveryCodeSuccess = () => ({
  type: VERIFY_PWD_RECOVERY_CODE_SUCCESS,
});

export const onVerifyPwdRecoveryCodeFailure = (error) => ({
  type: VERIFY_PWD_RECOVERY_CODE_FAILURE,
  error
});

export const restorePwd = (newPassword) => ({
  type: RESTORE_PWD_REQUESTED,
  newPassword
});

export const onRestorePwdSuccess = () => ({
  type: RESTORE_PWD_SUCCESS,
});

export const onRestorePwdFailure = (error) => ({
  type: RESTORE_PWD_FAILURE,
  error
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case LOGIN_SUCCESS: 
      return {
        ...state, 
        token: action.token,
        distAuth: action.distAuth,
        loginError: undefined,
      };

    case LOGIN_FAILURE: 
      return {
        ...state,
        loginError: action.error,
      };

    case LOAD_DATA_SUCCESS: 
      return {
        ...state,
        loadDataSucceed: true,
      };
      
      case LOGOUT: 
      return {
        ...initialState
      };
      
    case RESET_PWD_RECOVERY_STATUS:
      return {
        ...state, 
        ...initialPwdRecoveryStatus
      }
      
    case SEND_PWD_RECOVERY_CODE_SUCCESS:
      return {
        ...state, sendPwdRecoveryCodeSucceed: true,
      }
      
    case SEND_PWD_RECOVERY_CODE_FAILURE:
      return {
        ...state, sendPwdRecoveryCodeError: action.error,
      }

    case VERIFY_PWD_RECOVERY_CODE_SUCCESS:
      return {
        ...state, verifyPwdRecoveryCodeSucceed: true,
      }

    case VERIFY_PWD_RECOVERY_CODE_FAILURE:
      return {
        ...state, verifyPwdRecoveryCodeError: action.error,
      }

    case RESTORE_PWD_SUCCESS:
      return {
        ...state, pwdRecoverySucceed: true,
      }

    case RESTORE_PWD_FAILURE:
      return {
        ...state, pwdRecoveryError: action.error,
      }

    default:
      return state;
  }
};

export default reducer;