var schema = new Schema({
    warrantyItemId: {
        type: String,
        es_indexed: true
    },
    warrantyType: {
        type: String,
        es_indexed: true
    },
    warrantySubtype: {
        type: String,
        es_indexed: true
    },
    description: String,
    replaceType: String,

    //////
    // item: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Item',
    //     index: true
    // }],
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('WarrantyItem', schema);

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