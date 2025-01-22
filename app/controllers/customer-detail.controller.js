angular.module('customerApp')
    .controller('CustomerDetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.customer = null;
        $scope.purchaseHistory = [];
        
        // Get customer details
        function loadCustomerDetails(customerId) {
            var storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
            $scope.customer = storedCustomers.find(c => c.id === parseInt(customerId));
            
            // Mock purchase history data
            $scope.purchaseHistory = [
                { id: 1, date: new Date('2024-01-10'), amount: 199.99, product: 'Premium Subscription' },
                { id: 2, date: new Date('2024-01-15'), amount: 49.99, product: 'Add-on Service' }
            ];
        }
        
        loadCustomerDetails($routeParams.id);
    }]);
