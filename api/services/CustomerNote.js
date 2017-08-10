var schema = new Schema({
    crm: {
        type: Schema.Types.ObjectId,
        ref: 'Crm',
        index: true,
        key: "customerNote"
    },
    noteSequence: {
        type: Number,
        required: true
    },
    note: String,
    noteTimeStamp: Date,

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

    replaceCustomerId: function (data, callback) {
        // console.log("data", data)
        Customer.findOne({
            custId: data.id
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (found) {
                    CustomerNote.findOneAndUpdate({
                        custId: data.id
                    }, {
                        custId: found._id
                    }, {
                        new: true
                    }).exec(function (err, found1) {
                        if (err) {
                            callback(err, null);
                        } else {
                            if (found) {
                                callback(null, found1);
                            } else {
                                callback({
                                    message: "Incorrect Credentials!"
                                }, null);
                            }
                        }
                    });
                    // callback(null, found);
                } else {
                    callback({
                        message: "Incorrect Credentials!"
                    }, null);
                }
            }

        });
    }
};
module.exports = _.assign(module.exports, exports, model);