myApp.controller('ReportsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/reports.html");
    TemplateService.title = "Reports"; //This is the Title of the Website
    TemplateService.class = "reports"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();

    $scope.subnav = [{
        name: "Corporate Overview",
        classis: "active",
        anchor: "corporate",
        icon: "fa-cog"
    }, {
        name: "Cash Short",
        classis: "active",
        anchor: "cash-short",
        icon: "fa-cog"
    }, {
        name: "Map – Sales",
        classis: "active",
        anchor: "map-sales",
        icon: "fa-cog"
    }, {
        name: "Map – Cash Short",
        classis: "active",
        anchor: "map-cash-short",
        icon: "fa-cog"
    }, {
        name: "Transactions Report",
        classis: "active",
        anchor: "transaction-report",
        icon: "fa-cog"
    }, {
        name: "Till Register",
        classis: "active",
        anchor: "till-register",
        icon: "fa-cog"
    }]
})