'use strict';

app.factory('notyService', function () {
    var _successMessage = function showSuccessMessage(msg, seconds) {
        if (!seconds) {
             seconds = 4;
        }
        
        noty({
            text: msg,
            type: 'success',
            layout: 'topCenter',
            timeout: seconds * 1000}
        );
    };

    var _errorMessage = function showErrorMessage(msg, seconds) {
        if (!seconds) {
             seconds = 4;
        }

        noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: seconds * 1000}
        );
    };

    return {
        successMessage: _successMessage,
        errorMessage: _errorMessage
    };
});