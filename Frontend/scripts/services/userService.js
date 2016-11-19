'use strict';

app.factory('userService', ['$http', '$q', '$rootScope', 'authSettings', 'authenticationService', 'queryService',
	function ($http, $q, $rootScope, authSettings, authenticationService, queryService) {

		var serviceBase = authSettings.baseUri;
	
		var _registerUser = function (user) {
			var resourceURL = serviceBase + '/api/accounts/create';
	        var promise = queryService.post(resourceURL, user, 'UTC');

	        return promise;
		};

		var _loginUser = function (user) {
			var resourceURL = serviceBase + '/oauth/token';
	        var promise = queryService.login(resourceURL, "userName=" + user.username + "&password=" + user.password + "&grant_type=password", 'UTC');

    		return promise;
		};

		var _logoutUser = function () {
			authenticationService.removeUser();
		};

		var _isAdmin = function () {
			var resourceURL = serviceBase + '/api/accounts/isAdmin';
	        var promise = queryService.get(resourceURL, 'UTC');

	        return promise;
		};

		return {
			registerUser: _registerUser,
			loginUser: _loginUser,
			logoutUser: _logoutUser,
			isAdmin: _isAdmin
		};
	}
]);