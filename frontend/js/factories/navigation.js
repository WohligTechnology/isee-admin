var adminUrl = "http://wohlig.io/api/";
var uploadurl = adminUrl + "upload/";

myApp.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        anchor: "corporate",
        icon: "fa-tachometer"
    }, {
        name: "Product Admin",
        classis: "active",
        anchor: "",
        icon: "fa-desktop",
        hasSub: "has-sub",
        subnav: [{
            name: "Setup Company",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "License Manager",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "User Admin",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Roles Administration",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }]
    }, {
        name: "Company Admin",
        classis: "active",
        icon: "fa-tasks",
        hasSub: "has-sub",
        subnav: [{
            name: "Setup Company",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Role Administration",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Store/Branch Setup",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }]
    },{
        name: "Rules Admin",
        classis: "active",
        icon: "fa-pencil-square-o",
        hasSub: "has-sub",
        subnav: [{
            name: "Setup Rules",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "What-if-Analysis",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Rules Report",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }]
    }, {
        name: "Reports",
        classis: "active",
        icon: "fa-pencil-square-o",
        hasSub: "has-sub",
        subnav: [{
            name: "Setup Rules",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "What-if-Analysis",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Rules Report",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }]
    }, {
        name: "Case Management",
        classis: "active",
        icon: "fa-pencil-square-o",
        anchor: "coming-soon"
    }, {
        name: "Help",
        classis: "active",
        icon: "fa-pencil-square-o",
        hasSub: "has-sub",
        subnav: [{
            name: "Help Documentation",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }]
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