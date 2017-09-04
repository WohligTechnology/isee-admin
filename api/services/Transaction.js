var schema = new Schema({
    organizationId: {
        type: String,
        es_indexed: true
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
        type: Number,
        es_indexed: true
    },
    itemId: String,
    quantity: String,
    amount: Number,
    netAmount: Number,
    custAccountId: {
        type: String,
        es_indexed: true
    },
    activityDate: Date,
    time: Date,
    customerId: {
        type: String,
        es_indexed: true
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

    ////////////
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        index: true,
        key: "transaction"
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        index: true,
        key: "transaction"
    },
    crm: {
        type: Schema.Types.ObjectId,
        ref: 'Crm',
        index: true,
        key: "transaction"
    },
    records: String,
    retailLocationId: {
        type: String,
        es_indexed: true
    },
    randNoTransactionVoidFlag: Number,
    randomNoForCustId: Number,
    //custId

    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Transaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
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
                activityDate: function (callback) {
                    Calendar.getFromId("activityDate", data.activityDate, callback);
                },
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
                    Transaction.saveData(data, callback);
                }
            });
    }

};
module.exports = _.assign(module.exports, exports, model);