'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('ProfileCtrl', function ($scope, appData) {

    $scope.tabs = [
    	'My Headlines',
    	'My Articles',
    	'Subscription'
    ];
    $scope.selectedTab = 'My Headlines';
    $scope.headlines = [];
  	appData.getHeadlines(0).then(function(resp){
  		$scope.headlines = resp.data;
	  	console.dir($scope.headlines);
  	});
  	$scope.articles = []; 
  	appData.getArticles(0).then(function(resp){
  		$scope.articles = resp.data;
	  	console.dir($scope.articles);
  	});

    $scope.setTab = function(tab){
    	$scope.selectedTab = tab;
    };
    
  });
