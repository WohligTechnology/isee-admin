var schema = new Schema({
    address1: String,
    address2: String,
    apartment: String,
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
    email: {
        type: String,
        validate: validators.isEmail(),
        es_indexed: true
    },

    //custId

    custId: {
        type: String,
        unique: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Customer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);