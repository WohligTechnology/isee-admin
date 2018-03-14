 myApp.controller('ViewRulesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
     $scope.template = TemplateService.getHTML("content/view-rules.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();
     $scope.executeDisabled = false;



     //  $scope.currentPage = 1;
     $scope.isexec = false;

     $scope.changeexec = function () {
         $scope.isexec = true;
     }


     //enable disable  button 
     $scope.enablesub = false;
     $scope.changeenable = function () {
         $scope.enablesub = !$scope.enablesub;
     }
     //Json Tables
     $scope.whatClassIsIt = function (c) {
         if (c == "Completed") {
             return "label label-success";
         } else if (c == "Pending") {
             return "label label-danger";
         } else if (c == "Processing") {
             return "label label-warning";
         }
     }

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
                 }
             });

     };
     //  JsonService.refreshView = $scope.getAllItems;
     $scope.getAllItems();


     //executing rule
     $scope.executeRule = function (formdata) {
         NavigationService.apiCall("RuleEngine/execute", formdata, function (data) {
             if (data.value == true) {
                 // $scope.allFields = data.data;
                 //  console.log("data-------    ", data);
                 $scope.executeDisabled = true;
             } else {
                 toastr.error("Rule Not Saved");
             }
         });
     };

     //change substatus

     $scope.changeSubStatus = function (data, name) {
         var changeData = {};
         changeData._id = data;
         changeData.subStatus = name;
         NavigationService.apiCall("RuleEngine/save", changeData, function (data) {
             if (data.value == true) {
                 $state.reload();
             }
         });
     }

     var updateStatusSocket = function (data) {
         console.log("abc", data);

         $scope.getAllItems();
     }
     io.socket.on("updateStatus", updateStatusSocket);
 })