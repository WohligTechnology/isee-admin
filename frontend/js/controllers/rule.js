    myApp.controller('RulesCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/rules.html");
        TemplateService.title = "Widgets"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = "Data Manager"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
