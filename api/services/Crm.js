var schema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        index: true
    },
    customerNote: [{
        type: Schema.Types.ObjectId,
        ref: 'CustomerNote',
        index: true
    }],
    transaction: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        index: true
    }],
    customerGroupId: String,
    salutation: String,
    firstName: {
        type: String,
        es_indexed: true
    },
    middleName: String,
    lastName: String,
    gender: String,
    totalTransactionCount: Number,
    totalSoldItemCount: Number,
    ytdReturnsAmount: Number,
    partyId: String,
    idVerificationRequired: Boolean,
    partyId1: String,
    totalReturnedItemCount: Number,
    totalReturnsAmount: Number,
    totalSalesAmount: Number,
    ytdReturnedItemCount: Number,
    ytdSalesAmount: Number,
    ytdSoldItemCount: Number,
    ytdTransactionCount: Number,
    allegianceRetailLocationId: String,
    birthDate: Date,
    customerLevelCode: String,
    employeeId: String,
    federalTaxId: String,
    legalStatusCode: String,
    mailingList: String,
    organizationName: String,
    organizationTypeCode: String,
    partyTypeCode: String,
    pictureUri: String,
    signUpRetailLocationId: String,
    socialSecurityNumber: Number,
    stateTaxId: String,
    suffix: String,
    void: String,
    anniversaryDate: Date,
    emailContact: {
        type: String,
        validate: validators.isEmail()
    },
    privacyCard: String,
    commercialCustomer: String,
    recordState: String,
    processDate: Date,
    customerGroups: String,
    creatorPartyId: String,
    creatorParty: String,

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(mongoosastic);
module.exports = mongoose.model('Crm', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);