angular.module('customerApp')
.service('CustomerService', function() {
    var service = this;
    
    // Private storage for customers
    var customers = [];

    // Method to set customers
    service.setCustomers = function(newCustomers) {
        customers = newCustomers || [];
    };

    // Method to get customers
    service.getCustomers = function() {
        return customers;
    };

    // Method to update customers
    service.updateCustomers = function(updatedCustomers) {
        customers = updatedCustomers || [];
    };

    // Additional utility methods
    service.addCustomer = function(customer) {
        customers.push(customer);
    };

    service.removeCustomer = function(customerId) {
        customers = customers.filter(function(c) {
            return c.id !== customerId;
        });
    };
});