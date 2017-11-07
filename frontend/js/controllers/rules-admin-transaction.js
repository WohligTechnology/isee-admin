myApp.controller('RulesAdminTransactionCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/rules-admin-transaction.html");
    TemplateService.title = ""; //This is the Title of the Website
    TemplateService.class = "rules-admin-transaction"; //This is the Class of the Theme
    TemplateService.templateTitle = ""; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();
})