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
    
    var userId = '';
    var headlinePost = {
        "userId": "",
        "headline": "",
        "dateCreated": null,
        "voteCount": 0,
        "threshold": 0
    };
    var buildHeadline = function(headline, subtitle, threshold){
        headlinePost.userId = userId;
        headlinePost.headline = headline;
        headlinePost.subtitle = subtitle;
        headlinePost.dateCreated = new Date();
        headlinePost.threshold = threshold;
        return headlinePost;
    };

    // Public API here
    return {
      getUserInfo: function() {
        return restApi.getUserInfo().then(function(resp){
          console.dir(resp);
          userId = resp.data.userId;
          return resp;
        });
      },
      getHeadlines: function (number) {
        return restApi.getContent(number, 'pending');
      },
      getArticles: function(number){
        return restApi.getContent(number, 'completed');
      },
      upvote: function(hId){
        return restApi.upvote(hId, userId).then(function(resp){
          return resp.data.success;
        });
      },
      createHeadline: function(data){
        var post = buildHeadline(data.title, data.subtitle, data.threshold);
        return restApi.createHeadline(post).then(function(resp){
            console.debug('Post Created!');
            console.dir(resp);
            return resp;
        });
      }
    };
  });
