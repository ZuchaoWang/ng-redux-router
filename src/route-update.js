import { ROUTE_UPDATE } from './action-types';

/**
 * @param {Object} event event details
 * @param {Object} current current/previous route
 * @return {Object} Action object
 */
export default function onRouteUpdate(event, current) {
  return {
    type: ROUTE_UPDATE,
    payload: {event, current}
  };
}
