 myApp.controller('ViewCustomerNoteCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams) {
     $scope.template = TemplateService.getHTML("content/view-customer-note.html");
     TemplateService.title = "Rules List"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();



     NavigationService.callApi("customerNote/search", function (data) {
         if (data.value == true) {
             //  console.log("asdasd--", data.data.results);
             $scope.customerNoteData = data.data.results;
         }
     });
 })