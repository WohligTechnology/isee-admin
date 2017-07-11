var schema = new Schema({
    location: [{
        type: Schema.Types.ObjectId,
        ref: "Location",
        index: true
    }],
    companyContact: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyContact',
        index: true
    },
    companyInfo: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyInfo',
        index: true
    },
    name: {
        type: String,
        required: true,
        es_indexed: true
    },
    region: String,
    textCode: String,
    textSequence: String,
    textSubcode: String,
    receiptText: String,
    effectiveDate: Date,
    expirationDate: Date,
    recordState: String,
    lineFormat: String,
    reformat: String,
    category: String,
    beginRange: String,
    endRange: String,
    cost: Number,
    minimumCost: Number,
    maximumCost: Number,
    itemId: String //item table
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Company', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);