var controller = {


    //company..

    companyUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "name", "region", "textCode", "textSequence", "textSubcode", "receiptText", "effectiveDate", "expirationDate", "recordState", "lineFormat", "reformat", "category", "beginRange", "endRange", "cost", "minimumCost", "maximumCost", "itemId", "location", "companyContact", "companyInfo"
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

    finalUpload: function (req, res) {
        req.body = {};
        req.body.companyExcel = {
            name: "5968634a742984b7745a21cc.xlsx",
            fields: [{
                    ourField: "firstName",
                    theirField: "name1"
                }, {
                    ourField: "middleName",
                    theirField: "name2"
                },
                {
                    ourField: "lastName",
                    theirField: "name3"
                }
            ]
        };
        Config.importGSForCustomFields(req.body.companyExcel.name, req.body.companyExcel.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                async.concatLimit(data, 20, function (singleData, callback) {
                    Demo.saveData(singleData, callback);
                }, function (err, data) {
                    res.callback(null, data);
                });
            }
        });
    },

    // companyContact upload

    companyContactUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "phoneNumberId", "phoneNumber", "phoneTypeCode", "contactDiscription", "sortOrder"
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

    //companyInfo

    companyInfoUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "reasonTypeCode", "reasonCode", "description", "commentRequired", "sortOrder", "parentCode", "glAccountNumber", "minimumAmt", "maximumAmt", "privilegeType", "customerMessage", "inventoryActionCode", "inventoryLocationId", "inventoryBucketId"
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

    //crm

    crmUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "customerGroupId", "salutation", "firstName", "middleName", "lastName", "gender", "totalTransactionCount", "totalSoldItemCount", "ytdReturnsAmount", "partyId", "idVerificationRequired", "partyId1", "totalReturnedItemCount", "totalReturnsAmount", "totalSalesAmount", "ytdReturnedItemCount", "ytdSalesAmount", "ytdSoldItemCount", "ytdTransactionCount", "allegianceRetailLocationId", "birthDate", "customerLevelCode", "employeeId", "federalTaxId", "legalStatusCode", "mailingList", "organizationName", "organizationTypeCode", "partyTypeCode", "pictureUri", "signUpRetailLocationId", "socialSecurityNumber", "stateTaxId", "suffix", "void", "anniversaryDate", "emailContact", "privacyCard", "commercialCustomer", "recordState", "processDate", "customerGroups", "creatorPartyId", "creatorParty", "customer", "customerNote", "transaction"
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

    //customer

    customerUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "address1", "address2", "apartment", "city", "country", "postalCode", "state", "email"
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

    //customerNote

    customerNoteUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "noteSequence", "note", "noteTimeStamp"
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

    //itemId

    itemUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "promptToAdd", "applyRestockingFee", "disallowDiscounts", "disallowPriceChange", "forceQuantityOfOne", "frequentShopperPointsCount", "frequentShopperPointsIneligible", "itemUrl", "maximumSaleUnitCount", "minimumSaleUnitCount", "listPrice", "noGiveaways", "notInventoried", "notReturnable", "restockingFee", "hazardousMaterial", "noRainCheckAllowed", "minAgeRequired", "foodStampEligible", "shippingWeight", "manufacturerUpc", "manufacturer", "restrictionCategory", "restrictionCode", "region", "dayCode", "effectiveDate", "startTime", "expirationDate", "endTime", "itemLevelCode", "itemTypeCode", "warrantyItemId", "itemCeilingPrice", "ceilingPriceType", "zlcWarrantyItem", "warrantyNumber", "warrantyTypeCode", "serviceNumber", "serviceDate", "serviceByEmployee", "serviceTypeCode", "serviceProviderId", "groupName", "beginDate", "endDate", "sequence", "vendorType", "vendorId", "description", "subClassId", "transaction", "warrantyItem"
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

    //location


    LocationUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "company", "transaction", "retailLocationId", "storeNumber", "storeName", "description", "effectiveDate", "expirationDate", "apartment", "address1", "address2", "city", "country", "postalCode", "state", "telephone1", "telephone2", "telephone3", "telephone4", "region", "loc", "taxPercentage", "storeManager", "locationType", "deliveryAvailable", "pickupAvailable", "transferAvailable", "email", "geoCode"
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

    //transaction

    TransactionUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "businessDate", "transactionSequence", "workstationId", "retailTransactionLineItemSequence", "transactionType", "activityDate", "amount", "cardNumber", "custAccountCode", "effectiveDate", "expirationDate", "startTime", "endTime", "loyaltyProgramId", "historySequence", "CustomerGroupId", "location", "item", "crm"
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

    //warrantyItem

    warrantyItemUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "warrantyType", "warrantySubtype", "description", "replaceType", "item"
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

};
module.exports = controller;