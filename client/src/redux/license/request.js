import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestLicenses(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "get_all_licencias",
      data: encodedPayload,
    }
  });
}
