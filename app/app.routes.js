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
            .otherwise({ redirectTo: '/' });

        // HTML5 Mode Configuration
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
    }])
    .controller('NavController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    }]);