var schema = new Schema({
    phoneNumberId: {
        type: String,
        es_indexed: true
    },
    phoneNumber: {
        type: Number,
        es_indexed: true
    },
    phoneTypeCode: String,
    contactDiscription: String,
    sortOrder: {
        type: String,
        enum: ['Asc', 'Desc']
    },
    //custId

    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('CompanyContact', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);