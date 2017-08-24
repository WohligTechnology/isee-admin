module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var RuleEng = require('node-rules');

var controller = {

    rulesDemo: function (req, res) {
        var rules = {};
        RuleEngine.findOne({
            _id: req.body.id
        }, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                rules = data.rule;
                async.concatLimit(rules, 20, function (rulesData, callback) {
                    if (rulesData.model == 'Company') {
                        Company.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (companyData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = companyData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = companyData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = companyData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = companyData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = companyData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = companyData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(companyData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = companyData.name;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'Crm') {
                        Crm.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (crmData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = crmData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = crmData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = crmData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = crmData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = crmData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = crmData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(crmData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = crmData.firstName;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'CompanyContact') {
                        CompanyContact.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (companyContactData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = companyContactData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = companyContactData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = companyContactData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = companyContactData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = companyContactData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = companyContactData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(companyContactData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = companyContactData.phoneNumber;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'CompanyInfo') {
                        CompanyInfo.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (companyInfoData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = companyInfoData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = companyInfoData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = companyInfoData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = companyInfoData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = companyInfoData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = companyInfoData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(companyInfoData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = companyInfoData.reasonTypeCode;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'Customer') {
                        Customer.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (customerData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = customerData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = customerData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = customerData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = customerData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = customerData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = customerData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(customerData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = customerData.email;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'CustomerNote') {
                        CustomerNote.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (customerNoteData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = customerNoteData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = customerNoteData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = customerNoteData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = customerNoteData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = customerNoteData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = customerNoteData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(customerNoteData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = customerNoteData.noteTimeStamp;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'Item') {
                        Item.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (itemData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = itemData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = itemData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = itemData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = itemData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = itemData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = itemData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(itemData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = itemData.region;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'Location') {
                        Locations.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (locationData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = locationData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = locationData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = locationData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = locationData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = locationData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = locationData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(locationData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = locationData.storeName;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'Transaction') {
                        Transaction.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (transactionData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = transactionData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = transactionData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = transactionData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = transactionData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = transactionData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = transactionData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(transactionData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = transactionData.workstationId;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else if (rulesData.model == 'WarrantyItem') {
                        WarrantyItem.find({}, function (err, found) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else if (found) {
                                async.concatLimit(found, 20, function (warrantyItemData, callback) {
                                    var conditionData = {};
                                    if (rulesData.operators == '==') {
                                        conditionData = warrantyItemData[rulesData.field] == rulesData.constant;
                                    } else if (rulesData.operators == '<=') {
                                        conditionData = warrantyItemData[rulesData.field] <= rulesData.constant;
                                    } else if (rulesData.operators == '>=') {
                                        conditionData = warrantyItemData[rulesData.field] >= rulesData.constant;
                                    } else if (rulesData.operators == '>') {
                                        conditionData = warrantyItemData[rulesData.field] > rulesData.constant;
                                    } else if (rulesData.operators == '<') {
                                        conditionData = warrantyItemData[rulesData.field] < rulesData.constant;
                                    } else if (rulesData.operators == '!=') {
                                        conditionData = warrantyItemData[rulesData.field] != rulesData.constant;
                                    }
                                    var rules = [{
                                        name: rulesData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(warrantyItemData, function (result) {
                                        if (!_.isEmpty(result.matchPath)) {
                                            var abc = {};
                                            abc.nameData = warrantyItemData.warrantyType;
                                            abc.matchPath = result.matchPath;
                                            callback(null, abc);
                                        } else {
                                            callback(null, "Error");
                                        }
                                    });
                                }, function (err, data) {
                                    var nameArr = [];
                                    _.filter(data, function (o) {
                                        if (o.nameData != undefined) {
                                            nameArr.push(o);
                                        }
                                    });
                                    callback(null, nameArr);
                                });
                            } else {
                                callback("Invalid data", null);
                            }
                        });
                    } else {
                        callback(null, "No data found");
                    }
                }, function (err, resultArr) {
                    // console.log("rulesData", resultArr);
                    res.callback(null, resultArr);
                });
            }
        });
    },

};
module.exports = _.assign(module.exports, controller);