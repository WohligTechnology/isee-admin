 myApp.controller('ComingSoonCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
     $scope.template = TemplateService.getHTML("content/coming-soon.html");
     TemplateService.title = "Coming Soon"; //This is the Title of the Website
     TemplateService.class = "assignment-list"; //This is the Class of the Theme
     $scope.navigation = NavigationService.getNavigation();

 })