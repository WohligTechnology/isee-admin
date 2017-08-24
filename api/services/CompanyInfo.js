var schema = new Schema({
    organizationId: {
        type: String,
        es_indexed: true
    },
    reasonTypeCode: {
        type: String,
        es_indexed: true
    },
    reasonCode: {
        type: String,
        es_indexed: true
    },
    description: String,
    commentRequired: String,
    sortOrder: {
        type: String,
        enum: ['Asc', 'Desc']
    },
    parentCode: {
        type: String,
        es_indexed: true
    },
    glAccountNumber: {
        type: Number,
        es_indexed: true
    },
    minimumAmt: Number,
    maximumAmt: Number,
    privilegeType: String,
    customerMessage: String,
    inventoryActionCode: {
        type: String,
        es_indexed: true
    },
    inventoryLocationId: {
        type: String,
        es_indexed: true
    },
    inventoryBucketId: {
        type: String,
        es_indexed: true
    },
    //custId

    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('CompanyInfo', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);