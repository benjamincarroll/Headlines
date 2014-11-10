var app = angular.module('Headlines', [ 'ngRoute', 'ngCookies' ]);
// angular.module('cookiesExample', ['ngCookies'])

app.config(['$routeProvider', function ($routeProvider) {
  	$routeProvider
  		.when('/Headlines', {
            templateUrl: 'js/src/templates/headlines.html',
            controller: 'HeadlinesCtrl'
        })
        .when('/Articles', {
            templateUrl: 'js/src/templates/articles.html',
            controller: 'ArticlesCtrl'
        })
        .when('/Profile',{
            templateUrl: 'js/src/templates/profile.html',
            controller: 'ProfileCtrl'
        })
        .otherwise({
            redirectTo: '/Headlines'
        });
}]);

// angular.module('cookiesExample', ['ngCookies'])
// .controller('ExampleController', ['$cookies', function($cookies) {
//   // Retrieving a cookie
//   var favoriteCookie = $cookies.myFavorite;
//   // Setting a cookie
//   $cookies.myFavorite = 'oatmeal';
// }]);

angular.module('Headlines').controller("MainCtrl", ['$scope', '$route', '$location', '$window', '$http', '$cookies',
    function ($scope, $route, $location, $window, $http, $cookies) {

        $scope.TwitterAuth = function () {
            console.log("Calling Twitter Auth");
            $http.get('/auth/twitter')
                .success(function (data) {
                    console.log("Successful call, here's the data..");
                    console.log(data);
                });

        }

        $http.get('/yay')
            .success(function (data) {
                console.log(data.message);
            });

      // Retrieving a cookie
      var favoriteCookie = $cookies.hello;
      console.log(favoriteCookie);

}]);

angular.module('Headlines').controller("HeadlinesCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	$scope.$parent.currentTab = 'Headlines';
    	$scope.dataReady = false;

        $http.get('/headlines/0')
            .success(function (data) {
                $scope.lines = data;
                console.log(data);
                $scope.dataReady = true;
            });


}]);

angular.module('Headlines').controller("ArticlesCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	$scope.$parent.currentTab = 'Articles';
        $scope.dataReady = false;

        $http.get('/articles/0')
            .success(function (data) {
                $scope.lines = data;
                console.log(data);
                $scope.dataReady = true;
            });
}]);

angular.module('Headlines').controller("ProfileCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	$scope.$parent.currentTab = 'Profile';
    	$scope.headline = '';
        $('#signInModal').modal('show');

    	$scope.PostHeadline = function () {
    		$http.post('/headline', { 'article' : false, 'userId' : 7, 'headline': $scope.headline, 'dateCreated' : moment().unix(), 'voteCount' : 0})
    			.success(function () {
    				console.log('Headline created!')
    			});
    	}

    	$scope.TwitterAuth = function () {
    		console.log("Calling Twitter Auth");
    		$http.get('/auth/twitter')
                .success(function (data) {
                    console.log("Successful call, here's the data..");
                    console.log(data);
                });

    	}
}]);
