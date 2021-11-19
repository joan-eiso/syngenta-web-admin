import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestProducers(encodedPayload) {
  return axios.request({
    method: "POST",
    // url: sessionEndpoint,
    url: `https://cors-anywhere.herokuapp.com/${sessionEndpoint}`,
    data: {
      method: "dist_get_all_prod",
      data: encodedPayload,
    }
  });
}
