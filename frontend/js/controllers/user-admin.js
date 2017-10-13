myApp.controller('UserAdminCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/user-admin.html");
    TemplateService.title = ""; //This is the Title of the Website
    TemplateService.class = "useradmin"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    $scope.companylist = ["Company1", "Company2", "Company3"];
    $scope.rulelist = ["Data Manager", "Rules Admin", "Product Admin"];

})