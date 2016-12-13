import angular from 'angular';
import ngRoute from 'angular-route';

import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import ngReduxRouter from '../src';

import { actionCreators } from '../src';

const RECORD_ROUTE = 'RECORD_ROUTE';

function recordRoute(current) {
  return {
    type: RECORD_ROUTE,
    payload: current
  };
}

function routerReducer(state = {}, action) {
  return (action.type === RECORD_ROUTE) ? { current: info(action.payload), previous: state.current } : state;
}

function info(routeInfo) {
  return routeInfo ? {
    name: routeInfo.locals.name,
    params: Object.assign({}, routeInfo.params)
  } : { params: {} };
}

export default angular
  .module('demoApp', [
    ngRoute,
    ngRedux,
    ngReduxRouter
  ])
  .controller('MainController', ($scope, $ngRedux) => {
    $scope.globalState = {};

    $scope.$on('$destroy', $ngRedux.connect(state => {
      return {
        globalState: state
      };
    })($scope));
  })
  .config(['$routeProvider', $routeProvider => {
    $routeProvider
      .when('/children/:childId', {
        template: `
          <div class="child-view">
            <h2>Child View</h2>
            <button ng-click="setLocationUrl('children/1')">setLocationUrl('children/1')</button>
            <button ng-click="setLocationUrl('children/2')">setLocationUrl('children/2')</button>
            <button ng-click="setLocationSearch({xxx:'yyy'})">setLocationSearch({xxx:'yyy'})</button>
            <button ng-click="reload()">reload()</button>
          </div>
        `,
        controller: ($scope, $ngRedux) => {
          $scope.$on('$destroy', $ngRedux.connect(null, actionCreators)($scope));
        },
        resolve: {
          name: () => 'children'
        },
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/children/1'
      });
  }])
  .config(['$ngReduxProvider', $ngReduxProvider => {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    const reducers = combineReducers({
      router: routerReducer
    });

    $ngReduxProvider.createStoreWith(reducers, ['ngRouterMiddleware', logger, thunk]);
  }])
  .run(['$rootScope', '$ngRedux', ($rootScope, $ngRedux) => {
    $rootScope.$on('$routeChangeSuccess', (evt, current) => $ngRedux.dispatch(recordRoute(current)));
    $rootScope.$on('$routeUpdate', (evt, current) => $ngRedux.dispatch(recordRoute(current)));
  }])
  .name;
