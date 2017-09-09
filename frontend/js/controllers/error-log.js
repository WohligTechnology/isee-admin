myApp.controller('ErrorLogCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal) {
    $scope.template = TemplateService.getHTML("content/error-log.html");
    TemplateService.title = "Error Log"; //This is the Title of the Website
    TemplateService.class = "error-log"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    $scope.noData = true;
    $scope.openLogdata = {};
    $scope.openLogdata._id = $stateParams.error_id;
    NavigationService.apiCall("AllLogs/singleLogHistory", $scope.openLogdata, function (data) {
        if (data.value == true) {
            $scope.logInsideData = data.data.logs;
            _.forEach($scope.logInsideData, function (value, key) {
                value.rowNo = key;
                if (value.error) {
                    $scope.noData = false;
                }
            });
        }
    });
})