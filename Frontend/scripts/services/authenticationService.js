'use strict';

app.factory('authenticationService', ['$rootScope', '$location', function ($rootScope, $location) {
	var key = 'user';

	var _saveUser = function (data) {
		localStorage.setItem(key, JSON.stringify(data));
	};

	var _getUser = function () {
		var token = JSON.parse(localStorage.getItem(key));
		return token;
	};

	var _logout = function (shouldRedirectToLogin) {
		localStorage.removeItem(key);
		$rootScope.isLoggedIn = false;
		$rootScope.isAdmin = false;
		$rootScope.username = '';
		
		if (shouldRedirectToLogin) {
			$location.path('/login');
		}
		else {
			$location.path('/');
		}
	};

	var _getHeaders = function () {
		var headers = {};
		var userData = _getUser();
		if (userData) {
			headers.Authorization = 'Bearer ' + userData.access_token;
		}

		return headers;
	};

	var _isLoggedIn = function () {
		return !!_getUser();
	};

	var _getUsername = function () {
		var token = JSON.parse(localStorage.getItem(key));
		if (token) {
			return token.username;
		}
		return '';
	};

	return {
		saveUser: _saveUser,
		getUser: _getUser,
		logout: _logout,
		getHeaders: _getHeaders,
		isLoggedIn: _isLoggedIn,
		getUsername: _getUsername
	};
}]);