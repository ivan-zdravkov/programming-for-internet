'use strict';

app.factory('tagService', ['authSettings', 'queryService',	function (authSettings, queryService) {

	var serviceBase = authSettings.baseUri;

	var _getAllTags = function () {
		var resourceURL = serviceBase + '/api/tag/getAll';
        var promise = queryService.get(resourceURL, 'UTC');

        return promise;
	};

	return {
		getAllTags: _getAllTags,
	};
}]);