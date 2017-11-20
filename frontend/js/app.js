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
    'toastr',

]);
// 'ngFileUpload',
// Define all the routes below
myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    var tempateURL = "views/template/template.html"; //Default Template URL

    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('dashboard', {
            url: "/",
            templateUrl: tempateURL,
            controller: 'DashboardCtrl'
        })
        .state('corporate', {
            url: "/corporate",
            templateUrl: tempateURL,
            controller: 'CorporateCtrl'
        })
        .state('cash-short', {
            url: "/cash-short",
            templateUrl: tempateURL,
            controller: 'CashShortCtrl'
        })
        .state('map-sales', {
            url: "/map-sale",
            templateUrl: tempateURL,
            controller: 'MapSalesCtrl'
        })
        .state('map-cash-short', {
            url: "/map-cash-short",
            templateUrl: tempateURL,
            controller: 'MapCashShortCtrl'
        })
        .state('transaction-report', {
            url: "/transaction-report",
            templateUrl: tempateURL,
            controller: 'TransactionsReportCtrl'
        })
        .state('till-register', {
            url: "/till-register",
            templateUrl: tempateURL,
            controller: 'TillRegisterdCtrl'
        })
        .state("predictive-dashboard", {
            url: "/predictive-dashboard",
            templateUrl: tempateURL,
            controller: 'PredictiveDashCtrl'
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
            url: "/drl-rule/:ruleId",
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
            url: "/setup-company",
            templateUrl: tempateURL,
            controller: 'CustomerDetailCtrl'
        })
        .state('view-rules', {
            url: "/view-rules/{page:.*}",
            templateUrl: tempateURL,
            controller: 'ViewRulesCtrl'
        })
        .state('view-rules-detail', {
            url: "/view-rules-detail/:ruleId",
            templateUrl: tempateURL,
            controller: 'ViewRulesDetailCtrl'
        })
        .state('violatedRules', {
            url: "/violatedRules/:ruleId/{page:.*}",
            templateUrl: tempateURL,
            controller: 'violatedRulesCtrl'
        })
        .state('coming-soon', {
            url: "/coming-soon",
            templateUrl: tempateURL,
            controller: 'ComingSoonCtrl'
        })
        .state('error-log', {
            url: "/error-log/:error_id",
            templateUrl: tempateURL,
            controller: 'ErrorLogCtrl'
        })
        .state('view-violated-rule', {
            url: "/view-violated-rule/:id",
            templateUrl: tempateURL,
            controller: "ViewViolatedCtrl"
        })
        .state('view-customer-note', {
            url: "/view-customer-note",
            templateUrl: tempateURL,
            controller: 'ViewCustomerNoteCtrl'
        })
        .state('terms-condition', {
            url: "/terms-and-condition",
            templateUrl: tempateURL,
            controller: 'TermsAndConditionCtrl'
        })
        .state('user-admin', {
            url: "/user-admin",
            templateUrl: tempateURL,
            controller: 'UserAdminCtrl'
        })
        .state('assign-branch', {
            url: "/assign-branch",
            templateUrl: tempateURL,
            controller: 'AssignBranchCtrl'
        })
        .state('profile', {
            url: "/profile",
            templateUrl: tempateURL,
            controller: 'ProfileCtrl'
        })
        .state('role-administration', {
            url: "/role-administration",
            templateUrl: tempateURL,
            controller: 'RoleAdminCtrl'
        })
        .state('product-admin', {
            url: "/product-admin",
            templateUrl: tempateURL,
            controller: 'ProductAdminCtrl'
        })
        .state('rules-admin-violations', {
            url: "/rules-admin-violations",
            templateUrl: tempateURL,
            controller: 'RulesAdminViolationsCtrl'
        })
        .state('view-log', {
            url: "/view-log/:log_id",
            templateUrl: tempateURL,
            controller: 'ViewLogCtrl'
        })
        .state('view-success-log', {
            url: "/view-success-log/:log_id",
            templateUrl: tempateURL,
            controller: 'ViewSuccessLogCtrl'
        })
        .state('company-admin', {
            url: "/company-admin",
            templateUrl: tempateURL,
            controller: 'CompanyAdminCtrl'
        })
        .state('rules-admin', {
            url: "/rules-admin",
            templateUrl: tempateURL,
            controller: 'RulesAdminCtrl'
        })
        .state('reports', {
            url: "/reports",
            templateUrl: tempateURL,
            controller: 'ReportsCtrl'
        })
        .state('license-manager', {
            url: "/license-manager",
            templateUrl: tempateURL,
            controller: 'LicenseCtrl'
        })
        .state('setup-user', {
            url: "/setup-user",
            templateUrl: tempateURL,
            controller: 'SetupUserCtrl'
        })
        .state('branch-setup', {
            url: "/branch-setup",
            templateUrl: tempateURL,
            controller: 'BranchSetupCtrl'
        })
        .state('what-if-analysis', {
            url: "/what-if-analysis",
            templateUrl: tempateURL,
            controller: 'WhatIfAnalysisCtrl'
        })
        .state('case-management', {
            url: "/case-management",
            templateUrl: tempateURL,
            controller: 'CaseManagementCtrl'
        })
        .state('help', {
            url: "/help",
            templateUrl: tempateURL,
            controller: 'HelpCtrl'
        })
        .state('company-role-administration', {
            url: "/company-role-administration",
            templateUrl: tempateURL,
            controller: 'CompanyRoleAdminCtrl'
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