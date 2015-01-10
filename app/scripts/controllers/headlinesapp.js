'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:HeadlinesappCtrl
 * @description
 * # HeadlinesappCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('HeadlinesappCtrl', function ($scope, appData) {
	$scope.user = {};
	appData.getUserInfo().then(function(resp){
		// $scope.user = resp.data.user;
	});    //NEED TO FIXED THIS AND PUT THE CALL TO UI router RESOLVE!!
  });
