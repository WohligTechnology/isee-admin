myApp.controller('AssignBranchCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/assign-branch.html");
    TemplateService.title = ""; //This is the Title of the Website
    TemplateService.class = "assignbranch"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();


})