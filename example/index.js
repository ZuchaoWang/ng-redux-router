import angular from 'angular';
import ngRoute from 'angular-route';

import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import ngReduxRouter from '../src';

import { routerStateReducer, routerActions } from '../src';

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
  .config($routeProvider => {
    $routeProvider
      .when('/children/:childId', {
        template: `
          <div class="child-view">
            <h2>Child View childId</h2>
            <button ng-click="setLocationUrl('children/1')">setLocationUrl('children/1')</button>
            <button ng-click="setLocationUrl('children/2')">setLocationUrl('children/2')</button>
            <button ng-click="setLocationSearch({xxx:'yyy'})">setLocationSearch({xxx:'yyy'})</button>
            <button ng-click="reload()">reload()</button>
          </div>
        `,
        controller: ($scope, $ngRedux) => {
          $scope.$on('$destroy', $ngRedux.connect(null, routerActions)($scope));
        },
        resolve: {
          name: () => 'children'
        },
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/children/1'
      });
  })
  .config($ngReduxProvider => {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    const reducers = combineReducers({
      router: routerStateReducer
    });

    $ngReduxProvider.createStoreWith(reducers, ['ngRouterMiddleware', logger, thunk]);
  })
  .name;
