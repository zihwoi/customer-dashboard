// Define the MainController for the customerApp module
angular
    .module('customerApp')
    .controller('MainController', ['$scope', function($scope) {
        // Define variables and functions for the dashboard
        $scope.message = 'Welcome to the Customer Dashboard!';
        
        // Example: Add dashboard statistics or other data
        $scope.dashboardStats = {
            totalCustomers: 0,
            newCustomersToday: 0,
            activeSubscriptions: 0
        };

        // Example: Function to greet users
        $scope.greetUser = function() {
            return `Hello! ${$scope.message}`;
        };

        
        // Available statuses
        $scope.statuses = ['active', 'inactive', 'pending'];

        // Direct watch on customers array from CustomerController
        $scope.$watch('customers', function(newCustomers) {
            if (newCustomers && newCustomers.length > 0) {
                const today = new Date();

                $scope.dashboardStats = {
                    totalCustomers: newCustomers.length,
                    activeSubscriptions: newCustomers.filter(c => c.status === 'active').length,
                    newCustomersToday: newCustomers.filter(c => {
                        const customerDate = new Date(c.registrationDate);
                        return customerDate.toDateString() === today.toDateString();
                    }).length
                };
            }
        }, true);  // Deep watch to detect changes in customer array
    }]);
