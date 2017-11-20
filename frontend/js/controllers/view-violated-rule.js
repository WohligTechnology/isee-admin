myApp.controller('ViewViolatedCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal) {
    $scope.template = TemplateService.getHTML("content/view-violated-rule.html");
    TemplateService.title = "View Violated Rule"; //This is the Title of the Website
    TemplateService.class = "view-violated-rule"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();

    $scope.prevroute = $.jStorage.get("prev_page");
    console.log($.jStorage.get("prev_page"));
    var getTransactionData = {};
    getTransactionData.id = $stateParams.id;
    NavigationService.apiCall("Transaction/getViolatedTransaction", getTransactionData, function (data) {
        if (data.value == true) {
            $scope.violationResult = data.data;
        } else {
            toastr.error('No History');
        }
    });

})