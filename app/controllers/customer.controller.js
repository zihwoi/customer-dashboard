angular
    .module('customerApp', [])
    .controller('CustomerController', function ($scope) {

        //Data: Customer List
        $scope.customers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles' },
            { id: 3, name: 'Sam Wilson', email: 'sam@example.com', city: 'Chicago' },
            { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', city: 'New York' },
            { id: 5, name: 'Ethan Green', email: 'ethan@example.com', city: 'Los Angeles' }
        
        ];

        $scope.searchQuery = ''; // For the search input field
        $scope.selectedCity = ''; // For the city dropdown

        // Add customer
        $scope.addCustomer = function (customer) {
            $scope.customers.push(customer);
        };
    });