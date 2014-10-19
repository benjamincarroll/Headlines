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
    	$scope.$parent.currentTab = 'Headlines';
    	$scope.dataReady = true;


}]);

angular.module('Headlines').controller("ArticlesCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	$scope.$parent.currentTab = 'Articles';
}]);

angular.module('Headlines').controller("ProfileCtrl", ['$scope', '$route', '$location', '$window', '$http',
    function ($scope, $route, $location, $window, $http) {
    	$scope.$parent.currentTab = 'Profile';
    	$scope.headline = '';

    	$scope.PostHeadline = function () {
    		$http.post('/headline', { 'article' : false, 'userId' : 7, 'headline': $scope.headline, 'dateCreated' : 1000, 'voteCount' : 100})
    			.success(function () {
    				console.log('Headline created!')
    			});
    	}

    	$scope.TwitterAuth = function () {
    		console.log("Calling Twitter Auth");
    		$http.get('/auth/twitter');
    	}
}]);
