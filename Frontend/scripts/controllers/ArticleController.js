'use strict';

app.controller('ArticleController', 
	['$scope', '$rootScope', '$q', '$routeParams', '$location', 'articleService', 'categoryService', 'tagService', 'notyService', 
		function ($scope, $rootScope, $q, $routeParams, $location, articleService, categoryService, tagService, notyService) {

			$('html,body').scrollTop(0);
			$rootScope.isDataLoading = false;
			$scope.isEditMode = $routeParams.action === 'edit';
			$scope.isCreateMode = $routeParams.action === 'create';
			$scope.isReadMode = $routeParams.action === 'read';
			$scope.articleId = $routeParams.articleId;
			$scope.articleNotFound = false;
			$scope.statuses = [];
			$scope.categories = [];
			$scope.articles = [];
			$rootScope.isDataLoading = false;
			$scope.invalidTitle = false;
			$scope.invalidContent = false;
			$scope.invalidStatus = false;
			$scope.invalidCategory = false;
			$scope.articleNotFound = false;
			$scope.errorMessage = 'The article you are looking for does not exist.';
			$scope.selectedStatus = {};
			$scope.selectedCategory = {};
			
			$scope.inputTag = {};
			$scope.inputTag.value = '';
			
			if ($scope.isCreateMode) {
				$scope.article = {
					id: 0,
					title: '',
					image: null,
					content: '',
					selectedTags: []
				};
			}

			var requestQueue = [];
			$rootScope.isDataLoading = true;
			if (($scope.isEditMode || $scope.isReadMode) && !isNaN($scope.articleId) && $scope.articleId > 0) {
				requestQueue.push(articleService.getArticleById($scope.articleId).then(function (response) {
					$scope.article = response;
				}));
			}

			if ($scope.isCreateMode || $scope.isEditMode) {
				requestQueue.push(articleService.getAllStatuses().then(function (response) {
					$scope.statuses = response;
				}));
			}

			requestQueue.push(categoryService.getAllCategories().then(function (response) {
				$scope.categories = response;
			}));
			
			requestQueue.push(tagService.getAllTags().then(function (response) {
				$scope.tags = response;
			}));

			$q.all(requestQueue).then(function () {
				if ($scope.article) {
					if ($scope.isEditMode || $scope.isReadMode) {
						$scope.selectedCategory = _.find($scope.categories, { id: $scope.article.categoryId });
					}

					if ($scope.isEditMode) {
						$scope.selectedStatus = _.find($scope.statuses, { id: $scope.article.statusId });
					}
					
					if (!$scope.article.image) {
						$scope.article.image = 'images/no_image_available.png';
					}
				}
				
				$rootScope.isDataLoading = false;
			}, function () {
				notyService.errorMessage("Failed to load necessary data.");
				$rootScope.isDataLoading = false;
			});

			$scope.titleChange = function () {
				if ($scope.invalidTitle && $scope.article.title && $scope.article.title.length >= 1) {
					$scope.invalidTitle = false;
				}
			};

			$scope.contentChange = function () {
				if ($scope.invalidContent && $scope.article.content && $scope.article.content.length >= 1) {
					$scope.invalidContent = false;
				}
			};

			$scope.statusChange = function () {
				if ($scope.invalidStatus && $scope.selectedStatus.id) {
					$scope.invalidStatus = false;
				}
			};

			$scope.categoryChange = function () {
				if ($scope.invalidCategory && $scope.selectedCategory.id) {
					$scope.invalidCategory = false;
				}
			};

			$scope.selectStatus = function (status) {
				$scope.selectedStatus = status;
				$scope.article.statusId = status.id;
				$scope.statusChange();

				if ($scope.isEditMode) {
					var articleStatusObj = {
						articleId: $scope.article.id,
						statusId: status.id
					};

					$rootScope.isDataLoading = true;
					articleService.changeArticleStatus(articleStatusObj).then(function (response) {
						notyService.successMessage('Article status successfully updated.');
						$rootScope.isDataLoading = false;
					});
				}
			};

			$scope.selectCategory = function (category) {
				$scope.selectedCategory = category;
				$scope.article.categoryId = category.id;
				$scope.categoryChange();
			};

			$scope.save = function () {
				$scope.article.tags = _.pluck($scope.article.selectedTags, 'name');
				
				if (!$scope.article.title || $scope.article.title.length < 1) {
					$scope.invalidTitle = true;
				} else {
					$scope.invalidTitle = false;
				}

				if (!$scope.article.content || $scope.article.content.length < 1) {
					$scope.invalidContent = true;
				} else {
					$scope.invalidContent = false;
				}

				if (!$scope.selectedStatus.id) {
					$scope.invalidStatus = true;
				} else {
					$scope.invalidStatus = false;
				}

				if (!$scope.selectedCategory.id) {
					$scope.invalidCategory = true;
				} else {
					$scope.invalidCategory = false;
				}

				if (!$scope.invalidTitle && !$scope.invalidContent && !$scope.invalidStatus && !$scope.invalidCategory) {
					$scope.article.content = $scope.article.content
					.replace(/color: rgb\(.{0,13}\);|float: none;|background-color: rgb\(.{0,13}\);/gi, '')
					.replace(/ style=""/gi, '');

					if ($scope.isEditMode && $scope.article.id > 0) {
						$rootScope.isDataLoading = true;
						articleService.updateArticle($scope.article).then(function (response) {
							notyService.successMessage('Article successfully updated.');
							$rootScope.isDataLoading = false;
							$scope.redirectToHowToPage();
						});
					} else if ($scope.isCreateMode && $scope.article.id === 0) {
						$rootScope.isDataLoading = true;
						articleService.createArticle($scope.article).then(function (response) {
							notyService.successMessage('Article successfully created.');
							$rootScope.isDataLoading = false;
							$scope.redirectToHowToPage();
						});
					}
				}
			};

			$scope.redirectToHowToPage = function () {
				$location.path('/howto');
			};

			$scope.previewArticle = function () {
				$scope.isPreview = !$scope.isPreview;
			};

			$scope.delete = function () {
				$rootScope.isDataLoading = true;
				articleService.deleteArticle($scope.article.id).then(function (response) {
					notyService.successMessage('Article successfully deleted.');
					$rootScope.isDataLoading = false;
					$scope.redirectToHowToPage();
				});
			};

			$scope.removeImage = function () {
				$scope.article.image = null;
				$('#fileSelect').val(null);
			};
			
			$scope.addTag = function (tag) {
				$scope.inputTag.value = '';
				
				$scope.article.selectedTags.push(tag);
			};
			
			$scope.addNewTag = function (inputTag) {
				var tag = {
					id: 0,
					name: inputTag
				};
				
				$scope.tags.push(tag);
				$scope.addTag(tag);
			};
			
			$scope.tagExists = function(inputTag) {
				return _.filter($scope.article.selectedTags, function(selectedTag) {
					return selectedTag.name == inputTag;
				}).length > 0;
			};
			
			$scope.removeTag = function (tagToRemove) {
				$scope.article.selectedTags = _.filter($scope.article.selectedTags, function(selectedTag) {
					return selectedTag.name != tagToRemove.name;
				});
			};
		}
	]
);