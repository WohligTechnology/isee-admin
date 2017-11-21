myApp.controller('BranchSetupCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/coming-soon.html");
    TemplateService.title = "Branch Setup"; //This is the Title of the Website
    TemplateService.class = "branchsetup"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();


})