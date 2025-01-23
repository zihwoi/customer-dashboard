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
 