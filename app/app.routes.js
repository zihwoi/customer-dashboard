angular
    .module('customerApp', ['ngRoute'])
    .config(['$routeProvided', function($routeProvider) {
        $routeProvider
            .when('/', {    
                templateUrl: 'app/views/dashboard.html',
                controller: 'MainController'
            })
            .when('/customers', {
                templateUrl: 'app/views/customer-list.html',
                controller: 'CustomerController'
            })
            .otherwise({redirectTo: '/'});
    }]);