myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/login.html");
        TemplateService.title = "Login"; //This is the Title of the Website
        TemplateService.class = "login"; //This is the Class of the Theme
        TemplateService.header = "";
        TemplateService.sidemenu = "";
        TemplateService.footer = "";
        $scope.navigation = NavigationService.getNavigation();
    })
