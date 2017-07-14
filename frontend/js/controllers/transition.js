 myApp.controller('TransitionCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/transition.html");
        TemplateService.title = "Transition"; //This is the Title of the Website
        TemplateService.class = "transition"; //This is the Class of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })
