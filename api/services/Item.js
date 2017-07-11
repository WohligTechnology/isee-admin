var schema = new Schema({
    promptToAdd: String,
    applyRestockingFee: String,
    disallowDiscounts: String,
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
    region: String,
    dayCode: String,
    effectiveDate: Date,
    startTime: Date,
    expirationDate: Date,
    endTime: Date,
    itemLevelCode: String,
    itemTypeCode: String,
    warrantyItemId: String,
    itemCeilingPrice: Number,
    ceilingPriceType: String,
    zlcWarrantyItem: String,
    warrantyNumber: Number,
    warrantyTypeCode: String,
    serviceNumber: Number,
    serviceDate: Date,
    serviceByEmployee: String,
    serviceTypeCode: String,
    serviceProviderId: String,
    groupName: String,
    beginDate: Date,
    endDate: Date,
    sequence: String,
    vendorType: String,
    vendorId: String,
    description: String,
    subClassId: String,
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
module.exports = mongoose.model('Item', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);