module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getVoilationData: function (req, res) {
        if (req.body) {
            RuleEngine.getVoilationData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    // checkViolationForRule: function (req, res) {
    //     if (req.body) {
    //         RuleEngine.checkViolationForRule(req.body, res.callback);
    //     } else {
    //         res.json({
    //             value: false,
    //             data: {
    //                 message: "Invalid Request"
    //             }
    //         });
    //     }
    // },

    execute: function (req, res) {
        var objToSend = {};
        async.waterfall([
            function (callback) {
                RuleEngine.findOneAndUpdate({
                    _id: req.body.ruleId
                }, {
                    status: 'Processing'
                }, {
                    new: true
                }).exec(function (err, data) {
                    if (err || _.isEmpty(data)) {
                        callback(err, []);
                    } else {
                        res.callback(err, data.status);
                        objToSend.fromDate = data.fromDate
                        objToSend.toDate = data.toDate
                        objToSend.ruleId = req.body.ruleId
                        callback(null, data);
                    }
                });
            },
            function (data, callback) {
                // remove all the transactions where this rule is mensioned
                Transaction.removeARuleFromTransaction(req.body.ruleId, callback);
            },
            function (data, callback) { // 
                // checkViolationForRule run rules on all the transactions for this new created rule only
                RuleEngine.checkViolationForRule(objToSend, callback)
            },
            function (data, callback) {
                // status completed
                RuleEngine.findOneAndUpdate({
                    _id: req.body.ruleId
                }, {
                    status: 'Completed'
                }, {
                    new: true
                }).exec(function (err, data) {
                    if (err || _.isEmpty(data)) {
                        callback(err, []);
                    } else {
                        sails.sockets.blast("updateStatus", {
                            ruleEngData: data
                        });
                        callback(null, data);
                    }
                });
            }
        ], function () {
            // nothing at all
        });
    },

    checkViolationForTransaction: function (req, res) {
        if (req.body) {
            RuleEngine.checkViolationForTransaction(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    findViolationCount: function (req, res) {
        if (req.body) {
            RuleEngine.findViolationCount(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

};
module.exports = _.assign(module.exports, controller);