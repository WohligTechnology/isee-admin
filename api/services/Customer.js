var schema = new Schema({
    address1: String,
    address2: String,
    apartment: String,
    city: String,
    country: String,
    postalCode: String,
    state: String,
    email: {
        type: String,
        validate: validators.isEmail()
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Customer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);