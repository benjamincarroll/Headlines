'use strict';

/**
 * @ngdoc overview
 * @name headlinesApp
 * @description
 * # headlinesApp
 *
 * Main module of the application.
 */
angular
  .module('headlinesApp', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.select2'
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    // $urlRouterProvider.when('/home/subject', '/home/subject/Math');
    $stateProvider
      .state('home', {
      	url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('newHeadline', {
        url: '/new',
        templateUrl: 'views/newHeadline.html',
        controller: 'NewheadlineCtrl'
      })
      .state('article', {
        url: '/article',
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .state('updateHeadline', {
        url: '/updateHeadline',
        templateUrl: 'views/updateheadline.html',
        controller: 'UpdateheadlineCtrl'
      })
      .state('editHeadline', {
        url: '/editHeadline',
        templateUrl: 'views/editheadline.html',
        controller: 'EditheadlineCtrl'
      });
  });
