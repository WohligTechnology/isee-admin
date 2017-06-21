    myApp.controller('StoreCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/store.html");
        TemplateService.title = "Store"; //This is the Title of the Website
        TemplateService.class = "store"; //This is the Class of the Theme
        TemplateService.templateTitle = "Stores Manager"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();
    })