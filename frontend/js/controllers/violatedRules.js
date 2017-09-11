 myApp.controller('violatedRulesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
     $scope.template = TemplateService.getHTML("content/violatedRules.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();

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
         var goTo = "violatedRules";
         $scope.currentPage = page;
         if ($scope.search.keyword) {
             goTo = "violatedRules";
         }
         $state.go(goTo, {
             page: page
         });
         $scope.getAllItems();
     };

     $scope.getAllItems = function (keywordChange) {
         $scope.totalItems = undefined;
         if (keywordChange) {}
         NavigationService.searchCall("Transaction/getViolationsForARule", {
                 page: $scope.currentPage,
                 keyword: $scope.search.keyword,
                 ruleId: $stateParams.ruleId
             }, ++i,
             function (data, ini) {
                 if (ini == i) {
                     $scope.violationData = data.data.results;
                     $scope.totalItems = data.data.total;
                     $scope.maxRow = data.data.options.count;
                 }
             });

     };
     //  JsonService.refreshView = $scope.getAllItems;
     $scope.getAllItems();

 })