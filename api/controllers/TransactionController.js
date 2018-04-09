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
    },

    getViolatedTransaction: function (req, res) {
        if (req.body) {
            Transaction.getViolatedTransaction(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getRecordsByTransaction: function (req, res) {
        if (req.body) {
            Transaction.getRecordsByTransaction(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    clearAllViolations: function (req, res) {
        if (req.body) {
            Transaction.clearAllViolations(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    clearViolationForTransactions: function (req, res) {
        if (req.body) {
            Transaction.clearViolationForTransactions(req.body, res.callback);
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