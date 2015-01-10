'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('MainCtrl', function ($scope, appData) {
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

    $scope.categories = [
      'Most Popular',
      'Most Recent',
      'Favorites',
      'Music',
      'Arts',
      'Technology',
      'Science',
      'Politics'
    ];
    $scope.selectedCat = 'Most Popular';
    $scope.tabs = [
    	'Headlines',
    	'Articles'
    ];
    $scope.selectedTab = 'Headlines';
	   
    $scope.setTab = function(tab){
    	$scope.selectedTab = tab;
    };
    $scope.setCategory = function(cat){
    	console.debug(cat);
    	$scope.selectedCat = cat;
    };
    $scope.getRandomCat = function($index){
    	var random = $index + 1;
    	return '"http://thecatapi.com/api/images/get?format=src&results_per_page='+random+'"';
    }
    $scope.upvote = function(){

    };
  });
