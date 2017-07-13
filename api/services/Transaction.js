var schema = new Schema({
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
    activityDate: Date,
    amount: Number,
    cardNumber: {
        type: Number,
        es_indexed: true
    },
    custAccountCode: {
        type: String,
        es_indexed: true
    },
    effectiveDate: Date,
    expirationDate: Date,
    startTime: String,
    endTime: String,
    loyaltyProgramId: {
        type: String,
        es_indexed: true
    },
    historySequence: String,
    CustomerGroupId: {
        type: String,
        es_indexed: true
    },
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
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Transaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);