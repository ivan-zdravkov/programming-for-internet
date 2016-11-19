'use strict';

app.controller('ShareController', 
	['$scope', '$rootScope', '$location', 'notyService', 'articleService', function ($scope, $rootScope, $location, notyService, articleService) {
		$scope.article = {};
		$scope.article.from = $rootScope.username;
		$scope.invalidTitle = false;
		$scope.invalidContent = false;
		$scope.isPreview = false;
		$rootScope.isDataLoading = false;

		$scope.titleChange = function () {
			if ($scope.invalidTitle && $scope.article.title && $scope.article.title.length >= 1) {
				$scope.invalidTitle = false;
			}
		};

		$scope.contentChange = function () {
			if ($scope.invalidContent && $scope.article.content && $scope.article.content.length >= 4) {
				$scope.invalidContent = false;
			}
		};

		$scope.previewArticle = function () {
			$scope.isPreview = !$scope.isPreview;
		};

		$scope.send = function () {
			$scope.article.tags = [];
			$scope.article.categoryId = 2;
			
			if (!$scope.article.title || $scope.article.title.length < 1) {
				$scope.invalidTitle = true;
			} else {
				$scope.invalidTitle = false;
			}

			if (!$scope.article.content || $scope.article.content.length < 4) {
				$scope.invalidContent = true;
			} else {
				$scope.invalidContent = false;
			}

			if (!$scope.invalidTitle && !$scope.invalidContent) {
				$rootScope.isDataLoading = true;
				articleService.submitArticle($scope.article).then(function () {
					notyService.successMessage('Your message was sent successfully.');
					$rootScope.isDataLoading = false;
					$location.path('/');
				}, function () {
					notyService.errorMessage("Failed to send article.");
					$rootScope.isDataLoading = false;
				});
			}
		};
		
		$scope.removeImage = function () {
			$scope.article.image = null;
			$('#fileSelect').val(null);
		};
	}]
);