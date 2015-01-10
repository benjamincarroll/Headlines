'use strict';

/**
 * @ngdoc function
 * @name headlinesApp.controller:NewheadlineCtrl
 * @description
 * # NewheadlineCtrl
 * Controller of the headlinesApp
 */
angular.module('headlinesApp')
  .controller('NewheadlineCtrl', function ($scope, appData, $state) {
  	$scope.headlineForm = {
  		'title': '',
  		'subtitle': '',
  		'threshold': 100
  	};

    $scope.submit = function(){
    	$scope.disableSubmit = true;
      appData.createHeadline($scope.headlineForm).then(function(resp){
        $state.go('profile')
      });
    };
    $scope.disableSubmit = false;
    $scope.clear = function(){
      $scope.headlineForm = {
        'title': '',
        'subtitle': '',
        'threshold': 0
      };
    };
  });
