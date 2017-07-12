var controller = {
    companyUpload: function (req, res) {
        if (req.body.file) {
            var retJson = {};
            retJson.fields = [
                "name", "email"
            ];
            Config.getGSExcelFields(req.body.file, function (err, data) {
                if (err || _.isEmpty(data)) {
                    res.callback(err);
                } else {
                    retJson.excelFields = data;
                    res.callback(null, retJson);
                }
            });
        } else {
            res.callback("Please provide File to be uploaded");
        }
    },
    finalUpload: function (req, res) {
        res.body.companyExcel = {
            name: "",
            fields: [{
                    ourField: "firstName",
                    theirField: "name1"
                }, {
                    ourField: "middleName",
                    theirField: "name2"
                },
                {
                    ourField: "lastName",
                    theirField: "name3"
                }
            ]
        }
    }
};
module.exports = controller;