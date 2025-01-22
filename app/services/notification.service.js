// app/services/notification.service.js
angular.module('customerApp')
    .service('NotificationService', ['$rootScope', function($rootScope) {
        // Store notifications in an array
        var notifications = [];
        
        return {
            // Add a new notification
            add: function(message, type) {
                // Default type is 'info' if not specified
                type = type || 'info';
                
                // Create notification object
                var notification = {
                    id: Date.now(), // Unique ID using timestamp
                    message: message,
                    type: type,     // 'success', 'error', 'warning', 'info'
                    timestamp: new Date()
                };
                
                // Add to notifications array
                notifications.push(notification);
                
                // Broadcast event so controllers can update
                $rootScope.$broadcast('newNotification', notification);
                
                // Auto-remove after 5 seconds
                setTimeout(function() {
                    this.remove(notification.id);
                    // Trigger digest cycle to update view
                    $rootScope.$apply();
                }.bind(this), 5000);
            },
            
            // Remove a notification by ID
            remove: function(id) {
                notifications = notifications.filter(function(notification) {
                    return notification.id !== id;
                });
                $rootScope.$broadcast('notificationsUpdated', notifications);
            },
            
            // Get all current notifications
            getAll: function() {
                return notifications;
            },
            
            // Clear all notifications
            clear: function() {
                notifications = [];
                $rootScope.$broadcast('notificationsUpdated', notifications);
            }
        };
    }]);

    