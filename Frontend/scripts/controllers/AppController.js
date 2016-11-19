'use strict';

app.controller('AppController', 
	['$scope', '$location', '$rootScope', 'authenticationService', 'userService', function ($scope, $location, $rootScope, authenticationService, userService) {
		$rootScope.isLoggedIn = authenticationService.isLoggedIn();
		$rootScope.username = authenticationService.getUsername();
		
		if ($rootScope.isLoggedIn) {
			userService.isAdmin().then(function (isAdmin) {
				$rootScope.isAdmin = isAdmin;
			}, function () {
				$rootScope.isAdmin = false;
			});
		}
		else {
			$rootScope.isAdmin = false;
		}
		
		$scope.logout = function () {
			authenticationService.logout();
			$rootScope.isLoggedIn = false;
			$rootScope.isAdmin = false;
		};

	}]
);