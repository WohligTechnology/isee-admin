 if (singleData.organizationId) {
     var organisationData = {};
     var customerData = {};
     var locationData = {};
     var itemData = {};
     var calendarData = {};
     var tillregisterData = {};

     async.parallel([
         //oraganisation
         function (callback) {
             Company.findOne({
                 organizationId: singleData.organizationId
             }).lean().exec(function (err, data) {
                 if (err || _.isEmpty(data)) {
                     callback(err, null);
                 } else {
                     organisationData = data._id;
                     callback(null, "done");
                 }
             });
         },

         //customer

         function (callback) {
             Customer.findOne({
                 customerId: singleData.customerId
             }).lean().exec(function (err, data) {
                 if (err || _.isEmpty(data)) {
                     callback(err, null);
                 } else {
                     customerData = data._id;
                     callback(null, "done");
                 }
             });

         },

         //location

         function (callback) {
             Locations.findOne({
                 retailLocationId: singleData.retailLocationId
             }).lean().exec(function (err, data) {
                 if (err || _.isEmpty(data)) {
                     callback(err, null);
                 } else {
                     locationData = data._id;
                     callback(null, "done");
                 }
             });
         },

         //item

         function (callback) {
             Item.findOne({
                 itemId: singleData.itemId
             }).lean().exec(function (err, data) {
                 if (err || _.isEmpty(data)) {
                     callback(err, null);
                 } else {
                     itemData = data._id;
                     callback(null, "done");
                 }

             });
         },

         //calendar

         function (callback) {
             Calendar.findOne({
                 activityDate: singleData.activityDate
             }).lean().exec(function (err, data) {
                 if (err || _.isEmpty(data)) {
                     callback(err, null);
                 } else {
                     calendarData = data._id;
                     callback(null, "done");
                 }
             });
         },

         //till register

         function (callback) {
             TillRegister.findOne({
                 tillNumber: singleData.tillNumber
             }).lean().exec(function (err, data) {
                 if (err || _.isEmpty(data)) {
                     callback(err, null);
                 } else {
                     tillregisterData = data._id;
                     callback(null, "done");
                 }
             });
         }
     ], function (err, results) {
         i++;
         if (err) {
             callback(null, {
                 error: err
             });
         } else {
             singleData.organizationId = organisationData;
             singleData.customerId = customerData;
             // singleData.retailLocationId = locationData;
             singleData.itemId = itemData;
             singleData.activityDate = calendarData;
             // singleData.tillNumber = tillregisterData;
             console.log("Transactions Completed" + i);
             Transaction.saveData(singleData, function (err, found) {
                 if (err) {
                     console.log('********** error at 1st function of asynch.waterfall in search of ProjectExpense.js ************', err);
                     successObj.error = err;
                     successObj.Success = null;
                     arrData.push(successObj);
                     callback(null, err);
                     failureCount++;
                 } else {
                     if (_.isEmpty(found)) {
                         callback(null, err);
                     } else {
                         sucessCount++;
                         successObj.error = null;
                         successObj.Success = found;
                         finalData.sucessCount = sucessCount;
                         finalData.totalCount = sucessCount + failureCount;
                         finalData.failureCount = failureCount;
                         finalData.found = found;
                         arrData.push(successObj);
                         delete finalData.found
                         callback(null, finalData, arrData);
                     }
                 }
             });
         }
     });

 }