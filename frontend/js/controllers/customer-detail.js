myApp.controller('CustomerDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/customer-detail.html");
    TemplateService.title = "Customer Detail"; //This is the Title of the Website
    TemplateService.class = ""; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    $scope.submitForm = function (formLoginData) {
        console.log("This is it");
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };
    $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
        {
            name: 'Sr.No.',
        },
        {
            name: 'Name',
        },
        {
            name: 'Email',
        },
        {
            name: 'Password',
        },
        {
            name: 'Username',
        },
        {
            name: 'MD5',
        },
        {
            name: 'SHA512',
        },
];
})
