myApp.controller('ViewSuccessLogCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal, $state) {
    $scope.template = TemplateService.getHTML("content/view-success-log.html");
    TemplateService.title = "Success Log"; //This is the Title of the Website
    TemplateService.class = "Success Log"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    $scope.noData = true;
    $scope.log_id = $stateParams.log_id;

})