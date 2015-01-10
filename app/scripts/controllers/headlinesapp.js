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
	$scope.user = {
		picture: '../images/defaultprofile.png'
	};
	appData.getUserInfo().then(function(resp){
		$scope.user = resp.data.userInfo;
	});    //NEED TO FIXED THIS AND PUT THE CALL TO UI router RESOLVE!! will cause concurrency issues

	$scope.getRandomCat = function($index){
    	var random = $index + 1;
    	return '"http://thecatapi.com/api/images/get?format=src&results_per_page='+random+'"';
    }
  });
