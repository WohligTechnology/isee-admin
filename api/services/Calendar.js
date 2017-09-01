var schema = new Schema({
    ActivityDate: {
        type: Date
    },
    Month: {
        type: Number
    },
    Year: {
        type: Number
    },
    MonthYear: {
        type: String
    },
    MonthYearSequence: {
        type: Number
    },
    Quarter: {
        type: Number
    },
    QuarterYear: {
        type: String
    },
    QuarterYearSequence: {
        type: Number
    },
    MonthName: {
        type: String
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Calendar', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);