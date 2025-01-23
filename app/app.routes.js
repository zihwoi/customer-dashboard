angular.module('customerApp')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/dashboard.html',
                controller: 'MainController'
            })
            .when('/customers', {
                templateUrl: 'app/views/customer-list.html',
                controller: 'CustomerController'
            })
            .when('/customers/:id', {
                templateUrl: 'app/views/customer-detail.html',
                controller: 'CustomerDetailController'
            })
            .otherwise({ redirectTo: '/' });

       
        // Use hash-based routing instead of HTML5 mode
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
    }]);

    