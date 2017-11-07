myApp.controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/dashboard.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        // TemplateService.templateTitle = "Dashboard"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })

    .controller('CashShortCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/cash-short.html");
        TemplateService.title = "Cash Short"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = ""; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })

    .controller('MapSalesCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/map-sales.html");
        TemplateService.title = "Map – Sales"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = ""; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
    .controller('MapCashShortCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/map-cash-short.html");
        TemplateService.title = "Map – Cash Short"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = ""; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
    .controller('TransactionsReportCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/transaction-report.html");
        TemplateService.title = "Transactions Report"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = ""; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
    .controller('TillRegisterdCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/till-register.html");
        TemplateService.title = "Till Registerd"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = ""; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
    .controller('CorporateCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/corporate.html");
        TemplateService.title = "Corporate"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = ""; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })

    //Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });