 myApp.controller('violatedRulesCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
     $scope.template = TemplateService.getHTML("content/violatedRules.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();



     $scope.getRuleData = {};
     $scope.getRuleData._id = $stateParams.ruleId;
     $scope.singleRuleData = {};
     NavigationService.apiCall("RuleEngine/getOne", $scope.getRuleData, function (data) {
         if (data.value == true) {
             $scope.singleRuleData = data.data;
             $scope.getRuleData = {};
             $scope.getRuleData.id = $stateParams.ruleId;
             $scope.violatedRule = [];
             NavigationService.apiCall("DemoTransaction/rulesDemo", $scope.getRuleData, function (data) {
                 if (data.value == true) {
                     $scope.violatedRuleData = data.data;
                     _.forEach($scope.violatedRuleData, function (n) {
                         if (!_.isEmpty(n.result) && n.result.length == $scope.singleRuleData.rule.length) {
                             $scope.violatedRule.push(n);
                         }
                     });
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

 })