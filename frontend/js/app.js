// Link all the JS Docs here
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap',
    'ui.select',
    'imageupload',
    'angular-flexslider',
    'ui.swiper',
    'highcharts-ng',
    'toastr'
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
        .state('drl-rule', {
            url: "/drl-rule",
            templateUrl: tempateURL,
            controller: 'AuthorRuleCtrl'
        })
        .state('es-rule', {
            url: "/es-rule",
            templateUrl: tempateURL,
            controller: 'EsRuleCtrl'
        })
        .state('assignment-list', {
            url: "/assignment-list",
            templateUrl: tempateURL,
            controller: 'AssignmentListCtrl'
        })
        .state('transition', {
            url: "/transition",
            templateUrl: tempateURL,
            controller: 'TransitionCtrl'
        })
        .state('customer-detail', {
            url: "/customer-detail",
            templateUrl: tempateURL,
            controller: 'CustomerDetailCtrl'
        })
        .state('view-rules', {
            url: "/view-rules",
            templateUrl: tempateURL,
            controller: 'ViewRulesCtrl'
        })
        .state('view-rules-detail', {
            url: "/view-rules-detail/:ruleId",
            templateUrl: tempateURL,
            controller: 'ViewRulesDetailCtrl'
        })
        .state('violatedRules', {
            url: "/violatedRules/:ruleId",
            templateUrl: tempateURL,
            controller: 'violatedRulesCtrl'
        })
        .state('coming-soon', {
            url: "/coming-soon",
            templateUrl: tempateURL,
            controller: 'ComingSoonCtrl'
        })

        .state('view-customer-note', {
            url: "/view-customer-note",
            templateUrl: tempateURL,
            controller: 'ViewCustomerNoteCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

// For Language JS
myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});