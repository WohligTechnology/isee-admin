var schema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
    },
    itemId: {
        type: Number,
        es_indexed: true
    },
    listPrice: Number,
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
        type: Schema.Types.ObjectId,
        ref: 'WarrantyItem',
        index: true
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
    //////

    //for  clik sense
    orgId: Number,
    warrantyItem: String


    // transaction: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Transaction',
    //     index: true
    // }],
    // warrantyItem: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'WarrantyItem',
    //     index: true,
    //     key: "item"
    // }
});

schema.plugin(deepPopulate, {
    populate: {
        organizationId: {
            select: ""
        },
        warrantyItemId: {
            select: ""
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Item', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "warrantyItemId organizationId", "warrantyItemId organizationId"));
var model = {

    getFromId: function (fieldName, fieldValue, callback) {
        var Model = this;
        if (!fieldValue || fieldValue == "") {
            callback(fieldName + " value is Blank");
        } else {
            var obj = {};
            obj[fieldName] = fieldValue;
            Model.findOne(obj).exec(function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err);
                } else {
                    callback(null, data._id);
                }
            });
        }
    },

    saveOnExcel: function (data, callback) {
        async.parallel({
                organizationId: function (callback) {
                    Company.getFromId("organizationId", data.organizationId, callback);
                },
                warrantyItemId: function (callback) {
                    WarrantyItem.getFromId("warrantyItemId", data.warrantyItemId, callback);
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    data = _.assign(data, result);
                    Item.saveData(data, callback);
                }
            });
    },

    getAllDataFromId: function (data, callback) {
        var Model = this;
        Model.findOne(data).lean().exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err);
            } else {
                callback(null, data._id);
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);