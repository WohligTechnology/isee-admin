var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    rule: {
        type: Schema.Types.Mixed
    },
    order: Number,
    status: Boolean,
    trasaction: {
        type: Schema.Types.ObjectId,
        ref: 'Trasaction',
        index: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('RuleEngine', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);