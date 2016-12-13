// Exports the constants used for triggering transitions using Angular Router
//
// SET_LOCATION_URL: Action for triggering a $location.url
// SET_LOCATION_SEARCH: Action for triggering a $location.search
//
export const SET_LOCATION_URL = '@@ngReduxRouter/setLocationUrl';
export const SET_LOCATION_SEARCH = '@@ngReduxRouter/setLocationSearch';
export const RELOAD = '@@ngReduxRouter/reload';

// Router Events
export const ROUTE_CHANGE_START = '@@ngReduxRouter/$routeChangeStart';
export const ROUTE_CHANGE_SUCCESS = '@@ngReduxRouter/$routeChangeSuccess';
export const ROUTE_CHANGE_ERROR = '@@ngReduxRouter/$routeChangeError';
export const ROUTE_UPDATE = '@@ngReduxRouter/$routeUpdate';
