 myApp.controller('AssignmentListCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
     $scope.template = TemplateService.getHTML("content/assignment-list.html");
     TemplateService.title = "Assignment List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     //  TemplateService.templateTitle = "Assignment List";
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
 })