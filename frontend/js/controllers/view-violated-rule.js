myApp.controller('ViewViolatedCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal) {
    $scope.template = TemplateService.getHTML("content/view-violated-rule.html");
    TemplateService.title = "View Violated Rule"; //This is the Title of the Website
    TemplateService.class = "view-violated-rule"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    console.log($stateParams);
})