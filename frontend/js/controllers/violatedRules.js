 myApp.controller('violatedRulesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
     $scope.template = TemplateService.getHTML("content/violatedRules.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();



     $scope.getRuleData = {};
     $scope.getRuleData._id = $stateParams.ruleId;
     $scope.singleRuleData = {};
     TemplateService.getLoader();
     NavigationService.apiCall("RuleEngine/getOne", $scope.getRuleData, function (data) {
         if (data.value == true) {
             //  console.log("data", data);
             $scope.singleRuleData = data.data;
             $scope.getRuleData = {};
             $scope.getRuleData.id = $stateParams.ruleId;
             $scope.violatedRule = [];
             NavigationService.apiCall("DemoTransaction/rulesDemo", $scope.getRuleData, function (data) {
                 if (data.value == true) {
                     TemplateService.removeLoader();
                     $scope.violatedRuleData = data.data;
                     //  console.log(" $scope.violatedRuleData", $scope.violatedRuleData.length);
                     //  console.log(" $scope.violatedRuleData", $scope.singleRuleData.rule.length);
                     //  if ($scope.violatedRuleData.length == $scope.singleRuleData.rule.length) {
                     //      console.log("violatedRule-----", $scope.violatedRuleData);
                     //  }
                     //  _.forEach($scope.violatedRuleData, function (n) {
                     //      console.log("1111111", n.matchPath);
                     //      //  if (!_.isEmpty(n.result) && n.result.length == $scope.singleRuleData.rule.length) {
                     //      //      $scope.violatedRule.push(n);
                     //      //      console.log("violatedRule-----", $scope.violatedRule);
                     //      //  }
                     //  });
                 }
             });
         }
     });



     //  $scope.getRuleData = {};
     //  $scope.getRuleData.id = $stateParams.ruleId;
     //  $scope.violatedRule = [];
     //  NavigationService.apiCall("DemoTransaction/rulesDemo", $scope.getRuleData, function (data) {
     //      if (data.value == true) {
     //          $scope.violatedRuleData = data.data;
     //          _.forEach($scope.violatedRuleData, function (n) {
     //              if (!_.isEmpty(n.result)) {
     //                  $scope.violatedRule.push(n);
     //              }
     //          });
     //      }
     //  });

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

 })