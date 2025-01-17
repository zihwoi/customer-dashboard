angular
    .module('customerApp', [])
    .controller('CustomerController', function ($scope) {

        //Data: Customer List
        $scope.customers = [
            { name: 'John Doe', city: 'New York', status: 'Active' },
            { name: 'Jane Smith', city: 'Los Angeles', status: 'Inactive' },
            { name: 'Sam Wilson', city: 'Chicago', status: 'Active' }
        ];

        // Search functionality
        $scope.search = function (query) {
            return $scope.customers.filter(function (customer) {
                return customer.name.toLowerCase().includes(query.toLowerCase());
            });
        };

        // Filter functionality 
        $scope.filterByCity = function (city) {
            return $scope.customers.filter(function (customer) {
                return customer.city === city;
            });
        };

        // Add customer
        $scope.addCustomer = function (customer) {
            $scope.customers.push(customer);
        };
    });