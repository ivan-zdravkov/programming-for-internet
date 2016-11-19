'use strict';

app.controller('RegisterController', 
	['$scope', '$rootScope', '$location', 'userService', 'notyService', function ($scope, $rootScope, $location, userService, notyService) {
		$scope.reg = {};
		$scope.invalidEmail = false;
		$scope.invalidPassword = false;
		$scope.invalidConfPassword = false;
		$scope.invalidPasswords = false;
		$rootScope.isDataLoading = false;

		$scope.emailChange = function () {
			if ($scope.invalidEmail && $scope.reg.email && $scope.reg.email.length > 0) {
				$scope.invalidEmail = false;
			}
		};

		$scope.passChange = function () {
			if ($scope.invalidPassword && $scope.reg.password && $scope.reg.password.length >= 4) {
				$scope.invalidPassword = false;
			}

			if ($scope.invalidPasswords && $scope.reg.password === $scope.reg.confPassword) {
				$scope.invalidPasswords = false;
			}
		};

		$scope.confPassChange = function () {
			if ($scope.invalidConfPassword && $scope.reg.confPassword && $scope.reg.confPassword.length > 0) {
				$scope.invalidConfPassword = false;
			} else if ($scope.invalidPasswords && $scope.reg.password === $scope.reg.confPassword) {
				$scope.invalidPasswords = false;
			}
		};

		$scope.register = function () {
			if (!$scope.reg.email || $scope.reg.email.length <= 5) {
				$scope.invalidEmail = true;
			} else {
				$scope.invalidEmail = false;
			}

			if (!$scope.reg.password || $scope.reg.password.length < 4) {
				$scope.invalidPassword = true;
			} else {
				$scope.invalidPassword = false;
			}

			if (!$scope.reg.confPassword) {
				$scope.invalidConfPassword = true;
			} else {
				$scope.invalidConfPassword = false;
			}

			if ($scope.reg.password !== $scope.reg.confPassword) {
				$scope.invalidPasswords = true;
			} else {
				$scope.invalidPasswords = false;
			}

			if (!$scope.invalidEmail && !$scope.invalidPassword && 
				!$scope.invalidConfPassword && !$scope.invalidPasswords) {
				var user = {
					email: $scope.reg.email,
					password: $scope.reg.password,
					confirmPassword: $scope.reg.confPassword
				};

				$rootScope.isDataLoading = true;
				userService.registerUser(user).then(function () {
					notyService.successMessage('Registration successful. Please check your e-mail.', 5);
					$rootScope.isDataLoading = false;
					$location.path('/');
				}, function(err) {
					notyService.errorMessage(err.message, 5);
					$rootScope.isDataLoading = false;
				});
				
			}
		};
	}]
);