module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var RuleEng = require('node-rules');

var controller = {

    rulesDemo: function (req, res) {
        // req.body = {};
        req.body.companyExcel = {
            name: "59944228a711d867c6d9f3f5.xlsx",
            fields: [{
                    ourField: "orignalTender",
                    theirField: "Orignal Tender"
                }, {
                    ourField: "returnTender",
                    theirField: "Return Tender"
                }, {
                    ourField: "amount",
                    theirField: "Amount"
                },
                {
                    ourField: "name",
                    theirField: "Name"
                }
                // {
                //     ourField: "lastName",
                //     theirField: "LastName"
                // }
            ]
        };

        var rules = {};
        RuleEngine.findOne({
            _id: req.body.id
        }, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                rules = data.rule;
                async.waterfall([
                        function (callback) {
                            Config.importGSForCustomFields(req.body.companyExcel.name, req.body.companyExcel.fields, function (err, data) {
                                if (err || _.isEmpty(data)) {
                                    res.callback(err);
                                } else {
                                    callback(null, data);
                                }
                            });
                        },
                        function (data, callback) {
                            async.concatLimit(data, 20, function (singleData, callback) {
                                async.concatLimit(rules, 20, function (ruleData, callback) {
                                    var conditionData = {};
                                    if (ruleData.operators == '==') {
                                        conditionData = singleData[ruleData.field] == ruleData.constant;
                                    } else if (ruleData.operators == '<=') {
                                        conditionData = singleData[ruleData.field] <= ruleData.constant;
                                    } else if (ruleData.operators == '>=') {
                                        conditionData = singleData[ruleData.field] >= ruleData.constant;
                                    } else if (ruleData.operators == '>') {
                                        conditionData = singleData[ruleData.field] > ruleData.constant;
                                    } else if (ruleData.operators == '<') {
                                        conditionData = singleData[ruleData.field] < ruleData.constant;
                                    } else if (ruleData.operators == '!=') {
                                        conditionData = singleData[ruleData.field] != ruleData.constant;
                                    }
                                    var rules = [{
                                        name: ruleData.model,
                                        // priority: 1,
                                        "condition": function (R) {
                                            R.when(conditionData);
                                        },
                                        "consequence": function (R) {
                                            R.next();
                                        }
                                    }];
                                    var R = new RuleEng(rules);
                                    R.execute(singleData, function (result) {
                                        callback(null, result.matchPath);
                                    });
                                }, function (err, data) {
                                    callback(err, {
                                        name: singleData.name,
                                        result: data
                                    });
                                });

                            }, function (err, resultArr) {
                                res.callback(null, resultArr);
                            });
                        }
                    ],
                    function (err, found) {
                        if (err) {
                            // console.log(err);
                            // res.callback(err);
                        } else {
                            // res.callback(null, found);
                        }
                    });


                // Config.importGSForCustomFields(req.body.companyExcel.name, req.body.companyExcel.fields, function (err, data) {
                //     if (err || _.isEmpty(data)) {
                //         res.callback(err);
                //     } else {
                //         async.concatLimit(data, 20, function (singleData, callback) {
                //             async.concatLimit(rules, 20, function (ruleData, callback) {
                //                 var rules = [{
                //                     name: ruleData.model,
                //                     // priority: 1,
                //                     "condition": function (R) {
                //                         R.when(singleData[ruleData.field] == ruleData.constant);
                //                     },
                //                     "consequence": function (R) {
                //                         R.next();
                //                     }
                //                 }];

                //                 var R = new RuleEng(rules);

                //                 R.execute(singleData, function (result) {
                //                     callback(null, result.matchPath);
                //                 });
                //             }, function (err, data) {
                //                 callback(err, {
                //                     name: singleData.name,
                //                     result: data
                //                 });
                //             });

                //         }, function (err, resultArr) {
                //             res.callback(null, resultArr);
                //         });
                //     }
                // });
            }
        });


    },

};
module.exports = _.assign(module.exports, controller);