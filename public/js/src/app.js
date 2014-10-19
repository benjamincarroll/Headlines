var app = angular.module('Headlines', [ 'ngRoute']);

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

angular.module('Headlines').controller("HeadlinesCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	console.log('HeadlinesCtrl ready to go.');
}]);

angular.module('Headlines').controller("ArticlesCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	console.log('ArticlesCtrl ready to go.');
}]);

angular.module('Headlines').controller("ProfileCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	console.log('ProfileCtrl ready to go.');

    	$scope.TwitterAuth = function () {
    		console.log("Calling Twitter Auth");
    		$http.get('/auth/twitter');
    	}
}]);
