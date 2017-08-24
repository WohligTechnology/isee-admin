var schema = new Schema({
    organizationId: {
        type: String,
        es_indexed: true
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

    //////
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

    //custId

    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Location', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);