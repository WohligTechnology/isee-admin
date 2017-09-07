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
    // crm: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Crm',
    //     index: true,
    //     key: "customerNote"
    // }
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
    },

    // getAllDataFromId: function (data, callback) {
    //     var Model = this;
    //     console.log("Inside customerNote*********", data);
    //     Model.findOne(data).lean().exec(function (err, data) {
    //         if (err || _.isEmpty(data)) {
    //             callback(err);
    //         } else {
    //             console.log("data---inside customerNote", data);
    //             callback(null, data._id);
    //         }
    //     });
    // }

};
module.exports = _.assign(module.exports, exports, model);