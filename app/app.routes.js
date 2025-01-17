angular
    .module('customerApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {    
                templateUrl: 'app/views/dashboard.html',
                controller: 'CustomerController'
            })
            .when('/customers', {
                templateUrl: 'app/views/customer-list.html',
                controller: 'CustomerController'
            })
            .otherwise({redirectTo: '/'});
    }]);