myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/login.html");
        TemplateService.title = "Login"; //This is the Title of the Website
        TemplateService.class = "blank-screen"; //This is the Class of Page
        TemplateService.header = "";
        TemplateService.sidemenu = "";
        TemplateService.footer = "";
        $scope.navigation = NavigationService.getNavigation();
                $scope.submitForm = function (formLoginData) {
            console.log("This is it");
            return new Promise(function (callback) {
                $timeout(function () {
                    callback();
                }, 5000);
            });
        };
    })
