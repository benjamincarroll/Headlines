'use strict';

/**
 * @ngdoc service
 * @name headlinesApp.appData
 * @description
 * # appData
 * Factory in the headlinesApp.
 */
angular.module('headlinesApp')
  .factory('appData', function (restApi) {
    
    var headlinePost = {
        "userId": "546a9404e3650bc830d62466",
        "headline": "RHCP are the bomb",
        "dateCreated": 9765467,
        "voteCount": 0,
        "threshold": 5
    };

    var userInfo = {};

    // Public API here
    return {
      getUserInfo: function() {
        return restApi.getUserInfo().then(function(resp){
          userInfo = resp.data;
          console.dir(userInfo);
        });
      },
      getHeadlines: function (number) {
        return restApi.getContent(number, 'pending');
      },
      getArticles: function(number){
        return restApi.getContent(number, 'completed');
      },
      upvote: function(hId){
        return restApi.upvote(hId, userId);
      }
    };
  });
