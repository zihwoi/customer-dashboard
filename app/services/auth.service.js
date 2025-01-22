/* // auth.service.js
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
    }); */