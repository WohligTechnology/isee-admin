var schema = new Schema({
    crm: {
        type: Schema.Types.ObjectId,
        ref: 'Crm',
        index: true,
        key: "customerNote"
    },
    noteSequence: {
        type: Number,
        required: true
    },
    note: String,
    noteTimeStamp: Date
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('CustomerNote', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);