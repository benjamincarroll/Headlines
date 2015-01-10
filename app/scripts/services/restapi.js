'use strict';

/**
 * @ngdoc service
 * @name headlinesApp.restApi
 * @description
 * # restApi
 * Factory in the headlinesApp.
 */
angular.module('headlinesApp')
  .factory('restApi', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
