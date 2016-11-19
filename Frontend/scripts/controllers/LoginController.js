'use strict';

app.controller('LoginController', 
	['$scope', '$rootScope', '$location', 'userService', 'notyService', 'authenticationService', function ($scope, $rootScope, $location, userService, notyService, authenticationService) {
		$scope.invalidEmail = false;
		$scope.invalidPassword = false;
		$rootScope.isDataLoading = false;

		$scope.emailChange = function() {
			if ($scope.invalidEmail && $scope.email && $scope.email.length > 0) {
				$scope.invalidEmail = false;
			}
		};

		$scope.passChange = function() {
			if ($scope.invalidPassword && $scope.password && $scope.password.length >= 6) {
				$scope.invalidPassword = false;
			}
		};

		$scope.login = function () {
			if (!$scope.email) {
				$scope.invalidEmail = true;
			} else {
				$scope.invalidEmail = false;
			}

			if (!$scope.password || $scope.password.length < 6) {
				$scope.invalidPassword = true;
			} else {
				$scope.invalidPassword = false;
			}

			if (!$scope.invalidEmail && !$scope.invalidPassword) {
				var user = {
					username: $scope.email,
					password: $scope.password
				};

				$rootScope.isDataLoading = true;
				userService.loginUser(user).then(function (data) {
		        	data.username = user.username;
					authenticationService.saveUser(data);
					
					$rootScope.isLoggedIn = true;
					$rootScope.username = user.username;
					userService.isAdmin().then(function (isAdmin) {
						$rootScope.isAdmin = isAdmin;
						$rootScope.isDataLoading = false;
						$location.path('/');
					}, function () {
						$rootScope.isAdmin = false;
						$rootScope.isDataLoading = false;
						$location.path('/');
					});
				}, function () {
					notyService.errorMessage("Incorrect username or password.");
					$rootScope.isDataLoading = false;
				});
			}
		};
	}]
);