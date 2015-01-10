'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:NewheadlineCtrl
 * @description
 * # NewheadlineCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('NewheadlineCtrl', function ($scope) {
  	$scope.headlineForm = {
  		'title': '',
  		'subtitle': '',
  		'goal': 100
  	};
    $scope.numbers = [
      10, 50, 100, 150, 200, 500, 1000, 10000
    ];
    $scope.typeOfContent = ['Article', 'Link', 'Youtube Video'];
    $scope.submitNewHeadline = function(){
    	console.debug('submitting new headline!');
    };
    $scope.disableSubmit = false;
  });
