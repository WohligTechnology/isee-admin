var controller = {
    companyUpload: function (req, res) {
        if (req.body.file) {
            retJson.fields = [
                "name", "email"
            ];
            Config.getExcelFields(req.body.file, function (err, data) {
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
    }
};
module.exports = controller;