import { SET_LOCATION_URL, SET_LOCATION_SEARCH, RELOAD } from './action-types';

export function setLocationUrl(url) {
  return {
    type: SET_LOCATION_URL,
    payload: url
  };
}

export function setLocationSearch(params) {
  return {
    type: SET_LOCATION_SEARCH,
    payload: params
  };
}

export function reload() {
  return {
    type: RELOAD
  };
}
