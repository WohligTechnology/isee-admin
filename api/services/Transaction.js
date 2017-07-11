var schema = new Schema({
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
    businessDate: Date,
    transactionSequence: String,
    workstationId: String,
    retailTransactionLineItemSequence: String,
    transactionType: String,
    activityDate: Date,
    amount: Number,
    cardNumber: Number,
    custAccountCode: String,
    effectiveDate: Date,
    expirationDate: Date,
    startTime: String,
    endTime: String,
    loyaltyProgramId: String,
    historySequence: String,
    CustomerGroupId: String

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Transaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);