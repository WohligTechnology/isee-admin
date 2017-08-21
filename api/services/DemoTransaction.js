var schema = new Schema({
    orignalTender: String,
    returnTender: String,
    amount: Number,
    name: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DemoTransaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {



};
module.exports = _.assign(module.exports, exports, model);