// app/app.module.js
angular.module('customerApp', ['ngRoute'])
    .config(['$compileProvider', function($compileProvider) {
        // Optional: Enable debug info
        $compileProvider.debugInfoEnabled(true);
    }]);