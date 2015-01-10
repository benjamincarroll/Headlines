'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('ArticleCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
