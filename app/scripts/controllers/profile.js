'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('ProfileCtrl', function ($scope) {

    $scope.tabs = [
    	'My Headlines',
    	'My Articles',
    	'Subscription'
    ];
    $scope.selectedTab = 'My Headlines';
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
    
  });
