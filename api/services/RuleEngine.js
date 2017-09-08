var RuleEng = require('node-rules');
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
    // trasaction: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Trasaction',
    //     index: true
    // }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('RuleEngine', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    // findAll: function (data, callback) {

    //     // find all transaction
    //     //  concatLimit(100)
    //     //      clearTransaction                
    //     //      find all rules
    //     //      concatSeries()
    //     //          RuleEngine      
    //     //              Transaction.addViolation(companyData._id, data._id, callback);


    //     var rules = {};
    //     RuleEngine.findOne({
    //         _id: data.id
    //     }, function (err, data) {
    //         if (err || _.isEmpty(data)) {
    //             callback(err);
    //         } else {
    //             rules = data.rule;
    //             async.concatLimit(rules, 20, function (rulesData, callback) {
    //                 console.log("rulesData", rulesData);
    //                 Transaction.find({}, function (err, found) {
    //                     if (err || _.isEmpty(found)) {
    //                         console.log(err);
    //                         callback(err, null);
    //                     } else if (found) {
    //                         // console.log("found", found);
    //                         async.concatLimit(found, 20, function (transationData, callback) {
    //                             // console.log("found.organizationId", companyData.transactionJson.companyData.region);

    //                             var value1 = RuleEngine.getValueFromRuleEngine(table, tableField, transactionJson);
    //                             if (isconstant) {
    //                                 value2 = constant;
    //                             } else {
    //                                 value2 = RuleEngine.getValueFromRuleEngine(table2, tableField2, transactionJson);
    //                             }
    //                             if (rulesData.operators == '==') {
    //                                 value1 = value2;
    //                             } else if (rulesData.operators == '<=') {
    //                                 conditionData = companyData.transactionJson.companyData[rulesData.field] <= rulesData.constant;
    //                             } else if (rulesData.operators == '>=') {
    //                                 conditionData = companyData.transactionJson.companyData[rulesData.field] >= rulesData.constant;
    //                             } else if (rulesData.operators == '>') {
    //                                 conditionData = companyData.transactionJson.companyData[rulesData.field] > rulesData.constant;
    //                             } else if (rulesData.operators == '<') {
    //                                 conditionData = companyData.transactionJson.companyData[rulesData.field] < rulesData.constant;
    //                             } else if (rulesData.operators == '!=') {
    //                                 conditionData = companyData.transactionJson.companyData[rulesData.field] != rulesData.constant;
    //                             }
    //                             var rules = [{
    //                                 name: rulesData.model,
    //                                 // priority: 1,
    //                                 "condition": function (R) {
    //                                     R.when(conditionData);
    //                                 },
    //                                 "consequence": function (R) {
    //                                     R.next();
    //                                 }
    //                             }];
    //                             var R = new RuleEng(rules);
    //                             R.execute(companyData, function (result) {
    //                                 if (!_.isEmpty(result.matchPath)) {
    //                                     // var abc = {};
    //                                     // abc.nameData = companyData._id;
    //                                     // abc.matchPath = result.matchPath;
    //                                     Transaction.addViolation(companyData._id, data._id, callback);
    //                                 } else {
    //                                     callback(null, "Error");
    //                                 }
    //                             });
    //                         }, function (err, data) {
    //                             var nameArr = [];
    //                             _.filter(data, function (o) {
    //                                 if (o.nameData != undefined) {
    //                                     nameArr.push(o);
    //                                 }
    //                             });
    //                             callback(null, nameArr);
    //                         });
    //                     }
    //                 });
    //             }, function (err, resultArr) {
    //                 // console.log("rulesData", resultArr);
    //                 callback(null, resultArr);
    //             });
    //         }
    //     });
    // },

    getValueFromRuleEngine: function (tableName, tableField, transactionJson) {
        var returnVal = "";
        var returnTable = "";
        // red(tableName);
        // green(tableField);
        if (tableName == "Company") {
            returnTable = transactionJson.companyData;
        } else if (tableName == "Item") {
            returnTable = transactionJson.itemData;
        } else if (tableName == "WarrantyItem") {
            returnTable = transactionJson.itemData.warrantyItemId;
        } else if (tableName == "Locations") {
            returnTable = transactionJson.locationData;
        } else if (tableName == "TillRegister") {
            returnTable = transactionJson.tillRegisterData;
        } else if (tableName == "Customer") {
            returnTable = transactionJson.customerData;
        } else if (tableName == "Calendar") {
            returnTable = transactionJson.calendarData;
        } else if (tableName == "Crm") {
            returnTable = transactionJson.crmData;
        } else if (tableName == "CompanyContact") {
            returnTable = transactionJson.companyContactData;
        } else if (tableName == "CompanyInfo") {
            returnTable = transactionJson.companyInfoData;
        }
        return returnTable[tableField];
    },

    findViolationCount: function (ruleId, callback) {
        // callback with count or error
        // Transation.count({violation:ruleId}).exec(callback);
    },

    // getVoilationData: function (data, callback) {
    //     Transaction.find({}, function (err, found) {
    //         if (err || _.isEmpty(found)) {
    //             console.log(err);
    //             callback(err, null);
    //         } else if (found) {
    //             async.concatLimit(found, 20, function (transactionData, callback) {
    //                 Transaction.clearAllPreviousViolations(transactionData._id, function () {});
    //                 RuleEngine.find({}, function (err, found1) {
    //                     if (err || _.isEmpty(found1)) {
    //                         console.log(err);
    //                         callback(err, null);
    //                     } else if (found1) {
    //                         async.concatSeries(found1, function (rule, callback) {
    //                             async.concatSeries(rule.rule, function (rulesData, callback) {
    //                                 var value1 = RuleEngine.getValueFromRuleEngine(rulesData.model, rulesData.field, transactionData.transactionJson);
    //                                 var value2;
    //                                 if (!_.isEmpty(rulesData.constant)) {
    //                                     value2 = rulesData.constant;
    //                                 } else {
    //                                     value2 = RuleEngine.getValueFromRuleEngine(rulesData.table, rulesData.tableField, transactionData.transactionJson);
    //                                 }
    //                                 console.log(value1);
    //                                 console.log(value2);
    //                                 if (rulesData.operators == '==') {
    //                                     conditionData = value1 == value2;
    //                                 } else if (rulesData.operators == '<=') {
    //                                     conditionData = parseFloat(value1) <= parseFloat(value2);
    //                                 } else if (rulesData.operators == '>=') {
    //                                     conditionData = parseFloat(value1) >= parseFloat(value2);
    //                                 } else if (rulesData.operators == '>') {
    //                                     conditionData = parseFloat(value1) > parseFloat(value2);
    //                                 } else if (rulesData.operators == '<') {
    //                                     conditionData = parseFloat(value1) < parseFloat(value2);
    //                                 } else if (rulesData.operators == '!=') {
    //                                     conditionData = value1 != value2;
    //                                 }
    //                                 var rules = [{
    //                                     name: rulesData.model,
    //                                     "condition": function (R) {
    //                                         R.when(conditionData);
    //                                     },
    //                                     "consequence": function (R) {
    //                                         R.next();
    //                                     }
    //                                 }];
    //                                 var R = new RuleEng(rules);
    //                                 R.execute(transactionData, function (result) {
    //                                     if (!_.isEmpty(result.matchPath)) {
    //                                         Transaction.addViolation(transactionData._id, rule._id, callback);
    //                                     } else {
    //                                         callback(null, "No Violation");
    //                                     }
    //                                 });
    //                             }, function (err, data) {
    //                                 callback(null, data);
    //                             });
    //                         }, function (err, result) {
    //                             callback(null, result);
    //                         });
    //                     }
    //                 });
    //             }, callback);
    //         }
    //     });
    // },
    checkViolationForRule: function (ruleId, callback) {
        // get count of all transactions get total_pages = totalcount/20;
        // i = 0 
        // async.timesSeries(total_pages, iteratee, callback)
        //      itetaty function async each series = > find skip = ((i)*20)  limit = 20 transactions i++;
        Transaction.find({}, function (err, transactions) {
            async.concatLimit(transactions, 20, function (transaction, callback) {
                RuleEngine.checkViolation(transaction._id, ruleId, callback);
            }, callback);
        });
    },
    checkViolationForTransaction: function (transactionId, callback) {

        Transaction.clearAllPreviousViolations(transactionId, function () {});
        RuleEngine.find({}, function (err, rules) {
            async.concatLimit(rules, 20, function (rule, callback) {
                RuleEngine.checkViolation(transactionId, rule._id, callback);
            }, callback);
        });
    },
    /**
     * This function check violation of particular rule with particular Transaction.
     * @param {ObjectId} transactionId transaction id should be provided
     * @param {ObjectId} ruleId rule id should be provided
     * @param {function} callback rule id should be provided
     */
    checkViolation: function (transactionId, ruleId, callback) {
        async.waterfall([
            function (callback) { // get Transaction
                Transaction.findOne({
                    _id: transactionId
                }).exec(callback);
            },
            function (transaction, callback) { // get Rule
                RuleEngine.findOne({
                    _id: ruleId
                }).exec(function (err, rule) {
                    callback(err, transaction, rule);
                });
            }
        ], function (err, transactionData, rulesData) { // execute Violation
            if (err || _.isEmpty(transactionData) || _.isEmpty(rulesData)) {
                callback(null, "Error");
            } else {
                async.concatSeries(rule.rule, function (rulesData, callback) {
                    var value1 = RuleEngine.getValueFromRuleEngine(rulesData.model, rulesData.field, transactionData.transactionJson);
                    var value2;
                    if (!_.isEmpty(rulesData.constant)) {
                        value2 = rulesData.constant;
                    } else {
                        value2 = RuleEngine.getValueFromRuleEngine(rulesData.table, rulesData.tableField, transactionData.transactionJson);
                    }
                    console.log(value1);
                    console.log(value2);
                    if (rulesData.operators == '==') {
                        conditionData = value1 == value2;
                    } else if (rulesData.operators == '<=') {
                        conditionData = parseFloat(value1) <= parseFloat(value2);
                    } else if (rulesData.operators == '>=') {
                        conditionData = parseFloat(value1) >= parseFloat(value2);
                    } else if (rulesData.operators == '>') {
                        conditionData = parseFloat(value1) > parseFloat(value2);
                    } else if (rulesData.operators == '<') {
                        conditionData = parseFloat(value1) < parseFloat(value2);
                    } else if (rulesData.operators == '!=') {
                        conditionData = value1 != value2;
                    }
                    var rules = [{
                        name: rulesData.model,
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
                            Transaction.addViolation(transactionData._id, rule._id, callback);
                        } else {
                            callback(null, "No Violation");
                        }
                    });
                }, function (err, data) {
                    callback(null, data);
                });
            }

        });
    }

};
module.exports = _.assign(module.exports, exports, model);