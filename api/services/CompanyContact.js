var schema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
    },
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
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('CompanyContact', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

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
                    CompanyContact.saveData(data, callback);
                }
            });
    }
};
module.exports = _.assign(module.exports, exports, model);