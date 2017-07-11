var schema = new Schema({
    phoneNumberId: String,
    phoneNumber: Number,
    phoneTypeCode: String,
    contactDiscription: String,
    sortOrder: {
        type: String,
        enum: ['Asc', 'Desc']
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('CompanyContact', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);