var schema = new Schema({
    tableName: {
        type: String
    },
    logs: {
        type: Schema.Types.Mixed
    },
    status: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
});

schema.plugin(deepPopulate, {
    populate: {
        user: {
            select: ""
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AllLogs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'user', 'user'));
var model = {};
module.exports = _.assign(module.exports, exports, model);