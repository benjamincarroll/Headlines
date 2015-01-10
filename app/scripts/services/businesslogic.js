'use strict';

/**
 * @ngdoc service
 * @name headlinesApp.businesslogic
 * @description
 * # businesslogic
 * Factory in the headlinesApp.
 */
angular.module('headlinesApp')
  .factory('businesslogic', function () {
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
