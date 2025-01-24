// Define the MainController for the customerApp module
angular
    .module('customerApp')
    .controller('MainController', ['$scope', 'CustomerService', function($scope, CustomerService) {
        // Define variables and functions for the dashboard
        $scope.message = 'Welcome to the Customer Dashboard!';

        // Example: Add dashboard statistics or other data
        $scope.dashboardStats = {
            totalCustomers: 0,
            newCustomersToday: 0,
            activeSubscriptions: 0
        };

        // Example: Function to greet users
        $scope.greetUser = function () {
            return `Hello! ${$scope.message}`;
        };

        // Available statuses
        $scope.statuses = ['active', 'inactive', 'pending'];

        // Function to calculate dashboard statistics
        function calculateDashboardStats(customers) {
            // Get today's date at the start of the day
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return {
                // Total number of customers
                totalCustomers: customers.length,
                
                // Count of active customers
                activeSubscriptions: customers.filter(c => c.status === 'active').length,
                
                // Count of new customers added today
                newCustomersToday: customers.filter(c => {
                    const registrationDate = new Date(c.registrationDate);
                    registrationDate.setHours(0, 0, 0, 0);
                    return registrationDate.getTime() === today.getTime();
                }).length
            };
        }

        // Watch for changes in CustomerService's customers
        $scope.$watch(
            function() {
                return CustomerService.getCustomers();
            }, 
            function(newCustomers) {
                if (newCustomers && newCustomers.length > 0) {
                    // Update dashboard statistics
                    $scope.dashboardStats = calculateDashboardStats(newCustomers);
                }
            }, 
            true  // Deep watch to detect changes
        );
    }]);