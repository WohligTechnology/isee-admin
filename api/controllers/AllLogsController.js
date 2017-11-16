module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    logHistory: function (req, res) {
        if (req.body) {
            AllLogs.logHistory(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    singleLogHistory: function (req, res) {
        if (req.body) {
            AllLogs.singleLogHistory(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    findDataInTable: function (req, res) {
        if (req.body) {
            AllLogs.findDataInTable(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    singleLogHistoryCount: function (req, res) {
        if (req.body) {
            AllLogs.singleLogHistoryCount(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    singleSuccessLogHistory: function (req, res) {
        if (req.body) {
            AllLogs.singleSuccessLogHistory(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    singleSuccessLogHistoryCount: function (req, res) {
        if (req.body) {
            AllLogs.singleSuccessLogHistoryCount(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    // save: function (req, res) {
    //     if (req.body) {
    //         AllLogs.save(req.body, res.callback);
    //     } else {
    //         res.json({
    //             value: false,
    //             data: {
    //                 message: "Invalid Request"
    //             }
    //         });
    //     }
    // }
};
module.exports = _.assign(module.exports, controller);