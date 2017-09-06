var schema = new Schema({
    customerId: {
        type: String,
        es_indexed: true
    },
    addressID: {
        type: String,
        es_indexed: true
    },
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
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Customer', schema);

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