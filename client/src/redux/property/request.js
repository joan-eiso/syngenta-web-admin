import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestProperties(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "get_all_predios",
      data: encodedPayload,
    }
  });
}
