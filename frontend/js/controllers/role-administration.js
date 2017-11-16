myApp.controller('RoleAdminCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/role-admin.html");
    TemplateService.title = ""; //This is the Title of the Website
    TemplateService.class = "profile"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();


})