// app/shared/directives/charts/line-chart.directive.js
angular.module('customerApp').directive('lineChart', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: function(scope, element) {
            var canvas = document.createElement('canvas');
            element[0].appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var chart = null;

            function initChart(data) {
                if (chart) {
                    chart.destroy();
                }
                
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.map(item => item.month),
                        datasets: [{
                            label: 'Number of Customers',
                            data: data.map(item => item.customers),
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            scope.$watch('data', function(newData) {
                if (newData && newData.length > 0) {
                    initChart(newData);
                }
            }, true);
        }
    };
});

// app/shared/directives/charts/pie-chart.directive.js
angular.module('customerApp').directive('pieChart', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: function(scope, element) {
            var canvas = document.createElement('canvas');
            element[0].appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var chart = null;

            function initChart(data) {
                if (chart) {
                    chart.destroy();
                }

                chart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.map(item => item.name),
                        datasets: [{
                            data: data.map(item => item.value),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }

            scope.$watch('data', function(newData) {
                if (newData && newData.length > 0) {
                    initChart(newData);
                }
            }, true);
        }
    };
});