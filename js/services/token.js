myApp.factory('BearerAuthInterceptor', function ($window, $q, $rootScope) {
    return {
        request: function (config) {

            config.headers = config.headers || {};
            if ($window.localStorage.getItem('token')) {
                // may also use sessionStorage
                config.headers.authorization = 'Bearer ' + $window.localStorage.getItem('token');
            }
            $rootScope.userLogged = config.headers.authorization ? true : false;
            return config || $q.when(config);
        },
        response: function (response) {
            if (response.status === 401) {
                //  Redirect user to login page / signup Page.
            }
            return response || $q.when(response);
        }
    };
});