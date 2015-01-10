'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('MainCtrl', function ($scope) {
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
	    $scope.headlines = [
	      'Goodbye Popcorn Time',
	      'The Real Lives of New Jersey — The Heroin Capital That Kills: 10 Things You Need To Know',
	      'America’s Angriest Store',
	      '7 Reasons Why You Will Never Do Anything Amazing With Your Life'
	    ];
	    $scope.articles = [
	      'ART Goodbye Popcorn Time',
	      'ART The Real Lives of New Jersey — The Heroin Capital That Kills: 10 Things You Need To Know',
	      'ART America’s Angriest Store',
	      'ART 7 Reasons Why You Will Never Do Anything Amazing With Your Life'
	    ];


    $scope.setTab = function(tab){
    	$scope.selectedTab = tab;
    };
    $scope.setCategory = function(cat){
    	console.debug(cat);
    	$scope.selectedCat = cat;
    };
    $scope.getRandomCat = function($index){
    	return '"http://thecatapi.com/api/images/get?format=src&results_per_page='+$index+1+'"';
    }
  });
