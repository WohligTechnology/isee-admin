module.exports = {
    index: function (req, res) {
        res.metaView();
    },
    download: function (req, res) {
        Config.readUploaded(req.param("filename"), null, null, null, res);
    },
    backend: function (req, res) {
        var env = require("../../config/env/" + sails.config.environment + ".js");
        res.view("production/backend", {
            jsFiles: jsFilesBackend,
            title: "Backend",
            description: "Backend",
            keywords: "Backend",
            adminurl: env.realHost + "/api/",
        });
    },
    gitPull: function (req, res) {
        function gitPull() {
            exec('git pull', function (error, stdout, stderr) {
                if (error) {
                    return;
                }
                res.callback(error, {
                    stdout: stdout,
                    stderr: stderr
                });
            });
        }

        function decryptData(text) {
            if (text) {
                if (moment.unix(text).isBetween(moment().add(-1, "minute"), moment().add(1, "minute"))) {
                    gitPull();
                } else {
                    res.notFound();
                }
            } else {
                res.notFound();
            }
        }
        if (req.params && req.params.data) {
            decryptData(req.params.data);
        } else {
            res.notFound();
        }
    },
    getAllModels: function (req, res) {
        var allModels = mongoose.modelNames();
        _.pull(allModels, "User", "Config", "AllLogs", "RuleEngine");
        res.callback(null, allModels);
    },


    getModelFields: function (req, res) {
        var model = req.body.model;
        var schema = mongoose.model(model).schema;

        var paths = [];
        schema.eachPath(function (n) {
            paths.push(n);
        });
        _.pull(paths,
            "_id", "createdAt", "updatedAt", "__v");
        res.callback(null, paths);
    }
};