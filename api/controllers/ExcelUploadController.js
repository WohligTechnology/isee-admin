var controller = {

    //till Register *

    tillRegisterUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                }
                //  {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ]; //fields in schema
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadFortillRegister: function (req, res) {
        // console.log("reqqqq*********************************", req.body);
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                TillRegister.saveData(singleData, function (err, found) {
                                    if (err) {
                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                        successObj.error = err;
                                        successObj.Success = null;
                                        arrData.push(successObj);
                                        callback(null, err);
                                        failureCount++;
                                    } else {
                                        if (_.isEmpty(found)) {
                                            callback(null, err);
                                        } else {
                                            sucessCount++;
                                            successObj.error = null;
                                            successObj.Success = found;
                                            finalData.sucessCount = sucessCount;
                                            finalData.totalCount = sucessCount + failureCount;
                                            finalData.failureCount = failureCount;
                                            finalData.found = found;
                                            arrData.push(successObj);
                                            delete finalData.found
                                            callback(null, finalData, arrData);
                                        }
                                    }
                                });
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Calendar';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });
            }
        });
    },

    //calender *

    calendarUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                }
                //  {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ]; //fields in schema
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCalendar: function (req, res) {
        // console.log("reqqqq*********************************", req.body);
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                Calendar.saveData(singleData, function (err, found) {
                                    if (err) {
                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                        successObj.error = err;
                                        successObj.Success = null;
                                        arrData.push(successObj);
                                        callback(null, err);
                                        failureCount++;
                                    } else {
                                        if (_.isEmpty(found)) {
                                            callback(null, err);
                                        } else {
                                            sucessCount++;
                                            successObj.error = null;
                                            successObj.Success = found;
                                            finalData.sucessCount = sucessCount;
                                            finalData.totalCount = sucessCount + failureCount;
                                            finalData.failureCount = failureCount;
                                            finalData.found = found;
                                            arrData.push(successObj);
                                            delete finalData.found
                                            callback(null, finalData, arrData);
                                        }
                                    }
                                });
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Calendar';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },

    //company.. *

    companyUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },
                //  {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ]; //fields in schema
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCompany: function (req, res) {
        // console.log("reqqqq*********************************", req.body);
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                Company.saveData(singleData, function (err, found) {
                                    if (err) {
                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                        successObj.error = err;
                                        successObj.Success = null;
                                        arrData.push(successObj);
                                        callback(null, err);
                                        failureCount++;
                                    } else {
                                        if (_.isEmpty(found)) {
                                            callback(null, err);
                                        } else {
                                            sucessCount++;
                                            successObj.error = null;
                                            successObj.Success = found;
                                            finalData.sucessCount = sucessCount;
                                            finalData.totalCount = sucessCount + failureCount;
                                            finalData.failureCount = failureCount;
                                            finalData.found = found;
                                            arrData.push(successObj);
                                            delete finalData.found
                                            callback(null, finalData, arrData);
                                        }
                                    }
                                });
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Company';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },

    // companyContact upload

    companyContactUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },
                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCompanyContact: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                if (singleData.organizationId) {
                                    Company.findOne({
                                        organizationId: singleData.organizationId
                                    }).exec(function (err, found) {
                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            if (found) {
                                                singleData.organizationId = found._id;
                                                CompanyContact.saveData(singleData, function (err, found) {
                                                    if (err) {
                                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                                        successObj.error = err;
                                                        successObj.Success = null;
                                                        arrData.push(successObj);
                                                        callback(null, err);
                                                        failureCount++;
                                                    } else {
                                                        if (_.isEmpty(found)) {
                                                            callback(null, err);
                                                        } else {
                                                            sucessCount++;
                                                            successObj.error = null;
                                                            successObj.Success = found;
                                                            finalData.sucessCount = sucessCount;
                                                            finalData.totalCount = sucessCount + failureCount;
                                                            finalData.failureCount = failureCount;
                                                            finalData.found = found;
                                                            arrData.push(successObj);
                                                            delete finalData.found
                                                            callback(null, finalData, arrData);
                                                        }
                                                    }
                                                });
                                            } else {
                                                callback({
                                                    message: "Incorrect Credentials!"
                                                }, null);
                                            }
                                        }
                                    });
                                } else {
                                    CompanyContact.saveData(singleData, function (err, found) {
                                        if (err) {
                                            console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                            successObj.error = err;
                                            successObj.Success = null;
                                            arrData.push(successObj);
                                            callback(null, err);
                                            failureCount++;
                                        } else {
                                            if (_.isEmpty(found)) {
                                                callback(null, err);
                                            } else {
                                                sucessCount++;
                                                successObj.error = null;
                                                successObj.Success = found;
                                                finalData.sucessCount = sucessCount;
                                                finalData.totalCount = sucessCount + failureCount;
                                                finalData.failureCount = failureCount;
                                                finalData.found = found;
                                                arrData.push(successObj);
                                                delete finalData.found
                                                callback(null, finalData, arrData);
                                            }
                                        }
                                    });
                                }
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'CompanyContact';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },


    //companyInfo

    companyInfoUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },
                //  {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCompanyInfo: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                if (singleData.organizationId) {
                                    Company.findOne({
                                        organizationId: singleData.organizationId
                                    }).exec(function (err, found) {
                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            if (found) {
                                                singleData.organizationId = found._id;
                                                CompanyInfo.saveData(singleData, function (err, found) {
                                                    if (err) {
                                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                                        successObj.error = err;
                                                        successObj.Success = null;
                                                        arrData.push(successObj);
                                                        callback(null, err);
                                                        failureCount++;
                                                    } else {
                                                        if (_.isEmpty(found)) {
                                                            callback(null, err);
                                                        } else {
                                                            sucessCount++;
                                                            successObj.error = null;
                                                            successObj.Success = found;
                                                            finalData.sucessCount = sucessCount;
                                                            finalData.totalCount = sucessCount + failureCount;
                                                            finalData.failureCount = failureCount;
                                                            finalData.found = found;
                                                            arrData.push(successObj);
                                                            delete finalData.found
                                                            callback(null, finalData, arrData);
                                                        }
                                                    }
                                                });
                                            } else {
                                                callback({
                                                    message: "Incorrect Credentials!"
                                                }, null);
                                            }
                                        }
                                    });
                                } else {
                                    CompanyInfo.saveData(singleData, function (err, found) {
                                        if (err) {
                                            console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                            successObj.error = err;
                                            successObj.Success = null;
                                            arrData.push(successObj);
                                            callback(null, err);
                                            failureCount++;
                                        } else {
                                            if (_.isEmpty(found)) {
                                                callback(null, err);
                                            } else {
                                                sucessCount++;
                                                successObj.error = null;
                                                successObj.Success = found;
                                                finalData.sucessCount = sucessCount;
                                                finalData.totalCount = sucessCount + failureCount;
                                                finalData.failureCount = failureCount;
                                                finalData.found = found;
                                                arrData.push(successObj);
                                                delete finalData.found
                                                callback(null, finalData, arrData);
                                            }
                                        }
                                    });
                                }
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'CompanyInfo';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });
            }
        });
    },


    //crm

    crmUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
                    field: "organizationId",
                    description: "String"
                }, {
                    field: "customerGroupId",
                    description: "String"
                }, {
                    field: "customerId",
                    description: "String"
                }, {
                    field: "customerNumber",
                    description: "String"
                }, {
                    field: "salutation",
                    description: "String"
                }, {
                    field: "firstName",
                    description: "String"
                }, {
                    field: "middleName",
                    description: "String"
                }, {
                    field: "lastName",
                    description: "String"
                }, {
                    field: "gender",
                    description: "String"
                }, {
                    field: "totalTransactionCount",
                    description: "Number"
                }, {
                    field: "totalSoldItemCount",
                    description: "Number"
                }, {
                    field: "ytdReturnsAmount",
                    description: "Number"
                }, {
                    field: "partyId",
                    description: "String"
                }, {
                    field: "idVerificationRequired",
                    description: "Boolean"
                }, {
                    field: "partyId1",
                    description: "String"
                }, {
                    field: "totalReturnedItemCount",
                    description: "Number"
                }, {
                    field: "totalReturnsAmount",
                    description: "Number"
                }, {
                    field: "totalSalesAmount",
                    description: "Number"
                }, {
                    field: "ytdReturnedItemCount",
                    description: "Number"
                }, {
                    field: "ytdSalesAmount",
                    description: "Number"
                }, {
                    field: "ytdSoldItemCount",
                    description: "Number"
                }, {
                    field: "ytdTransactionCount",
                    description: "Number"
                }, {
                    field: "allegianceRetailLocationId",
                    description: "String"
                }, {
                    field: "birthDate",
                    description: "Date"
                }, {
                    field: "customerLevelCode",
                    description: "String"
                }, {
                    field: "employeeId",
                    description: "String"
                }, {
                    field: "federalTaxId",
                    description: "String"
                }, {
                    field: "legalStatusCode",
                    description: "String"
                }, {
                    field: "mailingList",
                    description: "String"
                }, {
                    field: "organizationName",
                    description: "String"
                }, {
                    field: "organizationTypeCode",
                    description: "String"
                }, {
                    field: "partyTypeCode",
                    description: "String"
                }, {
                    field: "pictureUri",
                    description: "String"
                }, {
                    field: "signUpRetailLocationId",
                    description: "String"
                }, {
                    field: "socialSecurityNumber",
                    description: "Number"
                }, {
                    field: "stateTaxId",
                    description: "String"
                }, {
                    field: "suffix",
                    description: "String"
                }, {
                    field: "void",
                    description: "String"
                }, {
                    field: "anniversaryDate",
                    description: "Date"
                }, {
                    field: "emailContact",
                    description: "String"
                }, {
                    field: "privacyCard",
                    description: "String"
                }, {
                    field: "commercialCustomer",
                    description: "String"
                }, {
                    field: "recordState",
                    description: "String"
                }, {
                    field: "processDate",
                    description: "Date"
                }, {
                    field: "customerGroups",
                    description: "String"
                }, {
                    field: "creatorPartyId",
                    description: "String"
                }, {
                    field: "creatorParty",
                    description: "String"
                }, {
                    field: "loyaltyProgramNumber",
                    description: "String"
                },
                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCrm: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                if (singleData.organizationId && singleData.customerId) {
                                    Company.findOne({
                                        organizationId: singleData.organizationId
                                    }).exec(function (err, found) {
                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            if (found) {
                                                Customer.findOne({
                                                    customerId: singleData.customerId
                                                }).exec(function (err, found1) {
                                                    if (err) {
                                                        callback(err, null);
                                                    } else {
                                                        if (found1) {
                                                            singleData.organizationId = found._id;;
                                                            singleData.customerId = found1._id;
                                                            Crm.saveData(singleData, function (err, found) {
                                                                if (err) {
                                                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                                                    successObj.error = err;
                                                                    successObj.Success = null;
                                                                    arrData.push(successObj);
                                                                    callback(null, err);
                                                                    failureCount++;
                                                                } else {
                                                                    if (_.isEmpty(found)) {
                                                                        callback(null, err);
                                                                    } else {
                                                                        sucessCount++;
                                                                        successObj.error = null;
                                                                        successObj.Success = found;
                                                                        finalData.sucessCount = sucessCount;
                                                                        finalData.totalCount = sucessCount + failureCount;
                                                                        finalData.failureCount = failureCount;
                                                                        finalData.found = found;
                                                                        arrData.push(successObj);
                                                                        delete finalData.found
                                                                        callback(null, finalData, arrData);
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            callback({
                                                                message: "Incorrect Credentials!"
                                                            }, null);
                                                        }
                                                    }
                                                });
                                            } else {
                                                callback({
                                                    message: "Incorrect Credentials!"
                                                }, null);
                                            }
                                        }
                                    });
                                } else {
                                    Crm.saveData(singleData, function (err, found) {
                                        if (err) {
                                            console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                            successObj.error = err;
                                            successObj.Success = null;
                                            arrData.push(successObj);
                                            callback(null, err);
                                            failureCount++;
                                        } else {
                                            if (_.isEmpty(found)) {
                                                callback(null, err);
                                            } else {
                                                sucessCount++;
                                                successObj.error = null;
                                                successObj.Success = found;
                                                finalData.sucessCount = sucessCount;
                                                finalData.totalCount = sucessCount + failureCount;
                                                finalData.failureCount = failureCount;
                                                finalData.found = found;
                                                arrData.push(successObj);
                                                delete finalData.found
                                                callback(null, finalData, arrData);
                                            }
                                        }
                                    });
                                }
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Crm';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },


    //customer *

    customerUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },
                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCustomer: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                Customer.saveData(singleData, function (err, found) {
                                    if (err) {
                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                        successObj.error = err;
                                        successObj.Success = null;
                                        arrData.push(successObj);
                                        callback(null, err);
                                        failureCount++;
                                    } else {
                                        if (_.isEmpty(found)) {
                                            callback(null, err);
                                        } else {
                                            sucessCount++;
                                            successObj.error = null;
                                            successObj.Success = found;
                                            finalData.sucessCount = sucessCount;
                                            finalData.totalCount = sucessCount + failureCount;
                                            finalData.failureCount = failureCount;
                                            finalData.found = found;
                                            arrData.push(successObj);
                                            delete finalData.found
                                            callback(null, finalData, arrData);
                                        }
                                    }
                                });
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Customer';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },


    //customerNote

    customerNoteUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },
                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForCustomerNote: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                if (singleData.customerId) {
                                    Customer.findOne({
                                        customerId: singleData.customerId
                                    }).exec(function (err, found) {
                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            if (found) {
                                                singleData.customerId = found._id;
                                                CustomerNote.saveData(singleData, function (err, found) {
                                                    if (err) {
                                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                                        successObj.error = err;
                                                        successObj.Success = null;
                                                        arrData.push(successObj);
                                                        callback(null, err);
                                                        failureCount++;
                                                    } else {
                                                        if (_.isEmpty(found)) {
                                                            callback(null, err);
                                                        } else {
                                                            sucessCount++;
                                                            successObj.error = null;
                                                            successObj.Success = found;
                                                            finalData.sucessCount = sucessCount;
                                                            finalData.totalCount = sucessCount + failureCount;
                                                            finalData.failureCount = failureCount;
                                                            finalData.found = found;
                                                            arrData.push(successObj);
                                                            delete finalData.found
                                                            callback(null, finalData, arrData);
                                                        }
                                                    }
                                                });
                                            } else {
                                                callback({
                                                    message: "Incorrect Credentials!"
                                                }, null);
                                            }
                                        }
                                    });
                                } else {
                                    CustomerNote.saveData(singleData, function (err, found) {
                                        if (err) {
                                            console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                            successObj.error = err;
                                            successObj.Success = null;
                                            arrData.push(successObj);
                                            callback(null, err);
                                            failureCount++;
                                        } else {
                                            if (_.isEmpty(found)) {
                                                callback(null, err);
                                            } else {
                                                sucessCount++;
                                                successObj.error = null;
                                                successObj.Success = found;
                                                finalData.sucessCount = sucessCount;
                                                finalData.totalCount = sucessCount + failureCount;
                                                finalData.failureCount = failureCount;
                                                finalData.found = found;
                                                arrData.push(successObj);
                                                delete finalData.found
                                                callback(null, finalData, arrData);
                                            }
                                        }
                                    });
                                }
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'CustomerNote';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });
            }
        });
    },


    //itemId

    itemUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
                    field: "organizationId",
                    description: "String"
                },
                {
                    field: "itemId",
                    description: "String"
                }, {
                    field: "promptToAdd",
                    description: "String"
                }, {
                    field: "applyRestockingFee",
                    description: "String"
                }, {
                    field: "disallowDiscounts",
                    description: "String"
                }, {
                    field: "disallowPriceChange",
                    description: "String"
                }, {
                    field: "forceQuantityOfOne",
                    description: "String"
                }, {
                    field: "frequentShopperPointsCount",
                    description: "String"
                }, {
                    field: "frequentShopperPointsIneligible",
                    description: "String"
                }, {
                    field: "itemUrl",
                    description: "String"
                }, {
                    field: "maximumSaleUnitCount",
                    description: "Number"
                }, {
                    field: "minimumSaleUnitCount",
                    description: "Number"
                }, {
                    field: "listPrice",
                    description: "Number"
                }, {
                    field: "noGiveaways",
                    description: "String"
                }, {
                    field: "notInventoried",
                    description: "String"
                }, {
                    field: "notReturnable",
                    description: "String"
                }, {
                    field: "restockingFee",
                    description: "String"
                }, {
                    field: "hazardousMaterial",
                    description: "String"
                }, {
                    field: "noRainCheckAllowed",
                    description: "String"
                }, {
                    field: "minAgeRequired",
                    description: "Number"
                }, {
                    field: "foodStampEligible",
                    description: "String"
                }, {
                    field: "shippingWeight",
                    description: "Number"
                }, {
                    field: "manufacturerUpc",
                    description: "String"
                }, {
                    field: "manufacturer",
                    description: "String"
                }, {
                    field: "restrictionCategory",
                    description: "String"
                }, {
                    field: "restrictionCode",
                    description: "String"
                }, {
                    field: "region",
                    description: "String"
                }, {
                    field: "dayCode",
                    description: "String"
                }, {
                    field: "effectiveDate",
                    description: "Date"
                }, {
                    field: "startTime",
                    description: "Date"
                }, {
                    field: "expirationDate",
                    description: "Date"
                }, {
                    field: "endTime",
                    description: "Date"
                }, {
                    field: "itemLevelCode",
                    description: "String"
                }, {
                    field: "itemTypeCode",
                    description: "String"
                }, {
                    field: "warrantyItemId",
                    description: "String"
                }, {
                    field: "itemCeilingPrice",
                    description: "Number"
                }, {
                    field: "ceilingPriceType",
                    description: "String"
                }, {
                    field: "zlcWarrantyItem",
                    description: "String"
                }, {
                    field: "warrantyNumber",
                    description: "Number"
                }, {
                    field: "warrantyTypeCode",
                    description: "String"
                }, {
                    field: "serviceNumber",
                    description: "Number"
                }, {
                    field: "serviceDate",
                    description: "Date"
                }, {
                    field: "serviceByEmployee",
                    description: "String"
                }, {
                    field: "serviceTypeCode",
                    description: "String"
                }, {
                    field: "serviceProviderId",
                    description: "String"
                }, {
                    field: "groupName",
                    description: "String"
                }, {
                    field: "beginDate",
                    description: "Date"
                }, {
                    field: "endDate",
                    description: "Date"
                }, {
                    field: "sequence",
                    description: "String"
                }, {
                    field: "vendorType",
                    description: "String"
                }, {
                    field: "vendorId",
                    description: "String"
                }, {
                    field: "description",
                    description: "String"
                }, {
                    field: "subClassId",
                    description: "String"
                },
                //  {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForItem: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};

                                if (singleData.organizationId && singleData.warrantyItemId) {
                                    Company.findOne({
                                        organizationId: singleData.organizationId
                                    }).exec(function (err, found) {
                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            if (found) {

                                                WarrantyItem.findOne({
                                                    warrantyItemId: singleData.warrantyItemId
                                                }).exec(function (err, found1) {
                                                    if (err) {
                                                        callback(err, null);
                                                    } else {
                                                        if (found1) {

                                                            singleData.organizationId = found._id;;
                                                            singleData.warrantyItemId = found1._id;
                                                            Item.saveData(singleData, function (err, found) {
                                                                if (err) {
                                                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                                                    successObj.error = err;
                                                                    successObj.Success = null;
                                                                    arrData.push(successObj);
                                                                    callback(null, err);
                                                                    failureCount++;
                                                                } else {
                                                                    if (_.isEmpty(found)) {
                                                                        callback(null, err);
                                                                    } else {
                                                                        sucessCount++;
                                                                        successObj.error = null;
                                                                        successObj.Success = found;
                                                                        finalData.sucessCount = sucessCount;
                                                                        finalData.totalCount = sucessCount + failureCount;
                                                                        finalData.failureCount = failureCount;
                                                                        finalData.found = found;
                                                                        arrData.push(successObj);
                                                                        delete finalData.found
                                                                        callback(null, finalData, arrData);
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            callback({
                                                                message: "Incorrect Credentials!"
                                                            }, null);
                                                        }
                                                    }
                                                });
                                            } else {
                                                callback({
                                                    message: "Incorrect Credentials!"
                                                }, null);
                                            }
                                        }
                                    });
                                } else {
                                    Item.saveData(singleData, function (err, found) {
                                        if (err) {
                                            console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                            successObj.error = err;
                                            successObj.Success = null;
                                            arrData.push(successObj);
                                            callback(null, err);
                                            failureCount++;
                                        } else {
                                            if (_.isEmpty(found)) {
                                                callback(null, err);
                                            } else {
                                                sucessCount++;
                                                successObj.error = null;
                                                successObj.Success = found;
                                                finalData.sucessCount = sucessCount;
                                                finalData.totalCount = sucessCount + failureCount;
                                                finalData.failureCount = failureCount;
                                                finalData.found = found;
                                                arrData.push(successObj);
                                                delete finalData.found
                                                callback(null, finalData, arrData);
                                            }
                                        }
                                    });
                                }
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Item';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },


    //location


    LocationUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },
                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForLocation: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                if (singleData.organizationId) {
                                    Company.findOne({
                                        organizationId: singleData.organizationId
                                    }).exec(function (err, found) {
                                        if (err) {
                                            callback(err, null);
                                        } else {
                                            if (found) {
                                                singleData.organizationId = found._id;
                                                Locations.saveData(singleData, function (err, found) {
                                                    if (err) {
                                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                                        successObj.error = err;
                                                        successObj.Success = null;
                                                        arrData.push(successObj);
                                                        callback(null, err);
                                                        failureCount++;
                                                    } else {
                                                        if (_.isEmpty(found)) {
                                                            callback(null, err);
                                                        } else {
                                                            sucessCount++;
                                                            successObj.error = null;
                                                            successObj.Success = found;
                                                            finalData.sucessCount = sucessCount;
                                                            finalData.totalCount = sucessCount + failureCount;
                                                            finalData.failureCount = failureCount;
                                                            finalData.found = found;
                                                            arrData.push(successObj);
                                                            delete finalData.found
                                                            callback(null, finalData, arrData);
                                                        }
                                                    }
                                                });
                                            } else {
                                                callback({
                                                    message: "Incorrect Credentials!"
                                                }, null);
                                            }
                                        }
                                    });
                                } else {
                                    Locations.saveData(singleData, function (err, found) {
                                        if (err) {
                                            console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                            successObj.error = err;
                                            successObj.Success = null;
                                            arrData.push(successObj);
                                            callback(null, err);
                                            failureCount++;
                                        } else {
                                            if (_.isEmpty(found)) {
                                                callback(null, err);
                                            } else {
                                                sucessCount++;
                                                successObj.error = null;
                                                successObj.Success = found;
                                                finalData.sucessCount = sucessCount;
                                                finalData.totalCount = sucessCount + failureCount;
                                                finalData.failureCount = failureCount;
                                                finalData.found = found;
                                                arrData.push(successObj);
                                                delete finalData.found
                                                callback(null, finalData, arrData);
                                            }
                                        }
                                    });
                                }
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Locations';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });
            }
        });
    },


    //transaction

    TransactionUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
                    field: "organizationId",
                    description: "Date"
                }, {
                    field: "businessDate",
                    description: "Date"
                }, {
                    field: "transactionSequence",
                    description: "String"
                }, {
                    field: "workstationId",
                    description: "String"
                }, {
                    field: "retailTransactionLineItemSequence",
                    description: "String"
                }, {
                    field: "transactionType",
                    description: "String"
                }, {
                    field: "paymentMode",
                    description: "String"
                },
                {
                    field: "transactionVoidFlag",
                    description: "String"
                },
                {
                    field: "transactionNumber",
                    description: "String"
                },
                {
                    field: "transactionReferenceNumber",
                    description: "String"
                }, {
                    field: "cardNumber",
                    description: "Number"
                },
                {
                    field: "tillNumber",
                    description: "Number"
                }, {
                    field: "itemId",
                    description: "Number"
                },
                {
                    field: "quantity",
                    description: "Number"
                }, {
                    field: "amount",
                    description: "Number"
                }, {
                    field: "netAmount",
                    description: "Number"
                }, {
                    field: "custAccountId",
                    description: "Number"
                }, {
                    field: "activityDate",
                    description: "Date"
                }, {
                    field: "time",
                    description: "Date"
                }, {
                    field: "customerId",
                    description: "String"
                }, {
                    field: "custAccountCode",
                    description: "String"
                }, {
                    field: "effectiveDate",
                    description: "Date"
                }, {
                    field: "expirationDate",
                    description: "Date"
                }, {
                    field: "startTime",
                    description: "Date"
                }, {
                    field: "endTime",
                    description: "Date"
                }, {
                    field: "loyaltyProgramId",
                    description: "String"
                }, {
                    field: "historySequence",
                    description: "String"
                }, {
                    field: "customerGroupId",
                    description: "String"
                },
                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForTransaction: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatLimit(data, 20, function (singleData, callback) {
                                var successObj = {};
                                Transaction.saveData(singleData, function (err, found) {
                                    if (err) {
                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                        successObj.error = err;
                                        successObj.Success = null;
                                        arrData.push(successObj);
                                        callback(null, err);
                                        failureCount++;
                                    } else {
                                        if (_.isEmpty(found)) {
                                            callback(null, err);
                                        } else {
                                            sucessCount++;
                                            successObj.error = null;
                                            successObj.Success = found;
                                            finalData.sucessCount = sucessCount;
                                            finalData.totalCount = sucessCount + failureCount;
                                            finalData.failureCount = failureCount;
                                            finalData.found = found;
                                            arrData.push(successObj);
                                            delete finalData.found
                                            callback(null, finalData, arrData);
                                        }
                                    }
                                });
                            }, function (err, found) {
                                console.log("data--", finalData);

                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            console.log("data---finalData-----finalData", finalData);
                            console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'Transaction';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },


    //warrantyItem *

    warrantyItemUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                },

                // {
                //     field: "custId",
                //     description: "This is a Id"
                // }
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForWarranty: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                var totalCount = 0;
                var sucessCount = 0;
                var failureCount = 0;
                var arrData = [];
                var finalData = {};
                var eData = {};
                var dataFinal = {};
                async.waterfall([
                        function (callback) {
                            async.concatSeries(data, function (singleData, callback) {
                                var successObj = {};
                                WarrantyItem.saveData(singleData, function (err, found) {
                                    if (err) {
                                        console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                        successObj.error = err;
                                        successObj.Success = null;
                                        arrData.push(successObj);
                                        callback(null, err);
                                        failureCount++;
                                    } else {
                                        if (_.isEmpty(found)) {
                                            callback(null, err);
                                        } else {
                                            sucessCount++;
                                            successObj.error = null;
                                            successObj.Success = found;
                                            finalData.sucessCount = sucessCount;
                                            finalData.totalCount = sucessCount + failureCount;
                                            finalData.failureCount = failureCount;
                                            finalData.found = found;
                                            arrData.push(successObj);
                                            delete finalData.found
                                            callback(null, finalData, arrData);
                                        }
                                    }
                                });
                            }, function (err, found) {
                                callback(err, finalData, arrData);
                            });
                        },
                        function (finalData, arrData, callback) {
                            // console.log("data---finalData-----finalData", finalData);
                            // console.log("arrDataarrDataarrData---finalData-----finalData", arrData);
                            eData.tableName = 'WarrantyItem';
                            eData.logs = arrData;
                            AllLogs.saveData(eData, function (err, found) {
                                if (err) {
                                    console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                                    callback(err, null);
                                } else {
                                    if (_.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        // console.log("dataFinal----", finalData);
                                        callback(null, finalData);
                                    }
                                }
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            console.log('********** error at final response of asynch.waterfall in search************', err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(found)) {
                                res.callback(err, null);
                            } else {
                                res.callback(null, found);
                            }
                        }
                    });


            }
        });
    },


    //user

    userUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "name", "email", "dob", "photo", "password", "mobile", "otp", "accessToken", "accessLevel"
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },

    finalUploadForUser: function (req, res) {
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                async.concatSeries(data, function (singleData, callback) {
                    if (singleData.custId) {
                        Customer.findOne({
                            custId: singleData.custId
                        }).exec(function (err, found) {
                            if (err) {
                                callback(err, null);
                            } else {
                                if (found) {
                                    singleData.custId = found._id;
                                    User.saveData(singleData, function (err, data) {
                                        callback(null, {
                                            error: err,
                                            success: data
                                        });
                                    });
                                } else {
                                    callback({
                                        message: "Incorrect Credentials!"
                                    }, null);
                                }
                            }

                        });
                    } else {
                        User.saveData(singleData, function (err, data) {
                            callback(null, {
                                error: err,
                                success: data
                            });
                        });
                    }
                }, res.callback);
            }
        });
    },


};
module.exports = controller;