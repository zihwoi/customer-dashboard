angular
    .module('customerApp')
    .controller('CustomerController', ['$scope', function ($scope) {

        //Data: Customer List
        $scope.customers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles' },
            { id: 3, name: 'Sam Wilson', email: 'sam@example.com', city: 'Chicago' },
            { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', city: 'New York' },
            { id: 5, name: 'Ethan Green', email: 'ethan@example.com', city: 'Los Angeles' }

        ];

        $scope.resetFilters = function () {
            $scope.searchQuery = ''; // To bind with the search input field

            $scope.filteredCustomers = function () {
                return $scope.customers.filter(function (customer) {
                    return customer.name.toLowerCase().includes($scope.searchQuery.toLowerCase()) ||
                        customer.email.toLowerCase().includes($scope.searchQuery.toLowerCase()) ||
                        customer.city.toLowerCase().includes($scope.searchQuery.toLowerCase());
                });
            };

            $scope.selectedCity = ''; // For the city dropdown
        };

        // Function to add a new customer
        $scope.addCustomer = function (newCustomer) {
            if (newCustomer && newCustomer.name && newCustomer.email && newCustomer.city) {
                const nextId = $scope.customers.length + 1;
                newCustomer.id = nextId; // Assign an ID to the new customer
                $scope.customers.push(newCustomer);
                $scope.newCustomer = {}; // Clear the form
            } else {
                alert('Please fill out all fields!');
            }
        };

        // Log a message to confirm controller is working
        console.log('CustomerController initialized');
    }]);