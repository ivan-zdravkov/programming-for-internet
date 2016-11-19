'use strict';

app.controller('ContactUsController', 
	['$scope', '$rootScope', '$location', 'notyService', 'mailService', function ($scope, $rootScope, $location, notyService, mailService) {
		$scope.message = {};
		$scope.message.from = $rootScope.username;
		$scope.invalidSubject = false;
		$scope.invalidContent = false;
		$rootScope.isDataLoading = false;

		$scope.subjectChange = function () {
			if ($scope.invalidSubject && $scope.message.subject && $scope.message.subject.length >= 1) {
				$scope.invalidSubject = false;
			}
		};

		$scope.contentChange = function () {
			if ($scope.invalidContent && $scope.message.content && $scope.message.content.length >= 10) {
				$scope.invalidContent = false;
			}
		};

		$scope.send = function () {
			if (!$scope.message.subject || $scope.message.subject.length < 1) {
				$scope.invalidSubject = true;
			} else {
				$scope.invalidSubject = false;
			}

			if (!$scope.message.content || $scope.message.content.length < 10) {
				$scope.invalidContent = true;
			} else {
				$scope.invalidContent = false;
			}

			if (!$scope.invalidSubject && !$scope.invalidContent) {
				$rootScope.isDataLoading = true;
				mailService.sendMail($scope.message).then(function () {
					notyService.successMessage('Your message was sent successfully.');
					$rootScope.isDataLoading = false;
					$location.path('/');
				});
			}
		};
	}]
);