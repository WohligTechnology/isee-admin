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
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed'],
        default: 'Pending'
    },
    subStatus: {
        type: String,
        enum: ['Enable', 'Disabled'],
        default: 'Disabled'
    }
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

    getValueFromRuleEngine: function (tableName, tableField, transactionJson) {
        var returnVal = "";
        var returnTable = "";
        // red(tableName);
        // green(tableField);
        if(transactionJson.transactionJson){
        if (tableName == "Company") {
            returnTable = transactionJson.transactionJson.companyData;
        } else if (tableName == "Item") {
            returnTable = transactionJson.transactionJson.itemData;
        } else if (tableName == "WarrantyItem") {
            returnTable = transactionJson.transactionJson.itemData.warrantyItemId;
        } else if (tableName == "Locations") {
            returnTable = transactionJson.transactionJson.locationData;
        } else if (tableName == "TillRegister") {
            returnTable = transactionJson.transactionJson.tillRegisterData;
        } else if (tableName == "Customer") {
            returnTable = transactionJson.transactionJson.customerData;
        } else if (tableName == "Calendar") {
            returnTable = transactionJson.transactionJson.calendarData;
        } else if (tableName == "Crm") {
            returnTable = transactionJson.transactionJson.crmData;
        } else if (tableName == "CompanyContact") {
            returnTable = transactionJson.transactionJson.companyContactData;
        } else if (tableName == "CompanyInfo") {
            returnTable = transactionJson.transactionJson.companyInfoData;
        }else{
            returnTable = transactionJson;
        }
        if (returnTable) {
            return returnTable[tableField];
        } else {
            return null
        }}
    },

    findViolationCount: function (ruleId, callback) {
        // callback with count or error
        // Transation.count({violation:ruleId}).exec(callback);
        Transaction.find({
            "violations": {
                $elemMatch: {
                    $in: [ObjectId(ruleId.ruleId)]
                }
            }
        }).count(function (err, data) {
            console.log("data", data);
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    },

    checkViolationForRule: function (ruleId, callback) {
        // get count of all transactions get total_pages = totalcount/20;
        // i = 0 
        // async.timesSeries(total_pages, iteratee, callback)
        //      itetaty function async each series = > find skip = ((i)*20)  limit = 20 transactions i++;
        Transaction.find({}).limit(2000).exec(function (err, transactions) {
            async.concatLimit(transactions, 20, function (transaction, callback) {
                RuleEngine.checkViolation(transaction._id, ruleId, callback);
            }, callback);
        });
    },

    checkViolationForTransaction: function (transactionId, callback) {
        Transaction.clearAllPreviousViolations(transactionId.transactionId, function () {});
        RuleEngine.find({
            subStatus: 'Enable'
        }, function (err, rules) {
            async.concatLimit(rules, 20, function (rule, callback) {
                RuleEngine.checkViolation(transactionId.transactionId, rule._id, callback);
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
                }).lean().exec(callback);
            },

            function (transaction, callback) { // get Rule
                RuleEngine.findOne({
                    _id: ruleId
                }).lean().exec(function (err, rule) {
                    callback(err, transaction, rule);
                });
            }
        ], function (err, transactionData, rules) { // execute Violation
            if (err || _.isEmpty(transactionData) || _.isEmpty(rules)) {
                callback(null, "Error");
            } else {
                // console.log("transactionDatatransactionData----",transactionData)
                var arrForRuleTransaction = [];
                async.concatSeries(_.cloneDeep(rules.rule), function (rulesData, callback) { // concat for subRule
                    var value1 = RuleEngine.getValueFromRuleEngine(rulesData.model, rulesData.field, transactionData);
                    var value2;
                    if (!_.isEmpty(rulesData.constant)) {
                        value2 = rulesData.constant;
                    } else {
                        value2 = RuleEngine.getValueFromRuleEngine(rulesData.table, rulesData.tableField, transactionData);
                    }
                    // console.log("value1----", value1);
                    // console.log("value2----", value2);

                    var conditionData = false;
                    if (value1 != null && value2 != null) {
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
                    }
                    if (value1 != null && value2 != null) {
                        arrForRuleTransaction.push({
                            value: conditionData,
                            comparionType: rulesData.logic
                        });
                    }
                    callback();
                }, function (err, data) {
                    var response;
                    if (arrForRuleTransaction[0]) {
                        response = arrForRuleTransaction[0].value;
                    }
                    _.each(arrForRuleTransaction, function (n, index) { // compare AND, OR
                        if (index != 0) {
                            if (arrForRuleTransaction[index - 1].comparionType == "AND") {
                                response = response && n.value;
                                if (response == true) {
                                    Transaction.addViolation(transactionData._id, ruleId, function (err, data) {
                                        // callback(null, data);
                                    });
                                } else {
                                    //callback(null, "No Violation");
                                }
                            } else if (arrForRuleTransaction[index - 1].comparionType == "OR") {
                                response = response || n.value;
                                if (response == true) {
                                    Transaction.addViolation(transactionData._id, ruleId, function (err, data) {
                                        // callback(null, data);
                                    });
                                } else {
                                    //callback(null, "No Violation");
                                }
                            }
                        } else {
                            if (arrForRuleTransaction[0].comparionType == undefined) {
                                if (response == true) {
                                    Transaction.addViolation(transactionData._id, ruleId, function (err, data) {
                                        // callback(null, data);
                                    });
                                } else {
                                    //callback(null, "No Violation");
                                }
                            }
                        }
                    });
                    callback(null, "working")
                });
            }
        });
    },

    

};
module.exports = _.assign(module.exports, exports, model);