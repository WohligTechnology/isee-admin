myApp.controller('ProductAdminCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/product-admin.html");
    TemplateService.title = "Product Admin"; //This is the Title of the Website
    TemplateService.class = "product"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();

    $scope.subnav = [{
            name: "Setup Company",
            anchor: "customer-detail"
        },
        {
            name: "License Manager",
            anchor: "coming-soon"
        },
        {
            name: "User Admin",
            anchor: "user-admin"
        },
        {
            name: "Roles Administration",
            anchor: "role-administration"
        }
    ]
})