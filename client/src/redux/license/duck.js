export const FETCH_LICENSES_REQUESTED = "/license/FETCH_LICENSES/REQUESTED";
export const FETCH_LICENSES_SUCCESS = "/license/FETCH_LICENSES/SUCCESS";
export const FETCH_LICENSES_FAILURE = "/license/FETCH_LICENSES/FAILURE";
export const DOWNLOAD_LICENSE_REQUESTED = "/license/DOWNLOAD_LICENSE/REQUESTED";
export const DOWNLOAD_LICENSE_SUCCESS = "/license/DOWNLOAD_LICENSE/SUCCESS";
export const DOWNLOAD_LICENSE_FAILURE = "/license/DOWNLOAD_LICENSE/FAILURE";
export const DOWNLOAD_LICENSE_RESET = "/license/DOWNLOAD_LICENSE/RESET";

const initialState = {
  licenses: [],
  soldBags: 0,
  fetchLicensesSucceed: undefined,
  fetchLicensesError: undefined,
  fileToDownload: undefined,
  downloadLicenseError: undefined,
}

export const fetchLicenses = (token, distAuth) => ({
  type: FETCH_LICENSES_REQUESTED,
  token,
  distAuth
});

export const onFetchLicensesSuccess = (licenses, soldBags) => ({
  type: FETCH_LICENSES_SUCCESS,
  licenses,
  soldBags
});

export const onFetchLicensesFailure = (error) => ({
  type: FETCH_LICENSES_FAILURE,
  error
});

export const downloadLicense = (token, distAuth, licenseId, distEmail) => ({
  type: DOWNLOAD_LICENSE_REQUESTED,
  token,
  distAuth, 
  licenseId, 
  distEmail
});

export const onDownloadLicenseSuccess = (b64File) => ({
  type: DOWNLOAD_LICENSE_SUCCESS,
  b64File
});

export const onDownloadLicenseFailure = (error) => ({
  type: DOWNLOAD_LICENSE_FAILURE,
  error
});

export const onDownloadLicenseReset = () => ({
  type: DOWNLOAD_LICENSE_RESET
});

const reducer = (state = initialState, action) => {
  let type = action.type;
  switch(type) {
    case FETCH_LICENSES_SUCCESS:
      let licenses = action.licenses;
      let soldBags = action.soldBags;
      return {
        ...state, 
        licenses,
        soldBags,
        fetchLicensesSucceed: true
      }

    case FETCH_LICENSES_FAILURE:
      let fetchLicensesError = action.error;
      return {
        ...state, fetchLicensesError
      }

    case DOWNLOAD_LICENSE_SUCCESS:
      let fileToDownload = action.b64File;
      return {
        ...state, fileToDownload
      }

    case DOWNLOAD_LICENSE_FAILURE:
      let downloadLicenseError = action.error;
      return {
        ...state, downloadLicenseError
      }

    case DOWNLOAD_LICENSE_RESET:
      return {
        ...state,
        fileToDownload: undefined,
        downloadLicenseError: undefined,
      }

    default:
      return state;
  } 
}

export default reducer;

export const selectSoldBagsCountPerMonthInCurrentCampaign = (state) => {
  const currentCampaign = state.campaign.currentCampaign;
  let soldBagsPerMonth = {}
  state.license.licenses.forEach((license) => {
    if(license.year === currentCampaign) {
      if(!Number.isInteger(soldBagsPerMonth[license.month])) soldBagsPerMonth[license.month] = 0;
      soldBagsPerMonth[license.month] += license.bags;
    }
  });
  return soldBagsPerMonth;
}