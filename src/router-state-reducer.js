import { ROUTE_CHANGE_SUCCESS, ROUTE_UPDATE } from './action-types';

const INITIAL_STATE = {};

/**
 * Reducer of ROUTE_CHANGE_SUCCESS actions. Returns a state object
 * with { currentState, currentParams, prevState, prevParams }
 *
 * @param  {Object} state - Previous state
 * @param  {Object} action - Action
 * @return {Object} New state
 */
export default function routerStateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROUTE_CHANGE_SUCCESS:
      return { current: info(action.payload.current), previous: info(action.payload.previous) };
    case ROUTE_UPDATE:
      return { current: info(action.payload.current), previous: state.current };
    default:
      return state;
  }
}

function info(routeInfo) {
  return routeInfo ? {
    name: routeInfo.locals.name,
    params: Object.assign({}, routeInfo.params)
  } : { params: {} };
}
