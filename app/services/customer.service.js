angular
    .module('customerApp')
    .factory('CustomerService', function() {
        // Shared customer data and methods
        const service = {
            customers: [
                // Example customers; this will dynamically update when new customers are added
                { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York', status: 'active', registrationDate: new Date('2024-01-15') },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles', status: 'active', registrationDate: new Date('2024-01-16') },
                { id: 3, name: 'Sam Wilson', email: 'sam@example.com', city: 'Chicago', status: 'inactive', registrationDate: new Date('2024-01-17') },
                { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', city: 'New York', status: 'active', registrationDate: new Date('2024-01-18') },
                { id: 5, name: 'Ethan Green', email: 'ethan@example.com', city: 'Los Angeles', status: 'pending', registrationDate: new Date('2024-01-19') }
            ],

            // Add a new customer
            addCustomer: function(customer) {
                service.customers.push(customer);
            },

            // Get all customers
            getCustomers: function() {
                return service.customers;
            }
        };

        return service;
    });
