myApp.controller('CompanyAdminCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal, $state) {
    $scope.template = TemplateService.getHTML("content/company-admin.html");
    TemplateService.title = "Company Admin"; //This is the Title of the Website
    TemplateService.class = "company-admin"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    $scope.subnav = [{
            name: "Setup User",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        },
        {
            name: "Role Administration",
            classis: "active",
            anchor: "role-administration",
            icon: "fa-cog"
        }, {
            name: "Store/Branch Setup",
            classis: "active",
            anchor: "customer-detail",
            icon: "fa-cog"
        }
    ]

})