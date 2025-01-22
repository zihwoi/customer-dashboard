angular.module('customerApp')
    .controller('NotificationsController', ['$scope', 'NotificationService', 
    function($scope, NotificationService) {
        $scope.notifications = [];

        $scope.$on('newNotification', function(event, notification) {
            $scope.notifications.push(notification);
            // Auto-dismiss after 5 seconds
            setTimeout(function() {
                $scope.dismissNotification(notification.id);
                $scope.$apply();
            }, 5000);
        });

        $scope.dismissNotification = function(id) {
            $scope.notifications = $scope.notifications.filter(n => n.id !== id);
        };
    }]);