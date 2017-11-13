myApp.controller('CustomerDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $state) {
    $scope.template = TemplateService.getHTML("content/customer-detail.html");
    TemplateService.title = "Customer Detail"; //This is the Title of the Website
    TemplateService.class = ""; //This is the Class of Page
    $scope.fileprogressbar = 0;
    $scope.navigation = NavigationService.getNavigation();
    $scope.excelloaded = false;
    $scope.submitForm = function (formLoginData) {
        console.log("This is it");
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };
    $scope.currenttab = ["check"];
    $scope.makeTabActive = function ($index) {
        $scope.currenttab = [];
        $scope.currenttab[$index] = "check";
    }
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
            $scope.excelloaded = false;
            $scope.excelData = "";
            $scope.staticfields = [{
                field: "organizationId",
                description: "String"
            }, {
                field: "name",
                description: "String"
            }, {
                field: "region",
                description: "String"
            }, {
                field: "textCode",
                description: "String"
            }, {
                field: "textSequence",
                description: "String"
            }, {
                field: "textSubcode",
                description: "String"
            }, {
                field: "receiptText",
                description: "String"
            }, {
                field: "effectiveDate",
                description: "Date"
            }, {
                field: "expirationDate",
                description: "Date"
            }, {
                field: "recordState",
                description: "String"
            }, {
                field: "lineFormat",
                description: "String"
            }, {
                field: "reformat",
                description: "String"
            }, {
                field: "category",
                description: "String"
            }, {
                field: "beginRange",
                description: "String"
            }, {
                field: "endRange",
                description: "String"
            }, {
                field: "cost",
                description: "Number"
            }, {
                field: "minimumCost",
                description: "Number"
            }, {
                field: "maximumCost",
                description: "Number"
            }, {
                field: "itemId",
                description: "String"
            }];


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
            $scope.excelloaded = false;
            $scope.staticfields = [{
                field: "organizationId",
                description: "String"
            }, {
                field: "phoneNumberId",
                description: "String"
            }, {
                field: "phoneNumber",
                description: "Number"
            }, {
                field: "phoneTypeCode",
                description: "String"
            }, {
                field: "contactDiscription",
                description: "String"
            }, {
                field: "sortOrder",
                description: "String"
            }];
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
            $scope.excelloaded = false;
            $scope.staticfields = [{
                field: "organizationId",
                description: "String"
            }, {
                field: "reasonTypeCode",
                description: "String"
            }, {
                field: "reasonCode",
                description: "String"
            }, {
                field: "description",
                description: "String"
            }, {
                field: "commentRequired",
                description: "String"
            }, {
                field: "sortOrder",
                description: "String"
            }, {
                field: "parentCode",
                description: "String"
            }, {
                field: "glAccountNumber",
                description: "Number"
            }, {
                field: "minimumAmt",
                description: "Number"
            }, {
                field: "maximumAmt",
                description: "Number"
            }, {
                field: "privilegeType",
                description: "String"
            }, {
                field: "customerMessage",
                description: "String"
            }, {
                field: "inventoryActionCode",
                description: "String"
            }, {
                field: "inventoryLocationId",
                description: "String"
            }, {
                field: "inventoryBucketId",
                description: "String"
            }];
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
            $scope.staticfields = [{
                field: "customerId",
                description: "Note Sequence a number that can not be greater than 65000"
            }, {
                field: "noteSequence",
                description: "Note Sequence a number that can not be greater than 65000"
            }, {
                field: "note",
                description: "This is a string of length less than 140 characters."
            }, {
                field: "noteTimeStamp",
                description: "This is a timestamp"
            }];
            $scope.excelloaded = false;
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
            $scope.staticfields = "";
            $scope.excelloaded = false;
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
            $scope.staticfields = "";
            $scope.excelloaded = false;
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
            $scope.staticfields = [{
                field: "organizationId",
                description: "String"
            }, {
                field: "retailLocationId",
                description: "String"
            }, {
                field: "storeNumber",
                description: "String"
            }, {
                field: "storeName",
                description: "String"
            }, {
                field: "description",
                description: "String"
            }, {
                field: "effectiveDate",
                description: "Date"
            }, {
                field: "expirationDate",
                description: "Date"
            }, {
                field: "apartment",
                description: "String"
            }, {
                field: "address1",
                description: "String"
            }, {
                field: "address2",
                description: "String"
            }, {
                field: "city",
                description: "String"
            }, {
                field: "country",
                description: "String"
            }, {
                field: "postalCode",
                description: "String"
            }, {
                field: "state",
                description: "String"
            }, {
                field: "telephone1",
                description: "Number"
            }, {
                field: "telephone2",
                description: "Number"
            }, {
                field: "telephone3",
                description: "Number"
            }, {
                field: "telephone4",
                description: "Number"
            }, {
                field: "region",
                description: "String"
            }, {
                field: "loc",
                description: "Number"
            }, {
                field: "taxPercentage",
                description: "String"
            }, {
                field: "storeManager",
                description: "String"
            }, {
                field: "locationType",
                description: "String"
            }, {
                field: "deliveryAvailable",
                description: "String"
            }, {
                field: "pickupAvailable",
                description: "String"
            }, {
                field: "transferAvailable",
                description: "String"
            }, {
                field: "email",
                description: "String"
            }, {
                field: "geoCode",
                description: "String"
            }];
            $scope.excelloaded = false;
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
            $scope.staticfields = "";
            $scope.excelloaded = false;
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
            $scope.staticfields = [{
                field: "warrantyItemId",
                description: "String"
            }, {
                field: "warrantyType",
                description: "String"
            }, {
                field: "warrantySubtype",
                description: "String"
            }, {
                field: "description",
                description: "String"
            }, {
                field: "replaceType",
                description: "String"
            }];
            $scope.excelloaded = false;
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
            $scope.staticfields = [{
                field: "activityDate",
                description: "String"
            }, {
                field: "month",
                description: "String"
            }, {
                field: "year",
                description: "String"
            }, {
                field: "monthYear",
                description: "String"
            }, {
                field: "monthYearSequence",
                description: "String"
            }, {
                field: "quarter",
                description: "String"
            }, {
                field: "quarterYear",
                description: "String"
            }, {
                field: "quarterYearSequence",
                description: "Date"
            }, {
                field: "monthName",
                description: "Date"
            }];
            $scope.excelloaded = false;
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
            $scope.staticfields = [{
                    field: "customerId",
                    description: "String"
                },
                {
                    field: "addressID",
                    description: "String"
                }, {
                    field: "address1",
                    description: "String"
                }, {
                    field: "address2",
                    description: "String"
                }, {
                    field: "apartment",
                    description: "String"
                }, {
                    field: "city",
                    description: "String"
                }, {
                    field: "country",
                    description: "String"
                }, {
                    field: "postalCode",
                    description: "String"
                }, {
                    field: "state",
                    description: "String"
                }, {
                    field: "email",
                    description: "String"
                }
            ];
            $scope.excelloaded = false;
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
            $scope.staticfields = [{
                field: "retailLocationId",
                description: "String"
            }, {
                field: "tillNumber",
                description: "String"
            }, {
                field: "date",
                description: "date"
            }, {
                field: "openingBalance",
                description: "Number"
            }, {
                field: "additions",
                description: "Number"
            }, {
                field: "systemBalance",
                description: "Number"
            }, {
                field: "actualBalance",
                description: "Number"
            }, {
                field: "bankDeposit",
                description: "Number"
            }, {
                field: "closingBalance",
                description: "Number"
            }, {
                field: "employeeNumber",
                description: "String"
            }, {
                field: "randomNumber",
                description: "Number"
            }];
            $scope.excelloaded = false;
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
            $scope.excelloaded = true;
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
                    $scope.excelloaded = false;
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