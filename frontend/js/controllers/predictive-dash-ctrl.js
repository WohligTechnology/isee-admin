myApp.controller('PredictiveDashCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/predictive-dashboard.html");
    TemplateService.title = "Predictive Dashboard"; //This is the Title of the Website
    TemplateService.class = "corporate"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
})