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
    },
    //custId

    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('RuleEngine', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    // findAll: function (id, callback) {
    //     RuleEngine.find({}).lean().exec(function (err, found) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             if (found) {
    //                 callback(null, found);
    //             } else {
    //                 callback({
    //                     message: "Incorrect Credentials!"
    //                 }, null);
    //             }
    //         }

    //     });
    // },
};
module.exports = _.assign(module.exports, exports, model);