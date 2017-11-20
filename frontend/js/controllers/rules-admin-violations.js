myApp.controller('RulesAdminViolationsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
    $scope.template = TemplateService.getHTML("content/rules-admin-violations.html");
    TemplateService.title = ""; //This is the Title of the Website
    TemplateService.class = "rules-admin-violations"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();

    //to keep track of prev page 
    $.jStorage.set("prev_page", "rules-admin-violations");
    //pagination

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
        var goTo = "rules-admin-transaction";
        $scope.currentPage = page;
        if ($scope.search.keyword) {
            goTo = "rules-admin-transaction";
        }
        $state.go(goTo, {
            page: page
        });
        $scope.getAllItems();
    };

    $scope.getAllItems = function (keywordChange) {
        $scope.totalItems = undefined;
        if (keywordChange) {}
        NavigationService.searchCall("Transaction/getRecordsByTransaction", {
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i,
            function (data, ini) {
                if (ini == i) {
                    $scope.transactionData = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });

    };
    //  JsonService.refreshView = $scope.getAllItems;
    $scope.getAllItems();


})