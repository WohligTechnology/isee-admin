var adminUrl = "http://wohlig.io/api/";
var uploadurl = adminUrl + "upload/";

myApp.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        anchor: "corporate",
        icon: "fa-tachometer"
    }, {
        name: "Widgets-iSee",
        classis: "active",
        anchor: "store",
        icon: "fa-desktop",
        hasSub: "has-sub",
        subnav: [{
            name: "Subnav",
            classis: "active",
            anchor: "home",
            icon: "fa-cog"
        }]
    }, {
        name: "Returns Details",
        classis: "active",
        anchor: "user",
        icon: "fa-tasks"
    }, {
        name: "Rules Alert",
        classis: "active",
        anchor: "rules",
        icon: "fa-pencil-square-o"
    }];

    return {
        getNavigation: function () {
            return navigation;
        },

        apiCall: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },

        searchCall: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },
    };
});