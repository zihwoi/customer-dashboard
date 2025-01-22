// customer-detail.controller.js
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

// auth.service.js
angular.module('customerApp')
    .service('AuthService', function() {
        return {
            login: function(credentials) {
                // Simple authentication (replace with proper authentication)
                if (credentials.username === 'admin' && credentials.password === 'password') {
                    localStorage.setItem('isAuthenticated', 'true');
                    return true;
                }
                return false;
            },
            logout: function() {
                localStorage.removeItem('isAuthenticated');
            },
            isAuthenticated: function() {
                return localStorage.getItem('isAuthenticated') === 'true';
            }
        };
    });

// customer.service.js
angular.module('customerApp')
    .service('CustomerService', function() {
        return {
            exportToCSV: function(customers) {
                const headers = ['ID', 'Name', 'Email', 'City', 'Status', 'Registration Date'];
                const csvData = customers.map(c => [
                    c.id,
                    c.name,
                    c.email,
                    c.city,
                    c.status,
                    new Date(c.registrationDate).toLocaleDateString()
                ]);
                
                const csvContent = [
                    headers.join(','),
                    ...csvData.map(row => row.join(','))
                ].join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'customers.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            }
        };
    });

// notification.service.js
angular.module('customerApp')
    .service('NotificationService', ['$rootScope', function($rootScope) {
        const notifications = [];
        
        return {
            add: function(message, type = 'info') {
                const notification = {
                    id: Date.now(),
                    message,
                    type,
                    timestamp: new Date()
                };
                notifications.push(notification);
                $rootScope.$broadcast('newNotification', notification);
            },
            getAll: function() {
                return notifications;
            },
            clear: function() {
                notifications.length = 0;
            }
        };
    }]);

// Modified CustomerController to include new features
angular.module('customerApp')
    .controller('CustomerController', ['$scope', 'CustomerService', 'NotificationService', 
    function($scope, CustomerService, NotificationService) {
        // ... (existing controller code) ...

        // Add customer group functionality
        $scope.customerGroups = ['Regular', 'VIP', 'Premium'];
        $scope.getCustomerGroup = function(customer) {
            if (customer.totalPurchases > 1000) return 'VIP';
            if (customer.totalPurchases > 500) return 'Premium';
            return 'Regular';
        };

        // Export functionality
        $scope.exportCustomers = function() {
            CustomerService.exportToCSV($scope.getFilteredCustomers());
            NotificationService.add('Customer data exported successfully', 'success');
        };

        // Enhanced add customer with notification
        const originalAddCustomer = $scope.addCustomer;
        $scope.addCustomer = function(newCustomer) {
            originalAddCustomer(newCustomer);
            NotificationService.add('New customer added: ' + newCustomer.name, 'success');
        };
    }]);