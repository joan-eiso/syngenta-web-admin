import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestFetchLicenses(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "get_all_licencias",
      data: encodedPayload,
    }
  });
}

export function requestDownloadLicense(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_download_license",
      data: encodedPayload,
    }
  });
}
