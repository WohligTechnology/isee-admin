myApp.controller('ViewSuccessLogCtrl', function ($scope, TemplateService, NavigationService, $stateParams, $timeout, $uibModal, $state) {
    $scope.template = TemplateService.getHTML("content/view-success-log.html");
    TemplateService.title = "Success Log"; //This is the Title of the Website
    TemplateService.class = "Success Log"; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    $scope.noData = true;

    //pagination
    var totallogs = 0
    var i = 0;
    if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
        $scope.currentPage = $stateParams.page;
    } else {
        $scope.currentPage = 1;
    }

    $scope.search = {
        keyword: ""
    };
    if ($stateParams.keyword) {
        $scope.search.keyword = $stateParams.keyword;
    }
    $scope.changePage = function (page) {
        //  console.log("changePage: ", page);
        var goTo = "view-success-log";
        $scope.currentPage = page;
        if ($scope.search.keyword) {
            goTo = "view-success-log";
        }
        $state.go(goTo, {
            page: page
        });
        $scope.getAllItems();
    };

    $scope.getAllItems = function (keywordChange) {
        //  console.log("In getAllItems: ", keywordChange);
        $scope.totalItems = undefined;
        if (keywordChange) {}
        $scope.openLogdata = {};
        $scope.openLogdata._id = $stateParams.log_id;
        NavigationService.apiCall("AllLogs/singleSuccessLogHistoryCount", $scope.openLogdata, function (data) {
            if (data.value == true) {
                totallogs = data.data[0].logs;
                NavigationService.searchCall("AllLogs/singleSuccessLogHistory", {
                    pageNo: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    _id: $stateParams.log_id
                }, ++i,
                function (data, ini) {
                    if (ini == i) {
                        $scope.noData = false;
                        $scope.successLog = data.data;
                        $scope.totalItems = totallogs;
                        $scope.maxRow = 10;
                    }
                });
            }
        });
    };
    //  JsonService.refreshView = $scope.getAllItems;
    $scope.getAllItems();
})