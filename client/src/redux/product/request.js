import axios from "axios";
import { sessionEndpoint } from "../../utils/endpoints.util";

export function requestFetchCrops(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_cultivares",
      data: encodedPayload,
    }
  });
}

export function requestCreateCrop(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "create_cultivares",
      data: encodedPayload,
    }
  });
}

export function requestFetchTechnologies(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_tecnologias",
      data: encodedPayload,
    }
  });
}

export function requestFetchTechTraits(encodedPayload) {
  return axios.request({
    method: "POST",
    url: sessionEndpoint,
    data: {
      method: "dist_get_all_caracteristicas_tecnologicas",
      data: encodedPayload,
    }
  });
}