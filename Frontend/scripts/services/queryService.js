'use strict';

app.factory('queryService', ['$http', '$q', 'authenticationService', function ($http, $q, authenticationService) {

	var _executeGetQuery = function (resourceURL, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.get(resourceURL, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executePostQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.post(resourceURL, data, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };
	
	var _executeLoginPostQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);
        headers.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        $http.post(resourceURL, data, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executeDeleteQuery = function (resourceURL, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.delete(resourceURL, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _executePutQuery = function (resourceURL, data, timeZoneID) {
        var deferred = $q.defer();
        var headers = _createHeaders(timeZoneID);

        $http.put(resourceURL, data, headers)
        .success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _createHeaders = function (timeZoneID) {
        var headers = {};
        headers.headers = authenticationService.getHeaders();
        headers.headers['TimeZoneID'] = timeZoneID;
        headers.headers['Content-Type'] = 'application/json;charset=utf-8';

        return headers;
    };

	return {
        get: _executeGetQuery,
        post: _executePostQuery,
		login: _executeLoginPostQuery,
        put: _executePutQuery,
        delete: _executeDeleteQuery
	};
}]);