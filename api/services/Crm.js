var schema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        index: true,
    },
    customerGroupId: {
        type: String,
        es_indexed: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        index: true,
    },
    customerNumber: String,
    salutation: String,
    firstName: {
        type: String,
        es_indexed: true
    },
    middleName: String,
    lastName: String,
    gender: {
        type: String,
        es_indexed: true
    },
    totalTransactionCount: Number,
    totalSoldItemCount: Number,
    ytdReturnsAmount: Number,
    partyId: {
        type: String,
        es_indexed: true
    },
    idVerificationRequired: Boolean,
    partyId1: {
        type: String,
        es_indexed: true
    },
    totalReturnedItemCount: Number,
    totalReturnsAmount: Number,
    totalSalesAmount: Number,
    ytdReturnedItemCount: Number,
    ytdSalesAmount: Number,
    ytdSoldItemCount: Number,
    ytdTransactionCount: Number,
    allegianceRetailLocationId: {
        type: String,
        es_indexed: true
    },
    birthDate: Date,
    customerLevelCode: {
        type: String,
        es_indexed: true
    },
    employeeId: {
        type: String,
        es_indexed: true
    },
    federalTaxId: {
        type: String,
        es_indexed: true
    },
    legalStatusCode: String,
    mailingList: String,
    organizationName: String,
    organizationTypeCode: {
        type: String,
        es_indexed: true
    },
    partyTypeCode: {
        type: String,
        es_indexed: true
    },
    pictureUri: String,
    signUpRetailLocationId: {
        type: String,
        es_indexed: true
    },
    socialSecurityNumber: Number,
    stateTaxId: String,
    suffix: String,
    void: String,
    anniversaryDate: Date,
    emailContact: {
        type: String,
        validate: validators.isEmail(),
        es_indexed: true
    },
    privacyCard: {
        type: String,
        es_indexed: true
    },
    commercialCustomer: {
        type: String,
        es_indexed: true
    },
    recordState: String,
    processDate: Date,
    customerGroups: String,
    creatorPartyId: {
        type: String,
        es_indexed: true
    },
    creatorParty: String,
    loyaltyProgramNumber: Number,

    ////

    //for  clik sense
    orgId: Number,
    custId: String

    // customerNote: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'CustomerNote',
    //     index: true
    // }],

    // customer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Customer',
    //     index: true
    // },

    // transaction: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Transaction',
    //     index: true
    // }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Crm', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    saveOnExcel: function (data, callback) {
        async.parallel({
                organizationId: function (callback) {
                    Company.getFromId("organizationId", data.organizationId, callback);
                },
                customerId: function (callback) {
                    Customer.getFromId("customerId", data.customerId, callback);
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err);
                } else {
                    data = _.assign(data, result);
                    Crm.saveData(data, callback);
                }
            });
    },

    getAllDataFromId: function (data, callback) {
        var Model = this;
        Model.findOne(data).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err);
            } else {
                callback(null, data._id);
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);