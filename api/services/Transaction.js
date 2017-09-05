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

    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Transaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "organizationId retailLocationId customerId activityDate itemId tillNumber itemId.warrantyItemId  retailLocationId.organizationId tillNumber.retailLocationId itemId.organizationId", "organizationId retailLocationId customerId activityDate itemId tillNumber itemId.warrantyItemId retailLocationId.organizationId tillNumber.retailLocationId itemId.organizationId"));
var model = {

    saveOnExcel: function (data, callback) {
        async.parallel({
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
                // activityDate: function (callback) {
                //     Calendar.getFromId("activityDate", data.activityDate, callback);
                // },
                tillNumber: function (callback) {
                    TillRegister.getFromId("tillNumber", data.tillNumber, callback);
                }
            },
            function (err, result) {
                console.log(err);
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    data = _.assign(data, result);
                    Transaction.saveData(data, function (err, data) {
                        if (err || _.isEmpty(data)) {
                            callback(err);
                        } else {
                            Transaction.findOne({
                                _id: data._id
                            }).lean().deepPopulate("itemId.organizationId itemId.warrantyItemId organizationId retailLocationId customerId activityDate itemId tillNumber retailLocationId.organizationId tillNumber.retailLocationId").exec(function (err, found) {
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
                                    sendData._id = found._id;
                                    sendData.transactionJson = AllData;
                                    // AllData.ItemData = found.itemId;
                                    console.log("AllData---------", AllData);
                                    Transaction.saveData(sendData, function (err, data1) {
                                        if (err || _.isEmpty(data1)) {
                                            callback(err);
                                        } else {
                                            callback(null, data);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
    },

    // findAllDetails: function (data, callback) {
    //     Transaction.findOne({
    //         _id: data._id
    //     }).lean().deepPopulate("itemId.organizationId itemId.warrantyItemId organizationId retailLocationId customerId activityDate itemId tillNumber retailLocationId.organizationId tillNumber.retailLocationId").exec(function (err, found) {
    //         if (err || _.isEmpty(found)) {
    //             callback(err, null);
    //         } else {
    //             var AllData = {};
    //             var sendData = {};
    //             AllData.itemData = found.itemId;
    //             AllData.companyData = found.organizationId;
    //             AllData.locationData = found.retailLocationId;
    //             AllData.tillRegisterData = found.tillNumber;
    //             AllData.customerData = found.customerId;
    //             sendData._id = found._id;
    //             sendData.transactionJson = AllData;
    //             // AllData.ItemData = found.itemId;
    //             console.log("AllData---------", AllData);
    //             Transaction.saveData(sendData, callback);
    //             // callback(null, found);
    //         }
    //     });
    // }
};
module.exports = _.assign(module.exports, exports, model);