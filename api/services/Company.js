var schema = new Schema({
    organizationId: {
        type: String,
        es_indexed: true
    },
    name: {
        type: String,
        es_indexed: true
    },
    region: {
        type: String,
        es_indexed: true
    },
    textCode: String,
    textSequence: String,
    textSubcode: String,
    receiptText: String,
    effectiveDate: Date,
    expirationDate: {
        type: Date,
        es_indexed: true
    },
    recordState: String,
    lineFormat: String,
    reformat: String,
    category: {
        type: String,
        es_indexed: true
    },
    beginRange: String,
    endRange: String,
    cost: Number,
    minimumCost: Number,
    maximumCost: Number,
    itemId: String, //item table

    //////
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

    //custId

    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Company', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
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
    }
};
module.exports = _.assign(module.exports, exports, model);