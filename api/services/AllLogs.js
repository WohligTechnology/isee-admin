    var schema = new Schema({
        tableName: {
            type: String
        },
        logs: [{
            type: Schema.Types.Mixed
        }],
        sucessCount: Number,
        failureCount: Number,
        status: {
            type: String,
            enum: ['Pending', 'Completed']
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
            AllLogs.find({
                tableName: data.tableName
            }).lean().sort({
                createdAt: -1
            }).limit(10).exec(function (err, found) {
                if (err) {
                    callback(err, null);
                } else {
                    if (_.isEmpty(found)) {
                        callback(err, null);
                    } else {
                        logsData = [];
                        async.eachSeries(found, function (file2, cb2) {
                            var Data = {};
                            Data.id = file2._id;
                            Data.status = file2.status;
                            Data.succesCount = file2.sucessCount;
                            Data.errorCount = file2.failureCount;
                            Data.createdAt = file2.createdAt;
                            logsData.push(Data);
                            cb2(err, file2);
                        }, function (err) {
                            callback(err, logsData);
                        });
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
            async.parallel([

                //find customerNote Data
                function (callback1) {
                    CustomerNote.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[0].checkMe = true;
                            } else {
                                tabs[0].checkMe = false;
                            }
                        }
                        callback1(null, "done");
                    });
                },
                function (callback1) {
                    Crm.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[1].checkMe = true;
                            } else {
                                tabs[1].checkMe = false;
                            }
                        }
                        callback1(null, "done");
                    });

                },
                function (callback1) {
                    Company.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[2].checkMe = true;
                            } else {
                                tabs[2].checkMe = false;
                            }
                        }
                        callback1(null, "done");

                    });
                },
                function (callback1) {
                    CompanyContact.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[3].checkMe = true;
                            } else {
                                tabs[3].checkMe = false;
                            }
                        }
                        callback1(null, "done");

                    });
                },
                function (callback1) {
                    CompanyInfo.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[4].checkMe = true;
                            } else {
                                tabs[4].checkMe = false;
                            }
                        }
                        callback1(null, "done");

                    });
                },
                function (callback1) {
                    Item.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[5].checkMe = true;
                            } else {
                                tabs[5].checkMe = false;
                            }
                        }
                        callback1(null, "done");

                    });
                },
                function (callback1) {
                    Locations.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[6].checkMe = true;
                            } else {
                                tabs[6].checkMe = false;
                            }
                        }
                        callback1(null, "done");

                    });
                },
                function (callback1) {
                    Transaction.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[7].checkMe = true;
                            } else {
                                tabs[7].checkMe = false;
                            }
                        }
                        callback1(null, "done");

                    });
                },
                function (callback1) {
                    WarrantyItem.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[8].checkMe = true;
                            } else {
                                tabs[8].checkMe = false;
                            }
                        }
                        callback1(null, "done");
                    });
                },
                function (callback1) {
                    Calendar.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[9].checkMe = true;
                            } else {
                                tabs[9].checkMe = false;
                            }
                        }
                        callback1(null, "done");
                    });
                },
                function (callback1) {
                    Customer.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[10].checkMe = true;
                            } else {
                                tabs[10].checkMe = false;
                            }
                        }
                        callback1(null, "done");
                    });
                },
                function (callback1) {
                    TillRegister.find({}).lean().exec(function (err, data) {
                        if (err) {
                            callback1(err, null);
                        } else {
                            if (!_.isEmpty(data)) {
                                tabs[11].checkMe = true;
                            } else {
                                tabs[11].checkMe = false;
                            }
                        }
                        callback1(null, "done");
                    });
                }
            ], function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, tabs);
                }
            });
        },

    };
    module.exports = _.assign(module.exports, exports, model);