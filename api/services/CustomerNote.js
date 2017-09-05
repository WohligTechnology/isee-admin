var schema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        index: true,
    },
    noteSequence: {
        type: Number,
        required: true
    },
    note: String,
    noteTimeStamp: Date,

    //////
    crm: {
        type: Schema.Types.ObjectId,
        ref: 'Crm',
        index: true,
        key: "customerNote"
    },

    //custId
    custId: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('CustomerNote', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    saveOnExcel: function (data, callback) {
        async.parallel({
                customerId: function (callback) {
                    Customer.getFromId("customerId", data.customerId, callback);
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    data = _.assign(data, result);
                    CustomerNote.saveData(data, callback);
                }
            });
    }

};
module.exports = _.assign(module.exports, exports, model);