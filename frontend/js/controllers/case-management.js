myApp.controller('CaseManagementCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/case-management.html");
    TemplateService.title = "Case Management"; //This is the Title of the Website
    TemplateService.class = "case-management"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();
})