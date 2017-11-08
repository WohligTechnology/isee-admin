var schema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
    },
    businessDate: Date,
    transactionSequence: String,
    workstationId: {
        type: String,
        es_indexed: true
    },
    retailTransactionLineItemSequence: String,
    transactionType: {
        type: String,
        es_indexed: true
    },
    paymentMode: String,
    transactionVoidFlag: String,
    transactionNumber: Number,
    transactionReferenceNumber: Number,
    cardNumber: {
        type: String,
        es_indexed: true
    },
    tillNumber: {
        type: Schema.Types.ObjectId,
        ref: 'TillRegister',
        index: true,
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        index: true,
    },
    quantity: String,
    amount: Number,
    netAmount: Number,
    custAccountId: {
        type: String,
        es_indexed: true
    },
    activityDate: {
        type: Schema.Types.ObjectId,
        ref: 'Calendar',
        index: true,
    },
    time: Date,
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        index: true,
    },
    custAccountCode: {
        type: String,
        es_indexed: true
    },
    effectiveDate: Date,
    expirationDate: Date,
    startTime: Date,
    endTime: Date,
    loyaltyProgramId: {
        type: String,
        es_indexed: true
    },
    historySequence: String,
    customerGroupId: {
        type: String,
        es_indexed: true
    },
    records: String,
    retailLocationId: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
        index: true,
    },
    randNoTransactionVoidFlag: Number,
    randomNoForCustId: Number,
    transactionJson: {
        type: Schema.Types.Mixed
    },
    crm: {
        type: Schema.Types.ObjectId,
        ref: 'Crm',
        index: true
    },
    companycontact: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyContact',
        index: true
    },
    companyinfo: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyInfo',
        index: true
    },
    customernote: {
        type: Schema.Types.ObjectId,
        ref: 'CustomerNote',
        index: true
    },
    violations: [{
        type: Schema.Types.ObjectId,
        ref: 'RuleEngine',
        index: true
    }]

    ////////////

    // location: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Locations',
    //     index: true,
    //     key: "transaction"
    // },
    // item: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Item',
    //     index: true,
    //     key: "transaction"
    // },
    // crm: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Crm',
    //     index: true,
    //     key: "transaction"
    // },

});

schema.plugin(deepPopulate, {
    populate: {
        organizationId: {
            select: ""
        },
        retailLocationId: {
            select: ""
        },
        "retailLocationId.organizationId": {
            select: ""
        },
        customerId: {
            select: ""
        },
        activityDate: {
            select: ""
        },
        itemId: {
            select: ""
        },
        "itemId.warrantyItemId": {
            select: ""
        },
        "itemId.organizationId": {
            select: ""
        },
        tillNumber: {
            select: ""
        },
        "tillNumber.retailLocationId": {
            select: ""
        },
        crm: {
            select: ""
        },
        companycontact: {
            select: ""
        },
        companyinfo: {
            select: ""
        },
        customernote: {
            select: ""
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Transaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "organizationId retailLocationId customerId activityDate itemId tillNumber itemId.warrantyItemId  retailLocationId.organizationId tillNumber.retailLocationId itemId.organizationId crm", "organizationId retailLocationId customerId activityDate itemId tillNumber itemId.warrantyItemId retailLocationId.organizationId tillNumber.retailLocationId itemId.organizationId crm"));
var model = {

    saveOnExcel: function (data, callback) {
        var oldData = _.cloneDeep(data);
        async.series({
                organizationId: function (callback) {
                    Company.getFromId("organizationId", data.organizationId, callback);
                },
                customerId: function (callback) {
                    Customer.getFromId("customerId", data.customerId, callback);
                },
                retailLocationId: function (callback) {
                    Locations.getFromId("retailLocationId", data.retailLocationId, callback);
                },
                itemId: function (callback) {
                    Item.getFromId("itemId", data.itemId, callback);
                },
                activityDate: function (callback) {
                    Calendar.getFromId("activityDate", data.activityDate, callback);
                },
                tillNumber: function (callback) {
                    TillRegister.getFromId("tillNumber", data.tillNumber, callback);
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    async.waterfall([
                            function (callback) {
                                data = _.assign(data, result);
                                Transaction.saveData(data, function (err, data) {
                                    if (err || _.isEmpty(data)) {
                                        callback(err);
                                    } else {
                                        callback(null, data);
                                    }
                                });
                            },
                            function (data, callback) {
                                async.series({
                                        crmId: function (callback) {
                                            var crmData = {};
                                            crmData.organizationId = data.organizationId;
                                            crmData.customerId = data.customerId;
                                            Crm.getAllDataFromId(crmData, callback);
                                        },
                                        itemId: function (callback) {
                                            var itemData = {};
                                            itemData.organizationId = data.organizationId;
                                            itemData.itemId = oldData.itemId;
                                            Item.getAllDataFromId(itemData, callback);
                                        },
                                        locationId: function (callback) {
                                            var locationData = {};
                                            locationData.organizationId = data.organizationId;
                                            locationData.retailLocationId = oldData.retailLocationId;
                                            Locations.getAllDataFromId(locationData, callback);
                                        },
                                        tillRegisterId: function (callback) {
                                            var tillRegisterData = {};
                                            tillRegisterData.tillNumber = oldData.tillNumber;
                                            tillRegisterData.retailLocationId = data.retailLocationId;
                                            TillRegister.getAllDataFromId(tillRegisterData, callback);
                                        },
                                        companyContactId: function (callback) {
                                            var companyContactData = {};
                                            companyContactData.organizationId = data.organizationId;
                                            CompanyContact.getAllDataFromId(companyContactData, callback);
                                        },
                                        companyInfoId: function (callback) {
                                            var companyInfoData = {};
                                            companyInfoData.organizationId = data.organizationId;
                                            CompanyInfo.getAllDataFromId(companyInfoData, callback);
                                        },
                                        // customerNoteId: function (callback) {
                                        //     var customerNoteData = {};
                                        //     customerNoteData.customerId = data.customerId;
                                        //     CustomerNote.getAllDataFromId(customerNoteData, callback);
                                        // }
                                    },
                                    function (err, result1) {
                                        if (err || _.isEmpty(result1)) {
                                            callback(err);
                                        } else {
                                            Transaction.findOneAndUpdate({
                                                _id: data._id
                                            }, {
                                                crm: result1.crmId,
                                                itemId: result1.itemId,
                                                retailLocationId: result1.locationId,
                                                tillNumber: result1.tillRegisterId,
                                                companycontact: result1.companyContactId,
                                                companyinfo: result1.companyInfoId,
                                                // customernote: result1.customerNoteId,
                                            }, {
                                                new: true
                                            }, function (err, updatedata) {
                                                if (err || _.isEmpty(updatedata)) {
                                                    callback(err);
                                                } else {
                                                    callback(null, updatedata);
                                                }
                                            })
                                        }
                                    });
                            },
                            function (updatedata, callback) {
                                Transaction.findOne({
                                    _id: updatedata._id
                                }).lean().deepPopulate("itemId.organizationId itemId.warrantyItemId organizationId retailLocationId customerId activityDate itemId tillNumber retailLocationId.organizationId tillNumber.retailLocationId crm companycontact companyinfo customernote").exec(function (err, found) {
                                    if (err || _.isEmpty(found)) {
                                        callback(err, null);
                                    } else {
                                        var AllData = {};
                                        var sendData = {};
                                        AllData.itemData = found.itemId;
                                        AllData.companyData = found.organizationId;
                                        AllData.locationData = found.retailLocationId;
                                        AllData.tillRegisterData = found.tillNumber;
                                        AllData.customerData = found.customerId;
                                        AllData.calendarData = found.activityDate;
                                        AllData.crmData = found.crm;
                                        AllData.companyContactData = found.companycontact;
                                        AllData.companyInfoData = found.companyinfo;
                                        // AllData.customerNoteData = found.customernote;
                                        sendData._id = found._id;
                                        sendData.transactionJson = AllData;
                                        Transaction.saveData(sendData, function (err, data1) {
                                            if (err || _.isEmpty(data1)) {
                                                callback(err);
                                            } else {
                                                callback(null, updatedata);
                                            }
                                        });
                                    }
                                });
                            },
                        ],
                        function (err, results) {
                            if (err || _.isEmpty(results)) {
                                callback(err);
                            } else {
                                callback(null, results);
                            }
                        }
                    );
                }
            });
    },

    clearAllPreviousViolations: function (transactionId, callback) {
        Transaction.findOne({
            _id: transactionId
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err);
            } else {
                data.violations = [];
                data.save(callback);
            }
        });
    },

    addViolation: function (transactionId, ruleEngineId, callback) {
        Transaction.findOne({
            _id: transactionId
        }).lean().exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err);
            } else {
                if (data.violations) {
                    data.violations.push(ruleEngineId);
                    data.violations = _.uniqBy(data.violations, function (n) {
                        return n + "";
                    });
                } else {
                    data.violations = [];
                    data.violations.push(ruleEngineId);
                    data.violations = _.uniqBy(data.violations, function (n) {
                        return n + "";
                    });
                }
                Transaction.saveData(data, function (err, data1) {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, data);
                    }
                });
            }
        });
    },

    removeARuleFromTransaction: function (ruleId, callback) {
        Transaction.find({
            "violations": {
                $elemMatch: {
                    $in: [ObjectId(ruleId.ruleId)]
                }
            }
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(null, null);
            } else {
                async.concatLimit(data, 30, function (singleTransaction, callback) {
                    var violations = _.cloneDeep(singleTransaction.violations);
                    _.remove(violations, function (n) {
                        return n == ruleId.ruleId;
                    });
                    singleTransaction.violations = violations;
                    singleTransaction.save(callback);
                }, callback);
            }
        });
    },

    getViolationsForARule: function (data, callback) {
        var maxRow = Config.maxRow;
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        Transaction.find({
                "violations": {
                    $elemMatch: {
                        $in: [ObjectId(data.ruleId)]
                    }
                }
            }).order(options)
            .keyword(options)
            .page(options, function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err, []);
                } else {
                    callback(null, data);
                }
            });
    },

    getViolatedTransaction: function (data, callback) {
        Transaction.findOne({
            _id: data.id
        }).lean().deepPopulate("itemId.organizationId itemId.warrantyItemId organizationId retailLocationId customerId activityDate itemId tillNumber retailLocationId.organizationId tillNumber.retailLocationId crm companycontact companyinfo customernote").exec(function (err, found) {
            if (err || _.isEmpty(found)) {
                callback(err, []);
            } else {
                callback(null, found);
            }
        });
    },

    // saveOnExcel: function (data, callback) {
    //     async.parallel({
    //             organizationId: function (callback) {
    //                 Company.getFromId("organizationId", data.organizationId, callback);
    //             },
    //             customerId: function (callback) {
    //                 Customer.getFromId("customerId", data.customerId, callback);
    //             },
    //             retailLocationId: function (callback) {
    //                 Locations.getFromId("retailLocationId", data.retailLocationId, callback);
    //             },
    //             itemId: function (callback) {
    //                 Item.getFromId("itemId", data.itemId, callback);
    //             },
    //             activityDate: function (callback) {
    //                 Calendar.getFromId("activityDate", data.activityDate, callback);
    //             },
    //             tillNumber: function (callback) {
    //                 TillRegister.getFromId("tillNumber", data.tillNumber, callback);
    //             }
    //         },
    //         function (err, result) {
    //             console.log("parallel result", result);
    //             if (err || _.isEmpty(result)) {
    //                 callback(err);
    //             } else {
    //                 data = _.assign(data, result);
    //                 console.log("data", data);
    //                 Transaction.saveData(data, function (err, data) {
    //                     if (err || _.isEmpty(data)) {
    //                         callback(err);
    //                     } else {
    //                         Transaction.findOne({
    //                             _id: data._id
    //                         }).lean().deepPopulate("itemId.organizationId itemId.warrantyItemId organizationId retailLocationId customerId activityDate itemId tillNumber retailLocationId.organizationId tillNumber.retailLocationId").exec(function (err, found) {
    //                             if (err || _.isEmpty(found)) {
    //                                 callback(err, null);
    //                             } else {
    //                                 var AllData = {};
    //                                 var sendData = {};
    //                                 AllData.itemData = found.itemId;
    //                                 AllData.companyData = found.organizationId;
    //                                 AllData.locationData = found.retailLocationId;
    //                                 AllData.tillRegisterData = found.tillNumber;
    //                                 AllData.customerData = found.customerId;
    //                                 AllData.calendarData = found.activityDate;
    //                                 sendData._id = found._id;
    //                                 sendData.transactionJson = AllData;
    //                                 console.log("AllData---------", AllData);
    //                                 Transaction.saveData(sendData, function (err, data1) {
    //                                     if (err || _.isEmpty(data1)) {
    //                                         callback(err);
    //                                     } else {
    //                                         callback(null, data);
    //                                     }
    //                                 });
    //                             }
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    // },

    getRecordsByTransaction: function (data, callback) {
        Transaction.find({}).deepPopulate('violations').lean().exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    }
};
module.exports = _.assign(module.exports, exports, model);