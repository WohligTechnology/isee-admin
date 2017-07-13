var schema = new Schema({
    promptToAdd: String,
    applyRestockingFee: String,
    disallowDiscounts: {
        type: String,
        es_indexed: true
    },
    disallowPriceChange: String,
    forceQuantityOfOne: String,
    frequentShopperPointsCount: String,
    frequentShopperPointsIneligible: String,
    itemUrl: String,
    maximumSaleUnitCount: Number,
    minimumSaleUnitCount: Number,
    listPrice: Number,
    noGiveaways: String,
    notInventoried: String,
    notReturnable: String,
    restockingFee: String,
    hazardousMaterial: String,
    noRainCheckAllowed: String,
    minAgeRequired: Number,
    foodStampEligible: String,
    shippingWeight: Number,
    manufacturerUpc: String,
    manufacturer: String,
    restrictionCategory: String,
    restrictionCode: String,
    region: {
        type: String,
        es_indexed: true
    },
    dayCode: String,
    effectiveDate: Date,
    startTime: Date,
    expirationDate: Date,
    endTime: Date,
    itemLevelCode: {
        type: String,
        es_indexed: true
    },
    itemTypeCode: {
        type: String,
        es_indexed: true
    },
    warrantyItemId: {
        type: String,
        es_indexed: true
    },
    itemCeilingPrice: Number,
    ceilingPriceType: String,
    zlcWarrantyItem: String,
    warrantyNumber: {
        type: Number,
        es_indexed: true
    },
    warrantyTypeCode: {
        type: String,
        es_indexed: true
    },
    serviceNumber: {
        type: Number,
        es_indexed: true
    },
    serviceDate: {
        type: Date,
        es_indexed: true
    },
    serviceByEmployee: {
        type: String,
        es_indexed: true
    },
    serviceTypeCode: {
        type: String,
        es_indexed: true
    },
    serviceProviderId: {
        type: String,
        es_indexed: true
    },
    groupName: String,
    beginDate: Date,
    endDate: Date,
    sequence: String,
    vendorType: {
        type: String,
        es_indexed: true
    },
    vendorId: {
        type: String,
        es_indexed: true
    },
    description: String,
    subClassId: {
        type: String,
        es_indexed: true
    },
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        index: true
    }],
    warrantyItem: {
        type: Schema.Types.ObjectId,
        ref: 'WarrantyItem',
        index: true,
        key: "item"
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Item', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);