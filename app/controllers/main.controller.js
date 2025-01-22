// Define the MainController for the customerApp module
angular
    .module('customerApp')
    .controller('MainController', ['$scope', function($scope) {
        // Define variables and functions for the dashboard
        $scope.message = 'Welcome to the Customer Dashboard!';
        
        // Example: Add dashboard statistics or other data
        $scope.dashboardStats = {
            totalCustomers: 120,
            newCustomersToday: 5,
            activeSubscriptions: 95
        };

        // Example: Function to greet users
        $scope.greetUser = function() {
            return `Hello! ${$scope.message}`;
        };

        // Log a message to the console to confirm controller is working
        console.log('Main Controller is loaded!');
        console.log('Dashboard Stats:', $scope.dashboardStats);

    }]);
