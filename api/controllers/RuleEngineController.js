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

    checkViolationForRule: function (req, res) {
        if (req.body) {
            RuleEngine.checkViolationForRule(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
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