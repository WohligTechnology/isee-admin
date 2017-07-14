module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var RuleEngine = require('node-rules');

var controller = {

    rulesDemo: function (req, res) {

        req.body = {};
        req.body.companyExcel = {
            name: "596898c78d0fdb32438c202a.xlsx",
            fields: [{
                    ourField: "name",
                    theirField: "Firstname"
                }, {
                    ourField: "type",
                    theirField: "TransactionType"
                },
                {
                    ourField: "amount",
                    theirField: "Amount"
                }
            ]
        };
        Config.importGSForCustomFields(req.body.companyExcel.name, req.body.companyExcel.fields, function (err, data) {
            if (err || _.isEmpty(data)) {
                res.callback(err);
            } else {
                async.concatLimit(data, 20, function (singleData, callback) {

                    var rules = [{
                            "condition": function (R) {
                                R.when(singleData && (singleData.amount < 500));
                            },
                            "consequence": function (R) {
                                singleData.result = false;
                                R.stop();
                            }
                        },
                        {
                            "condition": function (R) {
                                R.when(singleData && (singleData.name == 'adi'));
                            },
                            "consequence": function (R) {
                                singleData.result = false;
                                R.stop();
                            }
                        }
                    ];

                    var R = new RuleEngine(rules);

                    R.execute(singleData, function (result) {
                        if (result.result) {
                            // console.log("In if faults", faults);
                            // DemoTransaction.saveData(singleData, callback);
                        } else {
                            // console.log("In else", singleData);
                        }
                    });

                    console.log("In if faults", faults);

                }, function (err, data) {
                    // res.callback(null, data);
                });
            }
        });
    },

};
module.exports = _.assign(module.exports, controller);