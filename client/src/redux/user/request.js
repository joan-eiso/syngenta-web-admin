import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestUsers(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "get_all_users",
      data: encodedPayload,
    }
  });
}

export function requestCreateUser(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "create_users",
      data: encodedPayload,
    }
  });
}

export function requestEditUser(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "edit_users",
      data: encodedPayload,
    }
  });
}
