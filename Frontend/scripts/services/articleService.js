'use strict';

app.factory('articleService', ['$http', '$q', 'authSettings', 'authenticationService', 'queryService',
	function ($http, $q, authSettings, authenticationService, queryService) {

		var serviceBase = authSettings.baseUri;

		var _getAllArticles = function () {
			var resourceURL = serviceBase + '/api/article/getAll';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		var _getArticleById = function (articleId) {
			var resourceURL = serviceBase + '/api/article/getById/' + articleId;
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};
		
		var _submitArticle = function (article) {
			var resourceURL = serviceBase + '/api/article/submit';
	        var promise = queryService.post(resourceURL, article, 'UTC');

	        return promise;
		};

		var _createArticle = function (article) {
			var resourceURL = serviceBase + '/api/article/create';
	        var promise = queryService.post(resourceURL, article, 'UTC');

	        return promise;
		};

		var _updateArticle = function (article) {
			var resourceURL = serviceBase + '/api/article/update/' + article.id;
	        var promise = queryService.put(resourceURL, article, 'UTC');

	        return promise;
		};

		var _changeArticleStatus = function (article) {
			var resourceURL = serviceBase + '/api/article/changeStatus';
	        var promise = queryService.put(resourceURL, article, 'UTC');

	        return promise;
		};

		var _deleteArticle = function (articleId) {
			var resourceURL = serviceBase + '/api/article/delete/' + articleId;
	        var promise = queryService.delete(resourceURL, 'UTC');

	        return promise;
		};

		var _getAllStatuses = function () {
			var resourceURL = serviceBase + '/api/article/getAllStatuses';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		return {
			getAllArticles: _getAllArticles,
			getArticleById: _getArticleById,
			submitArticle: _submitArticle,
			createArticle: _createArticle,
			updateArticle: _updateArticle,
			changeArticleStatus: _changeArticleStatus,
			deleteArticle: _deleteArticle,
			getAllStatuses: _getAllStatuses
		};
	}
]);