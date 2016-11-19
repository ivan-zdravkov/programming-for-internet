'use strict';

app.controller('CategoryController', 
	['$scope', '$rootScope', 'categoryService', 'notyService', function ($scope, $rootScope, categoryService, notyService) {
		$rootScope.isDataLoading = false;
		$scope.categories = [];
		$scope.newCategory = {};
		$scope.invalidCategoryName = false;

		$rootScope.isDataLoading = true;
		categoryService.getAllCategories().then(function (response) {
			$scope.categories = response;
			$rootScope.isDataLoading = false;
		});

		$scope.createCategory = function () {
			if ($scope.newCategory.name && $scope.newCategory.name.length > 1) {
				$rootScope.isDataLoading = true;
				categoryService.createCategory($scope.newCategory).then(function (categoryId) {
					$scope.categories.push({
						id: categoryId,
						name: $scope.newCategory.name
					});

					$scope.newCategory.name = '';

					notyService.successMessage('Category successfully created.');
					$rootScope.isDataLoading = false;
				});
			} else {
				$scope.invalidCategoryName = true;
			}
		};

		$scope.updateCategory = function (categoryId) {
			var categoryForUpdate = _.find($scope.categories, { id: categoryId });

			if (categoryForUpdate && categoryForUpdate.name && categoryForUpdate.name.length > 1) {
				$rootScope.isDataLoading = true;
				categoryService.updateCategory(categoryForUpdate).then(function () {
					notyService.successMessage('Category successfully updated.');
					$rootScope.isDataLoading = false;
				});
			} else {
				$scope.invalidCategoryName = true;
			}
		};

		$scope.deleteCategory = function (categoryId) {
			var categoryForDelete = _.find($scope.categories, { id: categoryId });

			if (categoryForDelete) {
				$rootScope.isDataLoading = true;
				categoryService.deleteCategory(categoryForDelete.id).then(function () {
					$scope.categories = $scope.categories.filter(function (category) {
						return category.id !== categoryForDelete.id;
					});

					notyService.successMessage('Category successfully deleted.');
					$rootScope.isDataLoading = false;
				});
			} else {
				notyService.successMessage('Category not found.');
			}
		};
	}]
);