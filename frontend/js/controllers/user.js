    myApp.controller('UserCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/user.html");
        TemplateService.title = "User"; //This is the Title of the Website
        TemplateService.class = "user"; //This is the Class of the Theme
        TemplateService.templateTitle = "Corporate User"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
