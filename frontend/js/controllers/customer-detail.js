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

    $scope.tabs = [{
            title: 'User',
            formNames: [{
                name: 'First Name',
                countries: [{
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
                ]
            },{
                name: 'First Name',
                countries: [{
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
                ]
            }]
            // disabled: true
        },
        {
            title: 'Customer Note',
            name: 'Dynamic content 2',
            // disabled: true
        },
        {
            title: 'CRM',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Company',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Company Contact',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Company Info',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Item',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Location',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Transaction',
            content: 'Dynamic content 3',
            // disabled: true
        },
        {
            title: 'Warranty Item',
            content: 'Dynamic content 3',
            // disabled: true
        }

    ];
})