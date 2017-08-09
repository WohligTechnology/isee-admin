var controller = {


    //company..

    companyUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
            }]; //fields in schema
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
        console.log("reqqqq*********************************", req.body);
        Config.importGSForCustomFields(req.body.name, req.body.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                async.concatSeries(data, function (singleData, callback) {
                    Company.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },

    // companyContact upload

    companyContactUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                async.concatSeries(data, function (singleData, callback) {
                    CompanyContact.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //companyInfo

    companyInfoUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                async.concatSeries(data, function (singleData, callback) {
                    CompanyInfo.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //crm

    crmUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
                field: "customerGroupId",
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
            }];
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
                async.concatSeries(data, function (singleData, callback) {
                    Crm.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //customer

    customerUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
            }];
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
                async.concatSeries(data, function (singleData, callback) {
                    Customer.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //customerNote

    customerNoteUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
                    field: "noteSequence",
                    description: "Note Sequence a number that can not be greater than 65000"
                }, {
                    field: "note",
                    description: "This is a string of length less than 140 characters."
                }, {
                    field: "noteTimeStamp",
                    description: "This is a timestamp"
                },
                {
                    field: "custId",
                    description: "This is a Id"
                }
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
                async.concatSeries(data, function (singleData, callback) {
                    CustomerNote.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //itemId

    itemUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
            }];
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
                async.concatSeries(data, function (singleData, callback) {
                    Item.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //location


    LocationUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                async.concatSeries(data, function (singleData, callback) {
                    Locations.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //transaction

    TransactionUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
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
                field: "activityDate",
                description: "Date"
            }, {
                field: "amount",
                description: "Number"
            }, {
                field: "cardNumber",
                description: "Number"
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
                field: "CustomerGroupId",
                description: "String"
            }];
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
                async.concatSeries(data, function (singleData, callback) {
                    Transaction.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


    //warrantyItem

    warrantyItemUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [{
                field: "warrantyType",
                description: "Date"
            }, {
                field: "warrantySubtype",
                description: "Date"
            }, {
                field: "description",
                description: "Date"
            }, {
                field: "replaceType",
                description: "Date"
            }];
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
                async.concatSeries(data, function (singleData, callback) {
                    WarrantyItem.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
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
                    User.saveData(singleData, function (err, data) {
                        callback(null, {
                            error: err,
                            success: data
                        });
                    });
                }, res.callback);
            }
        });
    },


};
module.exports = controller;