import axios from "axios";
import { authEndpoint } from "../../utils/endpoints.util";

export function requestLogin(email, password) {  
  return axios.request({
    method: "POST",
    url: authEndpoint,
    // url: `https://cors-anywhere.herokuapp.com/${authEndpoint}`,
    data: {
        "method": "login_admin",
        "data": {
          "email": email,
          "pass": password
      }
    }
  });
}

export function requestSendRecoveryPwdCode(email) {  
  return axios.request({
    method: "POST",
    url: authEndpoint,
    // url: `https://cors-anywhere.herokuapp.com/${authEndpoint}`,
    data: {
        "method": "send_code",
        "data": {
          "email": email,
      }
    }
  });
}

export function requestVerifyRecoveryPwdCode(email, code) {  
  return axios.request({
    method: "POST",
    url: authEndpoint,
    // url: `https://cors-anywhere.herokuapp.com/${authEndpoint}`,
    data: {
        "method": "verify_code",
        "data": {
          "email": email,
          "code": code,
      }
    }
  });
}

export function requestRestorePwd(email, newPassword, passwordRecoveryCode) {  
  return axios.request({
    method: "POST",
    url: authEndpoint,
    // url: `https://cors-anywhere.herokuapp.com/${authEndpoint}`,
    data: {
        "method": "recover_pwd",
        "data": {
          "email": email,
          "pass": newPassword,
          "code": passwordRecoveryCode,
      }
    }
  });
}
