    var schema = new Schema({
        tableName: {
            type: String
        },
        logs: {
            type: Schema.Types.Mixed
        },
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
            AllLogs.aggregate([{
                $group: {
                    "_id": "$createdAt",
                    info: {
                        $push: {
                            "status": "$logs"
                        }
                    }
                }
            }], function (err, found) {
                if (err) {
                    // console.log(err);
                    callback(err, null);
                } else {
                    if (_.isEmpty(found)) {
                        callback(null, "noDataFound");
                    } else {
                        var result = {};
                        result.succesCount = 0;
                        result.errorCount = 0;
                        async.eachSeries(found, function (file, cb1) {
                            // console.log(value);
                            async.eachSeries(file.info, function (file1, cb2) {
                                // console.log(value);
                                async.eachSeries(file1.status, function (file2, cb3) {
                                    // console.log(value);
                                    if (file2.error == null) {
                                        result.succesCount++;
                                    } else {
                                        result.errorCount++;
                                    }
                                    cb3(null, file2);
                                }, function (err) {
                                    cb2(err, result);
                                });
                            }, function (err) {
                                cb1(err, result);
                            });
                        }, function (err) {
                            result.found = found;
                            callback(err, result);
                        });
                    }
                }
            });
        }
    };
    module.exports = _.assign(module.exports, exports, model);