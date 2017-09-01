    var schema = new Schema({
        tableName: {
            type: String
        },
        logs: [{
            type: Schema.Types.Mixed
        }],
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

        // save: function (data, callback) {

        //     var logsData = this(data);
        //     console.log("logsData", logsData);
        //     logsData.save(function (err, found) {
        //         if (err) {
        //             callback(err, null);
        //         } else {
        //             if (found) {
        //                 console.log("found", found);
        //                 callback(null, "");
        //             } else {
        //                 callback(null, {
        //                     message: "No Data Found"
        //                 });
        //             }
        //         }

        //     });
        // },

        // logHistory: function (data, callback) {
        //     AllLogs.aggregate([{
        //         $group: {
        //             "_id": "$createdAt",
        //             info: {
        //                 $push: "$logs"
        //             }
        //         }
        //     }], function (err, found) {
        //         if (err) {
        //             // console.log(err);
        //             callback(err, null);
        //         } else {
        //             if (_.isEmpty(found)) {
        //                 callback(null, "noDataFound");
        //             } else {
        //                 var result = {};
        //                 result.totalSuccesCount = 0;
        //                 result.totalErrorCount = 0;
        //                 async.eachSeries(found, function (file, cb1) {
        //                     // console.log(value);
        //                     var succesCount = 0;
        //                     var errorCount = 0;
        //                     async.eachSeries(file.info[0], function (file1, cb2) {
        //                         console.log("--->>>>>", file1);
        //                         if (file1.error == null) {
        //                             succesCount = _.cloneDeep(succesCount) + 1;
        //                             result.totalSuccesCount++;
        //                         } else {
        //                             console.log("I am in Error");
        //                             errorCount = _.cloneDeep(errorCount) + 1;
        //                             result.totalErrorCount++;
        //                         }
        //                         console.log("succesCount", succesCount);
        //                         console.log("errorCount", errorCount);
        //                         file.succesCount = succesCount;
        //                         file.errorCount = errorCount;
        //                         cb2(err, file1);
        //                     }, function (err) {
        //                         cb1(err, result);
        //                     });
        //                 }, function (err) {
        //                     result.found = found;
        //                     callback(err, result);
        //                 });
        //             }
        //         }
        //     });
        // },

        logHistory: function (data, callback) {
            AllLogs.find({
                tableName: data.tableName
            }).lean().exec(function (err, found) {
                if (err) {
                    // console.log(err);
                    callback(err, null);
                } else {
                    if (_.isEmpty(found)) {
                        callback(err, null);
                    } else {
                        var result = {};
                        result.totalSuccesCount = 0;
                        result.totalErrorCount = 0;
                        async.eachSeries(found, function (file, cb1) {
                            var succesCount = 0;
                            var errorCount = 0;
                            async.eachSeries(file.logs, function (file1, cb2) {
                                if (file1.error == null) {
                                    succesCount = _.cloneDeep(succesCount) + 1;
                                    result.totalSuccesCount++;
                                } else {
                                    errorCount = _.cloneDeep(errorCount) + 1;
                                    result.totalErrorCount++;
                                }
                                cb2(err, file1);
                            }, function (err) {
                                file.succesCount = succesCount;
                                file.errorCount = errorCount;
                                cb1(err, file);
                            });
                        }, function (err) {
                            var logsData = [];
                            result.found = found;
                            async.eachSeries(found, function (file2, cb2) {
                                var Data = {};
                                Data.id = file2._id;
                                Data.succesCount = file2.succesCount;
                                Data.errorCount = file2.errorCount;
                                Data.createdAt = file2.createdAt;
                                logsData.push(Data);
                                // console.log("logsDatalogsData------", logsData);
                                cb2(err, file2);
                            }, function (err) {
                                callback(err, logsData);
                            });
                            // console.log("results------------", result);
                            // callback(err, result);
                        });
                        // callback(err, found);
                    }
                }
            });
        },


        singleLogHistory: function (data, callback) {
            AllLogs.findOne({
                _id: data._id
            }).deepPopulate("users").exec(function (err, found) {
                if (err) {
                    callback(err, null);
                } else {
                    if (found) {
                        callback(null, found);
                    } else {
                        callback(null, {
                            message: "No Data Found"
                        });
                    }
                }

            });
        },

        //check all data in table

        findDataInTable: function (tabs, callback) {

            // var AllTableLog = {};

            async.parallel([

                //find customerNote Data
                function (callback) {
                    CustomerNote.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[0].checkMe = true;
                            } else {
                                tabs[0].checkMe = false;
                            }
                        }
                        callback(null, "done");
                    });
                },
                function (callback) {
                    Crm.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[1].checkMe = true;
                            } else {
                                tabs[1].checkMe = false;
                            }
                        }
                        callback(null, "done");
                    });

                },
                function (callback) {
                    Company.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[2].checkMe = true;
                            } else {
                                tabs[2].checkMe = false;
                            }
                        }
                        callback(null, "done");

                    });
                },
                function (callback) {
                    CompanyContact.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[3].checkMe = true;
                            } else {
                                tabs[3].checkMe = false;
                            }
                        }
                        callback(null, "done");

                    });
                },
                function (callback) {
                    CompanyInfo.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[4].checkMe = true;
                            } else {
                                tabs[4].checkMe = false;
                            }
                        }
                        callback(null, "done");

                    });
                },
                function (callback) {
                    Item.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[5].checkMe = true;
                            } else {
                                tabs[5].checkMe = false;
                            }
                        }
                        callback(null, "done");

                    });
                },
                function (callback) {
                    Locations.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[6].checkMe = true;
                            } else {
                                tabs[6].checkMe = false;
                            }
                        }
                        callback(null, "done");

                    });
                },
                function (callback) {
                    Transaction.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[7].checkMe = true;
                            } else {
                                tabs[7].checkMe = false;
                            }
                        }
                        callback(null, "done");

                    });
                },
                function (callback) {
                    WarrantyItem.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[8].checkMe = true;
                            } else {
                                tabs[8].checkMe = false;
                            }
                        }
                        callback(null, "done");
                    });
                },
                function (callback) {
                    Calendar.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[9].checkMe = true;
                            } else {
                                tabs[9].checkMe = false;
                            }
                        }
                        callback(null, "done");
                    });
                },
                function (callback) {
                    Customer.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[10].checkMe = true;
                            } else {
                                tabs[10].checkMe = false;
                            }
                        }
                        callback(null, "done");
                    });
                }
            ], function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, tabs);
                }
            });
        }

    };
    module.exports = _.assign(module.exports, exports, model);