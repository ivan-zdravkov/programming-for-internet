'use strict';

var app = angular.module('app', ['ngRoute', 'textAngular', 'angularUtils.directives.dirPagination']);

app.constant('authSettings', {
	// baseUri: 'http://95.158.165.1',
	baseUri: "http://localhost:13447"
});

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/welcome.html',
			controller: 'HomeController'
		})
		.when('/howto', {
			templateUrl: 'views/howto.html',
			controller: 'HowToController'
		})
		.when('/article/:action', {
			templateUrl: 'views/article.html',
			controller: 'ArticleController',
			isLogin: true
		})
		.when('/article/:action/:articleId', {
			templateUrl: 'views/article.html',
			controller: 'ArticleController'
		})
		.when('/share', {
			templateUrl: 'views/shareyourexperience.html',
			controller: 'ShareController',
			isLogin: true
		})
		.when('/contactus', {
			templateUrl: 'views/contactus.html',
			controller: 'ContactUsController',
			isLogin: true
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegisterController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/users', {
			templateUrl: 'views/user.html',
			controller: 'UserController',
			isLogin: true
		})
		.when('/category', {
			templateUrl: 'views/category.html',
			controller: 'CategoryController',
			isLogin: true
		})
		.when('/404', {
			templateUrl: 'views/notFound.html',
		})
		.otherwise({
		    redirectTo: '/404'
		});
}]);

app.factory('queryInterceptor', ['$q', '$rootScope', 'authenticationService', 'notyService', function($q, $rootScope, authenticationService, notyService) {  
    return {
		responseError: function(response) {
			var deferred = $q.defer();
			
			if (response.status == 401) {
				authenticationService.logout(true);
				notyService.errorMessage('You must login to execute this action!');
			}
			else if (response.status == 500) {
				notyService.errorMessage('Oops, something went wrong.');
				$rootScope.isDataLoading = false;
			}
			
			deferred.reject(response);
            return deferred.promise;
		}
    };
}]);

app.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('queryInterceptor');
}]);