myApp.controller('CustomerDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr) {
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
            title: 'Customer Note',
        },
        {
            title: 'CRM',
        },
        {
            title: 'Company',
        },
        {
            title: 'Company Contact',
        },
        {
            title: 'Company Info',
        },
        {
            title: 'Item',
        },
        {
            title: 'Location',
        },
        {
            title: 'Transaction',
        },
        {
            title: 'Warranty Item',
        }

    ];

    $scope.openLogs = function (logData) {
        console.log(logData);
        $scope.openLogdata = {};
        $scope.openLogdata._id = logData.id;
        _.each($scope.eData, function (n) {
            n.isOpen = false;
        });
        logData.isOpen = !logData.isOpen;
        NavigationService.apiCall("AllLogs/singleLogHistory", $scope.openLogdata, function (data) {
            console.log(data);
            if (data.value == true) {
                $scope.logInsideData = data.data.logs;
                console.log("logData--------------", $scope.logInsideData);
                _.forEach($scope.logInsideData, function (value, key) {
                    // console.log(value);
                    value.rowNo = key;
                });
            }
        });
    };


    $scope.activeJustified = 1
    if ($scope.activeJustified == 1) {

        $scope.getExcelFields = function (formdata) {
            // console.log("formdata", formdata);
            NavigationService.apiCall("ExcelUpload/customerNoteUpload", formdata, function (data) {
                if (data.value == true) {
                    $scope.excelData = data.data;
                    // console.log("aaaa", $scope.excelArrData);
                } else {
                    alert("aaaaa");
                }
            });
        };

        $scope.formData = {};
        $scope.mapExcelFields = function (formdata, formdata1) {
            // console.log("formdata[$scope.activeField]", formdata[$scope.activeField]);
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
            NavigationService.apiCall("ExcelUpload/finalUploadForCustomerNote", $scope.companyExcel, function (data) {
                if (data.value == true) {
                    $scope.errData = data.data;
                    $scope.eData = {};
                    $scope.eData.tableName = 'CustomerNote';
                    $scope.eData.logs = data.data;
                    NavigationService.apiCall("AllLogs/save", $scope.eData, function (data) {
                        if (data.value == true) {
                            console.log("Sucess#############################", data);
                            toastr.success("Data Submitted Sucessfully");
                        }
                    });
                }
            });
        };

        $scope.getHistory = function (n) {
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = 'CustomerNote';
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                console.log(data);
                if (data.value == true) {
                    $scope.eData = data.data;
                    console.log("eData--------------", $scope.eData);
                    // $scope.logData = data.data.found[0].info[0];
                    // console.log("logData--------------", $scope.logData);
                } else {
                    toastr.error('No History');
                }
            });
        };

    }


    $scope.activeTabs = function (n) {
        $scope.activeJustified = n + 1;
        var getExcel;
        var mapExcel;
        var tableName;
        if ($scope.activeJustified == 1) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "customerNoteUpload";
            mapExcel = "finalUploadForCustomerNote";
            tableName = "CustomerNote";
            $scope.eData = "";
        } else if ($scope.activeJustified == 2) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "crmUpload";
            mapExcel = "finalUploadForCrm";
            tableName = "Crm";
            $scope.eData = "";
        } else if ($scope.activeJustified == 3) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "companyUpload";
            mapExcel = "finalUploadForCompany";
            tableName = "Company";
            $scope.eData = "";
        } else if ($scope.activeJustified == 4) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "companyContactUpload";
            mapExcel = "companyContactUpload";
            tableName = "CompanyContact";
            $scope.eData = "";
        } else if ($scope.activeJustified == 5) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "companyInfoUpload";
            mapExcel = "finalUploadForCompanyInfo";
            tableName = "CompanyInfo";
            $scope.eData = "";
        } else if ($scope.activeJustified == 6) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "itemUpload";
            mapExcel = "finalUploadForItem";
            tableName = "Item";
            $scope.eData = "";
        } else if ($scope.activeJustified == 7) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "LocationUpload";
            mapExcel = "finalUploadForLocation";
            tableName = "Locations";
            $scope.eData = "";
        } else if ($scope.activeJustified == 8) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "TransactionUpload";
            mapExcel = "finalUploadForTransaction";
            tableName = "Transaction";
            $scope.eData = "";
        } else if ($scope.activeJustified == 9) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "warrantyItemUpload";
            mapExcel = "finalUploadForWarranty";
            tableName = "WarrantyItem";
            $scope.eData = "";
        }
        $scope.getExcelFields = function (formdata) {
            // console.log("formdata", formdata);
            NavigationService.apiCall("ExcelUpload/" + getExcel, formdata, function (data) {
                if (data.value == true) {
                    // console.log("aaaa", data);
                    $scope.excelData = data.data;
                    // console.log("excelData", $scope.excelData);
                } else {
                    alert("Incorrect Input  ");
                }
            });
        };
        $scope.formData = {};
        $scope.mapExcelFields = function (formdata, formdata1) {
            // console.log("formdata[$scope.activeField]", formdata[$scope.activeField]);
            $scope.companyExcel = {};
            $scope.companyExcel.name = formdata1.file;
            $scope.companyExcel.fields = [];
            _.forEach(formdata, function (value, key) {
                $scope.field = {};
                $scope.field.ourField = key;
                $scope.field.theirField = value;
                $scope.companyExcel.fields.push($scope.field);
            });
            // console.log("$scope.companyExcel", $scope.companyExcel);
            NavigationService.apiCall("ExcelUpload/" + mapExcel, $scope.companyExcel, function (data) {
                if (data.value == true) {
                    console.log("#############1################", data);
                    $scope.errData = data.data;
                    $scope.eData = {};
                    $scope.eData.tableName = tableName;
                    $scope.eData.logs = data.data;
                    NavigationService.apiCall("AllLogs/save", $scope.eData, function (data) {
                        if (data.value == true) {
                            toastr.success("Data Submitted Sucessfully");
                        }
                    });
                }
            });
        };
        $scope.getHistory = function (n) {
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                console.log(data);
                if (data.value == true) {
                    $scope.eData = data.data;
                    console.log("eData--------------", $scope.eData);
                } else {
                    toastr.error('No History');
                }
            });
        };
    };
});