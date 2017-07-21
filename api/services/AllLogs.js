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
var model = {

    logHistory: function (data, callback) {
        AllLogs.find({}).sort({
                createdAt: -1
            })
            .deepPopulate("user")
            .exec(function (err, found) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (found) {
                    _.forEach(found, function (value) {
                        console.log("1111111111111111", value);
                        if (value.status == 'error') {

                            var errorCount = value;
                            console.log("1111111111111111", errorCount);
                        }
                    });
                    // callback(null, found);
                } else {
                    callback("Invalid data", null);
                }
            });
    }
};
module.exports = _.assign(module.exports, exports, model);