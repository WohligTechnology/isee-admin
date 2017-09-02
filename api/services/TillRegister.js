var schema = new Schema({
    retailLocationId: {
        type: String
    },
    tillNumber: {
        type: String
    },
    date: {
        type: Date
    },
    openingBalance: {
        type: Number
    },
    additions: {
        type: Number
    },
    systemBalance: {
        type: Number
    },
    actualBalance: {
        type: Number
    },
    bankDeposit: {
        type: Number
    },
    closingBalance: {
        type: Number
    },
    employeeNumber: {
        type: String
    },
    randomNumber: {
        type: Number
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TillRegister', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);