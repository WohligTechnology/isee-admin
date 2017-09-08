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

        // logHistory: function (data, callback) {
        //     AllLogs.find({
        //         tableName: data.tableName
        //     }).lean().exec(function (err, found) {
        //         if (err) {
        //             // console.log(err);
        //             callback(err, null);
        //         } else {
        //             if (_.isEmpty(found)) {
        //                 callback(err, null);
        //             } else {
        //                 var result = {};
        //                 result.totalSuccesCount = 0;
        //                 result.totalErrorCount = 0;
        //                 async.eachSeries(found, function (file, cb1) {
        //                     var succesCount = 0;
        //                     var errorCount = 0;
        //                     async.eachSeries(file.logs, function (file1, cb2) {
        //                         if (file1.error == null) {
        //                             succesCount = _.cloneDeep(succesCount) + 1;
        //                             result.totalSuccesCount++;
        //                         } else {
        //                             errorCount = _.cloneDeep(errorCount) + 1;
        //                             result.totalErrorCount++;
        //                         }
        //                         cb2(err, file1);
        //                     }, function (err) {
        //                         file.succesCount = succesCount;
        //                         file.errorCount = errorCount;
        //                         cb1(err, file);
        //                     });
        //                 }, function (err) {
        //                     var logsData = [];
        //                     result.found = found;
        //                     async.eachSeries(found, function (file2, cb2) {
        //                         var Data = {};
        //                         Data.id = file2._id;
        //                         Data.succesCount = file2.succesCount;
        //                         Data.errorCount = file2.errorCount;
        //                         Data.createdAt = file2.createdAt;
        //                         logsData.push(Data);
        //                         // console.log("logsDatalogsData------", logsData);
        //                         cb2(err, file2);
        //                     }, function (err) {
        //                         callback(err, logsData);
        //                     });
        //                     // console.log("results------------", result);
        //                     // callback(err, result);
        //                 });
        //                 // callback(err, found);
        //             }
        //         }
        //     });
        // },

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



        //Transaction

        // findDataIn: function (tabs, callback) {

        //     var organisationData = {};
        //     var customerData = {};
        //     var locationData = {};
        //     var itemData = {};
        //     var calendarData = {};
        //     var tillregisterData = {};
        //     async.parallel([

        //         //oraganisation

        //         function (callback) {
        //             Company.findOne({
        //                 organizationId: singleData.organizationId
        //             }).lean().exec(function (err, data) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     if (!_.isEmpty(data)) {
        //                         organisationData = data._id;
        //                     } 
        //                 }
        //                 callback(null, "done");
        //             });
        //         },

        //         //customer

        //         function (callback) {
        //             Customer.findOne({
        //                 customerId: singleData.customerId
        //             }).lean().exec(function (err, data) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     if (!_.isEmpty(data)) {
        //                         customerData = data._id;
        //                     } 
        //                 }
        //                 callback(null, "done");
        //             });

        //         },

        //         //location

        //         function (callback) {
        //             Locations.findOne({
        //                 retailLocationId: singleData.retailLocationId
        //             }).lean().exec(function (err, data) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     if (!_.isEmpty(data)) {
        //                         locationData=data._id;
        //                     } 
        //                 }
        //                 callback(null, "done");
        //             });
        //         },

        //         //item

        //         function (callback) {
        //             Item.findOne({
        //                 itemId: singleData.itemId
        //             }).lean().exec(function (err, data) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     if (!_.isEmpty(data)) {
        //                         itemData=data._id;
        //                     } 
        //                 }
        //                 callback(null, "done");
        //             });
        //         },

        //         //calendar

        //         function (callback) {
        //             Calendar.findOne({
        //                 activityDate: singleData.activityDate
        //             }).lean().exec(function (err, data) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     if (!_.isEmpty(data)) {
        //                         calendarData=data._id;
        //                     }
        //                 }
        //                 callback(null, "done");
        //             });
        //         },

        //         //till register

        //         function (callback) {
        //             TillRegister.findOne({
        //                 tillNumber: singleData.tillNumber
        //             }).lean().exec(function (err, data) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     if (!_.isEmpty(data)) {
        //                         tabs[5].checkMe = true;
        //                     } 
        //                 }
        //                 callback(null, "done");
        //             });
        //         }
        //     ], function (err, results) {
        //         if (err) {
        //             callback(err, null);
        //         } else {
        //             callback(null, tabs);
        //         }
        //     });
        // }

    };
    module.exports = _.assign(module.exports, exports, model);