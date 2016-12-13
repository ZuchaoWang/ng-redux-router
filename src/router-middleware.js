import { SET_LOCATION_URL, SET_LOCATION_SEARCH, RELOAD } from './action-types';

export default function routerMiddleware($location, $route) {
  return store => next => action => {
    if (action.type === SET_LOCATION_URL) {
      $location.url(action.payload);
    } else if (action.type === SET_LOCATION_SEARCH) {
      $location.search(action.payload);
    } else if (action.type === RELOAD) {
      $route.reload();
    }
    return next(action);
  };
}

routerMiddleware.$inject = ['$location', '$route'];
