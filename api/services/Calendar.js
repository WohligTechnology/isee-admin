var schema = new Schema({
    activityDate: {
        type: Date
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    monthYear: {
        type: String
    },
    monthYearSequence: {
        type: Number
    },
    quarter: {
        type: Number
    },
    quarterYear: {
        type: String
    },
    quarterYearSequence: {
        type: Number
    },
    monthName: {
        type: String
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Calendar', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    getFromId: function (fieldName, fieldValue, callback) {
        var Model = this;
        if (!fieldValue || fieldValue == "") {
            callback(fieldName + " value is Blank");
        } else {
            var obj = {};
            obj[fieldName] = fieldValue;
            Model.findOne(obj).exec(function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err);
                } else {
                    callback(null, data._id);
                }
            });
        }
    }
};
module.exports = _.assign(module.exports, exports, model);