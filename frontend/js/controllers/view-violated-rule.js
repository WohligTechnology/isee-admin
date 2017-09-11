myApp.controller('ViewViolatedCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal) {
    $scope.template = TemplateService.getHTML("content/view-violated-rule.html");
    TemplateService.title = "View Violated Rule"; //This is the Title of the Website
    TemplateService.class = "view-violated-rule"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    console.log($stateParams);


    var getTransactionData = {};
    getTransactionData.id = $stateParams.id;
    console.log("--------getTransactionData-----", getTransactionData);

    NavigationService.apiCall("Transaction/getViolatedTransaction", getTransactionData, function (data) {
        if (data.value == true) {
            console.log("-------------", data);
            // $scope.eData = data.data;
        } else {
            toastr.error('No History');
        }
    });

})