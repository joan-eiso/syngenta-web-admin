import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestFetchCountries(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_countries",
      data: encodedPayload,
    }
  });
}

export function requestFetchDepartments(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_dptos",
      data: encodedPayload,
    }
  });
}

export function requestFetchCities(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_municipios",
      data: encodedPayload,
    }
  });
}

export function requestFetchSubregions(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_subregions",
      data: encodedPayload,
    }
  });
}