import angular from 'angular';
import ngRoute from 'angular-route';

import routerMiddleware from './router-middleware';

import { setLocationUrl, setLocationSearch, reload } from './action-creaters';

export default angular
  .module('ng-redux-router', [ngRoute])
  .factory('ngRouterMiddleware', routerMiddleware)
  .name;

export const actionCreators = { setLocationUrl, setLocationSearch, reload };
