module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    findAll: function (req, res) {
        if (req.body) {
            RuleEngine.findAll(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

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

};
module.exports = _.assign(module.exports, controller);