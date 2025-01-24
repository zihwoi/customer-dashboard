angular
    .module('customerApp')
    .controller('CustomerController', ['$scope', 'CustomerService', function ($scope, CustomerService) {

        var storedCustomers = localStorage.getItem('customers');

        // Data: Customer List
        $scope.customers = storedCustomers ? JSON.parse(storedCustomers) : [
            { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York', status: 'active', registrationDate: new Date('2024-01-15') },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles', status: 'active', registrationDate: new Date('2024-01-16') },
            { id: 3, name: 'Sam Wilson', email: 'sam@example.com', city: 'Chicago', status: 'inactive', registrationDate: new Date('2024-01-17') },
            { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', city: 'New York', status: 'active', registrationDate: new Date('2024-01-18') },
            { id: 5, name: 'Ethan Green', email: 'ethan@example.com', city: 'Los Angeles', status: 'pending', registrationDate: new Date('2024-01-19') }
        ];

        // Update CustomerService with initial customers
        CustomerService.setCustomers($scope.customers);

        // Convert stored dates back to Date objects
        $scope.customers.forEach(customer => {
            customer.registrationDate = new Date(customer.registrationDate);
        });

        // Function to save customers to localStorage
        function saveCustomers() {
            localStorage.setItem('customers', JSON.stringify($scope.customers));
            CustomerService.updateCustomers($scope.customers);
        }

        $scope.validateEmail = function (email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };

        $scope.formatPhoneNumber = function (phone) {
            // Assuming US phone format
            return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        };

        // Pagination
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.totalItems = $scope.customers.length;

        $scope.getPageNumbers = function() {
            var pages = [];
            var totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            
            // Show first few pages, current page, and last few pages
            var startPage = Math.max(1, $scope.currentPage - 2);
            var endPage = Math.min(totalPages, $scope.currentPage + 2);
            
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push('...');
            }
            
            for (var i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pages.push('...');
                pages.push(totalPages);
            }
            
            return pages;
        };

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
                .filter(customer => {
                    var matchesSearch = !$scope.filters.searchQuery ||
                        ['name', 'email', 'city'].some(field =>
                            customer[field].toLowerCase().includes($scope.filters.searchQuery.toLowerCase())
                        );
                    var matchesCity = !$scope.filters.selectedCity || customer.city === $scope.filters.selectedCity;
                    var matchesStatus = !$scope.filters.selectedStatus || customer.status === $scope.filters.selectedStatus;

                    return matchesSearch && matchesCity && matchesStatus;
                })
                .sort((a, b) => {
                    if (a.id !== b.id) return a.id - b.id;
                    const [aValue, bValue] = [a[$scope.sortField], b[$scope.sortField]];

                    // Handle different types of values
                    if (aValue instanceof Date) {
                        return $scope.sortReverse ? bValue - aValue : aValue - bValue;
                    }
                    if (typeof aValue === 'number') {
                        return $scope.sortReverse ? bValue - aValue : aValue - bValue;
                    }
                    return $scope.sortReverse ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
                });
        };

        // Get paginated customers
        $scope.getPaginatedCustomers = function () {
            var filtered = $scope.getFilteredCustomers();

            // Update total for pagination
            $scope.totalItems = filtered.length;

            // Calculate total pages
            $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

            // Ensure current page is within valid range
            $scope.currentPage = Math.max(1, Math.min($scope.currentPage, $scope.totalPages));

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
                    logCustomerActivity('edit', $scope.editingCustomer.id, 'Customer updated');
                }
                $scope.isEditing = false;
                $scope.editingCustomer = null;
            }
        };

        // Add new customer
        $scope.addCustomer = function (newCustomer) {
            if (!$scope.validateEmail(newCustomer.email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (newCustomer && newCustomer.name && newCustomer.email && newCustomer.city) {
                const nextId = $scope.customers.length > 0
                    ? Math.max(...$scope.customers.map(c => c.id)) + 1
                    : 1;

                const customerToAdd = {
                    ...newCustomer,
                    id: nextId,
                    registrationDate: new Date(),
                    status: 'active'
                };

                $scope.customers.push(customerToAdd);
                saveCustomers(); // This now updates both localStorage and CustomerService
            } else {
                alert('Please fill out all fields!');
            }
        };

        // Delete customer with confirmation
        $scope.deleteCustomer = function (customer) {
            if (confirm('Are you sure you want to delete ' + customer.name + '?')) {
                $scope.customers = $scope.customers.filter(c => c.id !== customer.id);
                saveCustomers(); // This now updates both localStorage and CustomerService
            }
        };

        // Updated bulkDelete method with enhanced error handling and logging
        $scope.bulkDelete = function () {
            // Check if any customers are selected
            if ($scope.selectedCustomers.length === 0) {
                alert('Please select customers to delete');
                return;
            }

            // Confirm deletion with user
            if (confirm('Are you sure you want to delete ' + $scope.selectedCustomers.length + ' customers?')) {
                // Log the bulk delete action
                logCustomerActivity('bulk_delete', null, `Deleting ${$scope.selectedCustomers.length} customers`);

                // Filter out selected customers
                const initialCount = $scope.customers.length;
                $scope.customers = $scope.customers.filter(c => !$scope.selectedCustomers.includes(c.id));

                // Verify deletion
                const deletedCount = initialCount - $scope.customers.length;

                // Save changes and reset selection
                saveCustomers();
                $scope.selectedCustomers = [];
                $scope.selectAll = false;

                // Provide feedback about deletion
                alert(`Successfully deleted ${deletedCount} customers`);
            }
        };

        // Updated bulkUpdateStatus method with enhanced error handling and logging
        $scope.bulkUpdateStatus = function (newStatus) {
            // Validate status input
            if (!$scope.statuses.includes(newStatus)) {
                alert('Invalid status selected');
                return;
            }

            // Check if any customers are selected
            if ($scope.selectedCustomers.length === 0) {
                alert('Please select customers to update');
                return;
            }

            // Confirm status update with user
            if (confirm(`Are you sure you want to update status to '${newStatus}' for ${$scope.selectedCustomers.length} customers?`)) {
                // Log the bulk status update action
                logCustomerActivity('bulk_status_update', null, `Updating ${$scope.selectedCustomers.length} customers to ${newStatus} status`);

                // Track the number of customers updated
                let updatedCount = 0;

                // Update status for selected customers
                $scope.customers = $scope.customers.map(customer => {
                    if ($scope.selectedCustomers.includes(customer.id)) {
                        updatedCount++;
                        return { ...customer, status: newStatus };
                    }
                    return customer;
                });

                // Save changes and reset selection
                saveCustomers();
                $scope.selectedCustomers = [];
                $scope.selectAll = false;

                // Provide feedback about status update
                alert(`Successfully updated status for ${updatedCount} customers`);
            }
        };

        // Enhance updateSelection method with additional validation
        $scope.updateSelection = function (customer) {
            // Validate customer input
            if (!customer || !customer.id) {
                console.error('Invalid customer object');
                return;
            }

            // Find the index of the customer in selected customers
            const index = $scope.selectedCustomers.indexOf(customer.id);

            // Toggle selection
            if (index > -1) {
                // Remove customer from selection
                $scope.selectedCustomers.splice(index, 1);
            } else {
                // Add customer to selection
                $scope.selectedCustomers.push(customer.id);
            }

            // Update select all status based on filtered customers
            const filteredCustomers = $scope.getFilteredCustomers();
            $scope.selectAll = $scope.selectedCustomers.length === filteredCustomers.length;

            // Optional: Log selection changes for detailed tracking
            logCustomerActivity('selection_update', customer.id,
                `Customer ${customer.id} ${index > -1 ? 'deselected' : 'selected'}`
            );
        };

        // Optional: Add a method to reset selection
        $scope.resetSelection = function () {
            $scope.selectedCustomers = [];
            $scope.selectAll = false;

            // Log selection reset
            logCustomerActivity('selection_reset', null, 'Selection cleared');
        };

        // Add these functions
        $scope.toggleSelectAll = function () {
            $scope.selectedCustomers = $scope.selectAll ?
                angular.copy($scope.getFilteredCustomers().map(c => c.id)) : [];
        };

        // Function to get the badge class based on the status
        $scope.getStatusBadgeClass = function (status) {
            return {
                'bg-success': status === 'active',
                'bg-secondary': status === 'inactive',
                'bg-warning': status === 'pending'
            };
        };

        // Function to get the icon class based on the status
        $scope.getStatusIconClass = function (status) {
            return {
                'active': 'bi-check-circle',
                'inactive': 'bi-x-circle',
                'pending': 'bi-hourglass-split'
            }[status] || 'bi-question-circle'; // default icon for unknown status
        };

        $scope.getCustomerStats = function () {
            var stats = {
                totalCustomers: $scope.customers.length,
                activeCustomers: $scope.customers.filter(c => c.status === 'active').length,
                inactiveCustomers: $scope.customers.filter(c => c.status === 'inactive').length,
                pendingCustomers: $scope.customers.filter(c => c.status === 'pending').length,
                cityCounts: {},
                newCustomersThisMonth: 0
            };

            // Calculate city distribution
            $scope.customers.forEach(c => {
                stats.cityCounts[c.city] = (stats.cityCounts[c.city] || 0) + 1;
            });

            // Calculate new customers this month
            var thisMonth = new Date().getMonth();
            var thisYear = new Date().getFullYear();
            stats.newCustomersThisMonth = $scope.customers.filter(c => {
                var d = new Date(c.registrationDate);
                return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
            }).length;

            return stats;
        };

        // Add this to your controller
        function logCustomerActivity(action, customerId, details) {
            var logs = JSON.parse(localStorage.getItem('customerLogs') || '[]');
            logs.unshift({
                timestamp: new Date(),
                action: action,
                customerId: customerId,
                details: details
            });

            // Keep only the last 100 logs
            logs = logs.slice(0, 100);
            localStorage.setItem('customerLogs', JSON.stringify(logs));
        }

        function confirmAndExecute(message, callback) {
            if (confirm(message)) {
                callback();
            }
        }
        
        $scope.exportCustomers = function () {
            try {
                var filteredCustomers = $scope.getFilteredCustomers();
                if (filteredCustomers.length === 0) {
                    alert('No customers to export!');
                    return;
                }

                // Format data for Excel
                var excelData = filteredCustomers.map(customer => ({
                    ID: customer.id,
                    Name: customer.name,
                    Email: customer.email,
                    City: customer.city,
                    Status: customer.status,
                    'Registration Date': customer.registrationDate.toLocaleDateString()
                }));

                // Create worksheet
                var ws = XLSX.utils.json_to_sheet(excelData);

                // Create workbook and append worksheet
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Customers");

                // Save file
                XLSX.writeFile(wb, "customers_export_" + new Date().toISOString().slice(0, 10) + ".xlsx");

                console.log('Export completed successfully');
            } catch (error) {
                console.error('Error exporting:', error);
                alert('Error exporting customers. Please try again.');
            }
        };

    }]);