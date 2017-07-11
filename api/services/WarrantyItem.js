var schema = new Schema({
    warrantyType: String,
    warrantySubtype: String,
    description: String,
    replaceType: String,
    item: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        index: true
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('WarrantyItem', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);