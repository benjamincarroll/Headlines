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

angular.module('Headlines').controller("MainCtrl", ['$scope', '$route', '$location', '$window', '$http', '$cookies',
    function ($scope, $route, $location, $window, $http, $cookies) {
        $scope.user = null;

        $http.get('/userInfo')
                .then(function (result) {
                    $scope.user = result.data.user;
                })

        $scope.ShowSignInModal = function () {
            $('#signInModal').modal('show');
        }

        $scope.SignOut = function () {
            $http.get('/logout')
                .success(function (result) {
                    $scope.user = null;
            });
        }


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

        $scope.vote = function (headline) {
            console.log('here')
            if ($scope.$parent.user == null) {
                $scope.$parent.ShowSignInModal();
            }
            else {
                // $http.post()
            }
        }


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
        

        if ($scope.$parent.user == null) {
            $scope.$parent.ShowSignInModal();
        }

    	$scope.PostHeadline = function () {
    		$http.post('/headline', { 'article' : false, 'userId' : 7, 'headline': $scope.headline, 'dateCreated' : moment().unix(), 'voteCount' : 0})
    			.success(function () {
    				console.log('Headline created!')
    			});
    	}
}]);
