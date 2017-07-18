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
            }, {
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

    $scope.activeJustified = 1;
    $scope.activeTabs = function (n) {
        $scope.activeJustified = n + 1;
        var getExcel;
        var mapExcel;
        if ($scope.activeJustified == 1) {
            $scope.excelData = "";
            getExcel = "userUpload";
            mapExcel = "finalUploadForUser";
        } else if ($scope.activeJustified == 2) {
            $scope.excelData = "";
            getExcel = "customerNoteUpload";
            mapExcel = "finalUploadForCustomerNote";
        } else if ($scope.activeJustified == 3) {
            $scope.excelData = "";
            getExcel = "crmUpload";
            mapExcel = "finalUploadForCrm";
        } else if ($scope.activeJustified == 4) {
            $scope.excelData = "";
            getExcel = "companyUpload";
            mapExcel = "finalUploadForCompany";
        } else if ($scope.activeJustified == 5) {
            $scope.excelData = "";
            getExcel = "companyContactUpload";
            mapExcel = "companyContactUpload";
        } else if ($scope.activeJustified == 6) {
            $scope.excelData = "";
            getExcel = "companyInfoUpload";
            mapExcel = "finalUploadForCompanyInfo";
        } else if ($scope.activeJustified == 7) {
            $scope.excelData = "";
            getExcel = "itemUpload";
            mapExcel = "finalUploadForItem";
        } else if ($scope.activeJustified == 8) {
            $scope.excelData = "";
            getExcel = "LocationUpload";
            mapExcel = "finalUploadForLocation";
        } else if ($scope.activeJustified == 9) {
            $scope.excelData = "";
            getExcel = "TransactionUpload";
            mapExcel = "finalUploadForTransaction";
        } else if ($scope.activeJustified == 10) {
            $scope.excelData = "";
            getExcel = "warrantyItemUpload";
            mapExcel = "finalUploadForWarranty";
        }

        $scope.getExcelFields = function (formdata) {
            console.log("formdata", formdata);
            NavigationService.apiCall("ExcelUpload/" + getExcel, formdata, function (data) {
                if (data.value == true) {
                    $scope.excelData = data.data;
                    console.log("aaaa", $scope.excelArrData);
                } else {
                    alert("aaaaa");
                }
            });
        };

        $scope.formData = {};
        $scope.mapExcelFields = function (formdata, formdata1) {
            $scope.companyExcel = {};
            $scope.companyExcel.name = formdata1.file;
            $scope.companyExcel.fields = [];
            _.forEach(formdata, function (value, key) {
                $scope.field = {};
                $scope.field.ourField = key;
                $scope.field.theirField = value;
                $scope.companyExcel.fields.push($scope.field);
            });
            console.log("$scope.companyExcel", $scope.companyExcel);
            NavigationService.apiCall("ExcelUpload/" + mapExcel, $scope.companyExcel, function (data) {
                if (data.value == true) {
                    console.log("Sucess");
                } else {
                    alert("aaaaa");
                }
            });
        };

    };



    // $scope.getExcelFields = function (formdata) {
    //     console.log("formdata", formdata);
    //     NavigationService.apiCall("ExcelUpload/companyUpload", formdata, function (data) {
    //         if (data.value == true) {
    //             $scope.excelData = data.data;
    //             console.log("aaaa", $scope.excelArrData);
    //         } else {
    //             alert("aaaaa");
    //         }
    //     });
    // };

    // $scope.formData = {};
    // $scope.mapExcelFields = function (formdata, formdata1) {
    //     $scope.companyExcel = {};
    //     $scope.companyExcel.name = formdata1.file;
    //     $scope.companyExcel.fields = [];
    //     _.forEach(formdata, function (value, key) {
    //         $scope.field = {};
    //         $scope.field.ourField = key;
    //         $scope.field.theirField = value;
    //         $scope.companyExcel.fields.push($scope.field);
    //     });
    //     console.log("$scope.companyExcel", $scope.companyExcel);
    //     NavigationService.apiCall("ExcelUpload/finalUploadForCompany", $scope.companyExcel, function (data) {
    //         if (data.value == true) {
    //             console.log("Sucess");
    //         } else {
    //             alert("aaaaa");
    //         }
    //     });
    // };

});