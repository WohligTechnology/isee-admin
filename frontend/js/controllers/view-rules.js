 myApp.controller('ViewRulesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
     $scope.template = TemplateService.getHTML("content/view-rules.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();
     //  $scope.currentPage = 1;
     $scope.isexec = false;
     $scope.changeexec = function () {
         $scope.isexec = true;
     }
     //Json Tables
     $scope.assignmentdata = [{
             _id: 'CTA-2017-04-26_40',
             to: 'Darsha Patel',
             entry: 'Legal Entry 1',
             actualSize: '8',
             currentSize: '8',
             expection: '8',
             outstanding: '0',
             assignmentDate: '05/02/17',
             lastPerfect: '05/02/17'
         },
         {
             _id: 'CTA-2017-04-24_40',
             to: 'Darsha Patel',
             entry: 'Legal Entry 2',
             actualSize: '8',
             currentSize: '8',
             expection: '5',
             outstanding: '3',
             assignmentDate: '05/02/17',
             lastPerfect: '05/02/17'
         },
         {
             _id: 'CTA-2017-04-26_40',
             to: 'Darsha Patel',
             entry: 'Legal Entry 3',
             actualSize: '8',
             currentSize: '8',
             expection: '6',
             outstanding: '2',
             assignmentDate: '05/02/17',
             lastPerfect: '05/02/17'
         }
     ];

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
         var goTo = "view-rules";
         $scope.currentPage = page;
         if ($scope.search.keyword) {
             goTo = "view-rules";
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
         NavigationService.searchCall("RuleEngine/search", {
                 page: $scope.currentPage,
                 keyword: $scope.search.keyword
             }, ++i,
             function (data, ini) {
                 //  console.log("Data: ", data);
                 if (ini == i) {
                     $scope.allRules = data.data.results;
                     $scope.totalItems = data.data.total;
                     $scope.maxRow = data.data.options.count;
                     console.log($scope.allRules);
                 }
             });

     };
     //  JsonService.refreshView = $scope.getAllItems;
     $scope.getAllItems();
 })