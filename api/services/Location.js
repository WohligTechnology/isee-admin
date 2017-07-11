var schema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
        key: "location"
    },
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        index: true
    }],
    retailLocationId: String,
    storeNumber: String,
    storeName: String,
    description: String,
    effectiveDate: Date,
    expirationDate: Date,
    apartment: String,
    address1: String,
    address2: String,
    city: String,
    country: String,
    postalCode: String,
    state: String,
    telephone1: Number,
    telephone2: Number,
    telephone3: Number,
    telephone4: Number,
    region: String,
    loc: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    },
    taxPercentage: String,
    storeManager: String,
    locationType: String,
    deliveryAvailable: String,
    pickupAvailable: String,
    transferAvailable: String,
    email: {
        type: String,
        validate: validators.isEmail()
    },
    geoCode: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Location', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);