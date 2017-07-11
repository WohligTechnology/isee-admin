// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    // 'ngAnimate',
    // 'ngSanitize',
    'angular-flexslider',
    'ui.swiper',
    'highcharts-ng'
]);

// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('corporate', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'CorporateCtrl'
        })
         .state('user', {
            url: "/user",
            templateUrl: tempateURL,
            controller: 'UserCtrl'
        })
        .state('store', {
            url: "/store",
            templateUrl: tempateURL,
            controller: 'StoreCtrl'
        })

        .state('widget', {
            url: "/widget",
            templateUrl: tempateURL,
            controller: 'WidgetCtrl'
        })
         .state('rules', {
            url: "/rules",
            templateUrl: tempateURL,
            controller: 'RulesCtrl'
        })
                 .state('login', {
            url: "/login",
            templateUrl: tempateURL,
            controller: 'LoginCtrl'
        })
        ;
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});