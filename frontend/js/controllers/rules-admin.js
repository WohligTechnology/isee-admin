myApp.controller('RulesAdminCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/rules-admin.html");
    TemplateService.title = "rules Admin"; //This is the Title of the Website
    TemplateService.class = "rules-admin"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();

    $scope.subnav = [{
            name: "Setup Rules",
            classis: "active",
            anchor: "drl-rule",
            icon: "fa-cog"
        }, {
            name: "What-if-Analysis",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Rules Report",
            classis: "active",
            anchor: "view-rules",
            icon: "fa-cog"
        },
        {
            name: "Transaction",
            classis: "active",
            anchor: "rules-admin-transaction",
            icon: "fa-cog"
        }
    ]
})