 myApp.controller('ViewRulesDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
     $scope.template = TemplateService.getHTML("content/view-rules-detail.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();

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

     $scope.getRuleData = {};
     $scope.getRuleData._id = $stateParams.ruleId;
     NavigationService.apiCall("RuleEngine/getOne", $scope.getRuleData, function (data) {
         if (data.value == true) {
             $scope.singleRuleData = data.data;
         }
     });

 })