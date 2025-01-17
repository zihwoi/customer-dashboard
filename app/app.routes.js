angular
    .module('customerApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {    
                templateUrl: 'app/views/dashboard.html',
                controller: 'MainController' // MainController for the dashboard
            })
            .when('/customers', {
                templateUrl: 'app/views/customer-list.html',
                controller: 'CustomerController' // CustomerController for the customer list
            })
            .otherwise({ redirectTo: '/' });
    }]);
