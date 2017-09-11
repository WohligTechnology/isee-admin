module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    findAllDetails: function (req, res) {
        if (req.body) {
            Transaction.findAllDetails(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getViolationsForARule: function (req, res) {
        if (req.body) {
            Transaction.getViolationsForARule(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    }
};
module.exports = _.assign(module.exports, controller);