module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var RuleEngine = require('node-rules');

var controller = {

    rulesDemo: function (req, res) {

        req.body = {};
        req.body.companyExcel = {
            name: "5980818b0bfe830dfb688609.xlsx",
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
                            name: "Amount600",
                            priority: 1,
                            "condition": function (R) {
                                red("Amount 600");
                                R.when((singleData.amount == 600));
                            },
                            "consequence": function (R) {
                                R.next();
                            }
                        },
                        {

                            name: "NameAdi",
                            priority: 2,
                            "condition": function (R) {
                                R.when((singleData.name == 'Adi'));
                            },
                            "consequence": function (R) {
                                R.next();
                            }
                        },
                        {
                            name: "TypeTest",
                            priority: 3,
                            "condition": function (R) {
                                green("TypeTest");
                                R.when((singleData.type == 'Test'));
                            },
                            "consequence": function (R) {
                                R.next();
                            }
                        }
                    ];

                    var R = new RuleEngine(rules);

                    R.execute(singleData, function (result) {
                        callback(null, result);
                    });
                }, function (err, data) {
                    res.callback(err, data);
                });
            }
        });
    },

};
module.exports = _.assign(module.exports, controller);