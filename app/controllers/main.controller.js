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

         // Update dashboard stats based on customers data
         $scope.$watch('customers', function(newVal) {
            if (newVal) {
                $scope.dashboardStats.totalCustomers = newVal.length;
                $scope.dashboardStats.activeSubscriptions = newVal.filter(c => c.status === 'active').length;
                
                // Calculate new customers today
                const today = new Date();
                $scope.dashboardStats.newCustomersToday = newVal.filter(c => {
                    const customerDate = new Date(c.registrationDate);
                    return customerDate.toDateString() === today.toDateString();
                }).length;
            }
        }, true);

         // Reset all filters
         $scope.resetFilters = function () {
            $scope.filters = {
                searchQuery: '',
                selectedCity: '',
            };
            $scope.currentPage = 1;
            $scope.sortField = 'id';
            $scope.sortReverse = false;
        };
        
    }]);
