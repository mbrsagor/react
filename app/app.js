var app = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'toastr'
]);


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        'use strict';


        // html5 mode enable
        $locationProvider.html5Mode(true);


        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'views/login/login.html',
                controller: 'loginController',
                requiresAuthentication: false
            })
            .state('app', {
                url: '/base',
                templateUrl: 'views/base/base.html',
                controller: 'BaseController'
            })

    }]);

app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});