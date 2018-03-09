var schema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true
    },
    retailLocationId: {
        type: String,
        es_indexed: true
    },
    storeNumber: {
        type: String,
        es_indexed: true
    },
    storeName: {
        type: String,
        es_indexed: true
    },
    description: String,
    effectiveDate: Date,
    expirationDate: Date,
    apartment: String,
    address1: String,
    address2: String,
    city: {
        type: String,
        es_indexed: true
    },
    country: {
        type: String,
        es_indexed: true
    },
    postalCode: String,
    state: {
        type: String,
        es_indexed: true
    },
    telephone1: Number,
    telephone2: Number,
    telephone3: Number,
    telephone4: Number,
    region: {
        type: String,
        es_indexed: true
    },
    loc: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    },
    taxPercentage: String,
    storeManager: {
        type: String,
        es_indexed: true
    },
    locationType: {
        type: String,
        es_indexed: true
    },
    deliveryAvailable: String,
    pickupAvailable: String,
    transferAvailable: String,
    email: {
        type: String,
        validate: validators.isEmail(),
        es_indexed: true
    },
    geoCode: String,
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },

    //for  clik sense
    orgId:Number

    //////
    // company: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Company',
    //     index: true,
    //     key: "location"
    // },
    // transaction: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Transaction',
    //     index: true
    // }],

});

schema.plugin(deepPopulate, {
    populate: {
        organizationId: {
            select: ""
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Locations', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "organizationId", "organizationId"));
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
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    data = _.assign(data, result);
                    Locations.saveData(data, callback);
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