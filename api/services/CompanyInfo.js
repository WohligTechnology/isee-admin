var schema = new Schema({
    reasonTypeCode: String,
    reasonCode: String,
    description: String,
    commentRequired: String,
    sortOrder: {
        type: String,
        enum: ['Asc', 'Desc']
    },
    parentCode: String,
    glAccountNumber: String,
    minimumAmt: String,
    maximumAmt: String,
    privilegeType: String,
    customerMessage: String,
    inventoryActionCode: String,
    inventoryLocationId: String,
    inventoryBucketId: String,
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('CompanyInfo', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);