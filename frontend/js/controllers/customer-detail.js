myApp.controller('CustomerDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $state) {
    $scope.template = TemplateService.getHTML("content/customer-detail.html");
    TemplateService.title = "Customer Detail"; //This is the Title of the Website
    TemplateService.class = ""; //This is the Class of Page
    $scope.fileprogressbar = 0;
    $scope.navigation = NavigationService.getNavigation();
    $scope.submitForm = function (formLoginData) {
        console.log("This is it");
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };
    $scope.whatClassIsIt = function (c) {
        if (c == "Completed") {
            return "label label-success";
        } else if (c == "Pending") {
            return "label label-warning";
        }
    }
    $scope.tabs = [{
            title: 'Company',
        },
        {
            title: 'Company Contact',
        },
        {
            title: 'Company Info',
        }, {
            title: 'Customer Note',
        },
        {
            title: 'CRM',
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
        },
        {
            title: 'Calendar',
        },
        {
            title: 'Customer Contact',
        },
        {
            title: 'Till Register',
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
            if (data.value == true) {
                $scope.logInsideData = data.data.logs;
                _.forEach($scope.logInsideData, function (value, key) {
                    value.rowNo = key;
                });
            }
        });
    };

    $scope.activeTabs = function (n) {
        $scope.mappingDisabled = false;
        $(".cust-details_hidesect").css("display", "none"); // to hide submit and message
        $scope.activeJustified = n + 1;
        var getExcel;
        var mapExcel;
        var tableName;
        if ($scope.activeJustified == 1) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "companyUpload";
            mapExcel = "finalUploadForCompany";
            tableName = "Company";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 2) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "companyContactUpload";
            mapExcel = "finalUploadForCompanyContact";
            tableName = "CompanyContact";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 3) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "companyInfoUpload";
            mapExcel = "finalUploadForCompanyInfo";
            tableName = "CompanyInfo";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 4) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "customerNoteUpload";
            mapExcel = "finalUploadForCustomerNote";
            tableName = "CustomerNote";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 5) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "crmUpload";
            mapExcel = "finalUploadForCrm";
            tableName = "Crm";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 6) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "itemUpload";
            mapExcel = "finalUploadForItem";
            tableName = "Item";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 7) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "LocationUpload";
            mapExcel = "finalUploadForLocation";
            tableName = "Locations";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 8) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "TransactionUpload";
            mapExcel = "finalUploadForTransaction";
            tableName = "Transaction";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 9) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "warrantyItemUpload";
            mapExcel = "finalUploadForWarranty";
            tableName = "WarrantyItem";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 10) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "calendarUpload";
            mapExcel = "finalUploadForCalendar";
            tableName = "Calendar";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 11) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "customerUpload";
            mapExcel = "finalUploadForCustomer";
            tableName = "Customer";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        } else if ($scope.activeJustified == 12) {
            $scope.excelData = "";
            $scope.errData = "";
            getExcel = "tillRegisterUpload";
            mapExcel = "finalUploadFortillRegister";
            tableName = "TillRegister";
            $scope.eData = "";
            $scope.getHistoryData = {};
            $scope.getHistoryData.tableName = tableName;
            NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
                if (data.value == true) {
                    $scope.eData = data.data;
                } else {
                    toastr.error('No History');
                }
            });
        }

        $scope.getExcelFields = function (formdata) {
            // console.log("formdata", formdata);.
            $scope.mappingDisabled = true;
            $(".hidesect-loader").css("display", "block"); //loader for table
            NavigationService.apiCall("ExcelUpload/" + getExcel, formdata, function (data) {
                if (data.value == true) {
                    $scope.excelData = data.data;
                    // console.log("excelData", $scope.excelData);
                    $(".cust-details_hidesect").css("display", "block"); //display table
                    $(".hidesect-loader").css("display", "none"); // hide loader
                } else {
                    $scope.mappingDisabled = false;
                    $(".hidesect-loader").css("display", "none"); //hide laoder                    
                    toastr.error("Incorrect Input  ");
                }
            });
        };


        $scope.formData = {};
        $scope.mapExcelFields = function (formdata, formdata1) {
            // console.log("formdata[$scope.activeField]", formdata[$scope.activeField]);
            $scope.showtable = false;
            $scope.companyExcel = {};
            $scope.companyExcel.name = formdata1.file;
            $scope.companyExcel.fields = [];
            _.forEach(formdata, function (value, key) {
                $scope.field = {};
                $scope.field.ourField = key;
                $scope.field.theirField = value;
                $scope.companyExcel.fields.push($scope.field);
            });
            console.log("mapExcel", mapExcel);
            NavigationService.apiCall("ExcelUpload/" + mapExcel, $scope.companyExcel, function (data) {
                if (data.value == true) {
                    // $scope.getHistory();
                    // console.log("#############1################", data);
                    $scope.errData = data.data;
                    toastr.success("Data processing");
                    $state.reload();
                }
            });
        };

        // $scope.getHistory = function (n) {
        //     $scope.getHistoryData = {};
        //     $scope.getHistoryData.tableName = tableName;
        //     // console.log("getHistoryData", $scope.getHistoryData);
        //     NavigationService.apiCall("AllLogs/logHistory", $scope.getHistoryData, function (data) {
        //         // console.log("getHistory", data);
        //         if (data.value == true) {
        //             $scope.eData = data.data;
        //             // console.log("eData--------------", $scope.eData);
        //         } else {
        //             toastr.error('No History');
        //         }
        //     });
        // };

        // $scope.getHistory(); >>>

    };

    $scope.activeTabs(0);

    //Tab Colour Change
    NavigationService.apiCall("AllLogs/findDataInTable", $scope.tabs, function (data) {
        if (data.value == true) {
            $scope.tabs = data.data;
            // console.log("$scope.tabs-------    ", data);
        }
    });

});