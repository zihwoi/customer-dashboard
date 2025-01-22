angular
    .module('customerApp')
    .controller('CustomerController', ['$scope', function ($scope) {

        var storedCustomers = localStorage.getItem('customers');

        // Data: Customer List
        $scope.customers = storedCustomers ? JSON.parse(storedCustomers) : [
            { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York', status: 'active', registrationDate: new Date('2024-01-15') },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles', status: 'active', registrationDate: new Date('2024-01-16') },
            { id: 3, name: 'Sam Wilson', email: 'sam@example.com', city: 'Chicago', status: 'inactive', registrationDate: new Date('2024-01-17') },
            { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', city: 'New York', status: 'active', registrationDate: new Date('2024-01-18') },
            { id: 5, name: 'Ethan Green', email: 'ethan@example.com', city: 'Los Angeles', status: 'pending', registrationDate: new Date('2024-01-19') }
        ];

        // Convert stored dates back to Date objects
        $scope.customers.forEach(customer => {
            customer.registrationDate = new Date(customer.registrationDate);
        });

        // Function to save customers to localStorage
        function saveCustomers() {
            localStorage.setItem('customers', JSON.stringify($scope.customers));
        }

        // Pagination
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.totalItems = $scope.customers.length;

        // Sorting
        $scope.sortField = 'name';
        $scope.sortReverse = false;

        // Filters
        $scope.filters = {
            searchQuery: '',
            selectedCity: '',
            selectedStatus: ''
        };

        // Available statuses
        $scope.statuses = ['active', 'inactive', 'pending'];

        // Reset all filters
        $scope.resetFilters = function () {
            $scope.filters = {
                searchQuery: '',
                selectedCity: '',
                selectedStatus: ''
            };
            $scope.currentPage = 1;
            $scope.sortField = 'id';
            $scope.sortReverse = false;
        };

        // Extract unique cities from customer data for filtering
        $scope.cities = [...new Set($scope.customers.map(customer => customer.city))];
        $scope.cities.unshift(''); // Add empty option for city filter

        // Get filtered and sorted customers
        $scope.getFilteredCustomers = function () {
            return $scope.customers
                .filter(function (customer) {
                    // Search query filter
                    var matchesSearch = !$scope.filters.searchQuery ||
                        customer.name.toLowerCase().includes($scope.filters.searchQuery.toLowerCase()) ||
                        customer.email.toLowerCase().includes($scope.filters.searchQuery.toLowerCase()) ||
                        customer.city.toLowerCase().includes($scope.filters.searchQuery.toLowerCase());

                    // City filter
                    var matchesCity = !$scope.filters.selectedCity ||
                        customer.city === $scope.filters.selectedCity;

                    // Status filter
                    var matchesStatus = !$scope.filters.selectedStatus ||
                        customer.status === $scope.filters.selectedStatus;

                    return matchesSearch && matchesCity && matchesStatus;
                })
                .sort((a, b) => {
                    // Always sort by ID first to maintain consistent order
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;

                    // Apply user-selected sorting
                    var aValue = a[$scope.sortField];
                    var bValue = b[$scope.sortField];
                    if (typeof aValue === 'string') {
                        aValue = aValue.toLowerCase();
                        bValue = bValue.toLowerCase();
                    }
                    return $scope.sortReverse ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
                });
        };

        // Get paginated customers
        $scope.getPaginatedCustomers = function () {
            var filtered = $scope.getFilteredCustomers();

            // Update total for pagination
            $scope.totalItems = filtered.length;

            // Get page slice
            var startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
            return filtered.slice(startIndex, startIndex + $scope.itemsPerPage);
        };

        // Sort function
        $scope.sortBy = function (field) {
            if ($scope.sortField === field) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortField = field;
                $scope.sortReverse = false;
            }
        };

        // Edit customer
        $scope.editCustomer = function (customer) {
            $scope.editingCustomer = angular.copy(customer);
            $scope.isEditing = true;
        };

        // Save edited customer
        $scope.saveCustomer = function () {
            if ($scope.editingCustomer) {
                var index = $scope.customers.findIndex(c => c.id === $scope.editingCustomer.id);
                if (index !== -1) {
                    $scope.customers[index] = angular.copy($scope.editingCustomer);
                    saveCustomers(); // Save to localStorage
                }
                $scope.isEditing = false;
                $scope.editingCustomer = null;
            }
        };

        // Delete customer with confirmation
        $scope.deleteCustomer = function (customer) {
            if (confirm('Are you sure you want to delete ' + customer.name + '?')) {
                var index = $scope.customers.findIndex(c => c.id === customer.id);
                if (index !== -1) {
                    $scope.customers.splice(index, 1);
                    $scope.totalItems = $scope.customers.length;
                    saveCustomers(); // Save to localStorage
                }
            }
        };

        // Add new customer
        $scope.addCustomer = function (newCustomer) {
            if (newCustomer && newCustomer.name && newCustomer.email && newCustomer.city) {
                // Find the highest existing ID and increment by 1
                const maxId = Math.max(...$scope.customers.map(c => c.id), 0);
                const nextId = maxId + 1;

                const customerToAdd = {
                    ...newCustomer,
                    id: nextId,
                    registrationDate: new Date(),
                    status: 'active'
                };

                $scope.customers.push(customerToAdd);
                saveCustomers(); // Save to localStorage

                $scope.newCustomer = {};
                $scope.totalItems = $scope.customers.length;

                // If adding a new customer would create a new page, go to that page
                const totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                $scope.currentPage = totalPages;
            } else {
                alert('Please fill out all fields!');
            }
        };
        
        // Function to get the badge class based on the status
        $scope.getStatusBadgeClass = function(status) {
            return {
                'bg-success': status === 'active',
                'bg-secondary': status === 'inactive',
                'bg-warning': status === 'pending'
            };
        };

        // Function to get the icon class based on the status
        $scope.getStatusIconClass = function(status) {
            return {
                'active': 'bi-check-circle',
                'inactive': 'bi-x-circle',
                'pending': 'bi-hourglass-split'
            }[status] || 'bi-question-circle'; // default icon for unknown status
        };

    }]);