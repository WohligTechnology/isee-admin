var RuleEng = require('node-rules');
var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    rule: {
        type: Schema.Types.Mixed
    },
    order: Number,
    status: Boolean,
    trasaction: {
        type: Schema.Types.ObjectId,
        ref: 'Trasaction',
        index: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('RuleEngine', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    findAll: function (data, callback) {
        var rules = {};
        RuleEngine.findOne({
            _id: data.id
        }, function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err);
            } else {
                rules = data.rule;
                async.concatLimit(rules, 20, function (rulesData, callback) {
                    console.log("rulesData", rulesData.model);
                    Transaction.find({}, function (err, found) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (found) {
                            console.log("found", found.organizationId);

                            async.concatLimit(found, 20, function (companyData, callback) {
                                console.log("found.organizationId", companyData.organizationId);
                                var conditionData = {};
                                if (rulesData.operators == '==') {
                                    conditionData = companyData.organizationId[rulesData.field] == rulesData.constant;
                                } else if (rulesData.operators == '<=') {
                                    conditionData = companyData.organizationId[rulesData.field] <= rulesData.constant;
                                } else if (rulesData.operators == '>=') {
                                    conditionData = companyData.organizationId[rulesData.field] >= rulesData.constant;
                                } else if (rulesData.operators == '>') {
                                    conditionData = companyData.organizationId[rulesData.field] > rulesData.constant;
                                } else if (rulesData.operators == '<') {
                                    conditionData = companyData.organizationId[rulesData.field] < rulesData.constant;
                                } else if (rulesData.operators == '!=') {
                                    conditionData = companyData.organizationId[rulesData.field] != rulesData.constant;
                                }
                                var rules = [{
                                    name: rulesData.model,
                                    // priority: 1,
                                    "condition": function (R) {
                                        R.when(conditionData);
                                    },
                                    "consequence": function (R) {
                                        R.next();
                                    }
                                }];
                                var R = new RuleEng(rules);
                                R.execute(companyData, function (result) {
                                    if (!_.isEmpty(result.matchPath)) {
                                        var abc = {};
                                        abc.nameData = companyData.organizationId.name;
                                        abc.matchPath = result.matchPath;
                                        callback(null, abc);
                                    } else {
                                        callback(null, "Error");
                                    }
                                });
                            }, function (err, data) {
                                var nameArr = [];
                                _.filter(data, function (o) {
                                    if (o.nameData != undefined) {
                                        nameArr.push(o);
                                    }
                                });
                                callback(null, nameArr);
                            });
                        } else {
                            callback("Invalid data", null);
                        }
                    });
                }, function (err, resultArr) {
                    // console.log("rulesData", resultArr);
                    callback(null, resultArr);
                });
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);