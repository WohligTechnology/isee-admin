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
var model = {};
module.exports = _.assign(module.exports, exports, model);