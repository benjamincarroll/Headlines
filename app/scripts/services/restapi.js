'use strict';

/**
 * @ngdoc service
 * @name headlinesApp.restApi
 * @description
 * # restApi
 * Factory in the headlinesApp.
 */
angular.module('headlinesApp')
  .factory('restApi', function ($http) {
    
    var api = '/api';

    // Public API here
    return {
      getContent: function (number, type) {
        return $http.get(api+'/headlines/'+type+'/date/'+number);
      },
      getUserInfo: function() {
        return $http.get(api+'/userInfo');
      },
      createHeadline: function(data){
        return $http.post(api+'/headline', data);
      },
      upvote: function(headId, userId){
        return $http.post(api+'/headlines/upvote/'+headId+'/'+userId);
      }
    };
  });
