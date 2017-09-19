var uploadurl = adminurl + "upload/";

myApp.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        anchor: "dashboard",
        hasSub: "has-sub",
        icon: "fa-tachometer",
    }, {
        name: "Predictive Dashboard",
        classis: "active",
        anchor: "predictive-dashboard",
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
            anchor: "customer-detail",
            icon: "fa-cog"
        }, {
            name: "License Manager",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "User Admin",
            classis: "active",
            anchor: "user-admin",
            icon: "fa-cog"
        }, {
            name: "Roles Administration",
            classis: "active",
            anchor: "role-administration",
            icon: "fa-cog"
        }]
    }, {
        name: "Company Admin",
        classis: "active",
        icon: "fa-tasks",
        hasSub: "has-sub",
        subnav: [
            //     {
            //     name: "Setup Company",
            //     classis: "active",
            //     anchor: "coming-soon",
            //     icon: "fa-cog"
            // }
            {
                name: "Setup User",
                classis: "active",
                anchor: "coming-soon",
                icon: "fa-cog"
            },
            {
                name: "Role Administration",
                classis: "active",
                anchor: "coming-soon",
                icon: "fa-cog"
            }, {
                name: "Store/Branch Setup",
                classis: "active",
                anchor: "customer-detail",
                icon: "fa-cog"
            }
        ]
    }, {
        name: "Rules Admin",
        classis: "active",
        icon: "fa-pencil-square-o",
        hasSub: "has-sub",
        subnav: [{
            name: "Setup Rules",
            classis: "active",
            // anchor: "es-rule",
            anchor: "drl-rule",
            icon: "fa-cog"
        }, {
            name: "What-if-Analysis",
            classis: "active",
            anchor: "coming-soon",
            icon: "fa-cog"
        }, {
            name: "Rules Report",
            classis: "active",
            anchor: "view-rules",
            icon: "fa-cog"
        }]
    }, {
        name: "Reports",
        classis: "active",
        icon: "fa-pencil-square-o",
        hasSub: "has-sub",
        subnav: [{
            name: "Corporate Overview",
            classis: "active",
            anchor: "dashboard",
            icon: "fa-cog"
        }, {
            name: "Cash Short",
            classis: "active",
            anchor: "cash-short",
            icon: "fa-cog"
        }, {
            name: "Map – Sales",
            classis: "active",
            anchor: "map-sales",
            icon: "fa-cog"
        }, {
            name: "Map – Cash Short",
            classis: "active",
            anchor: "map-cash-short",
            icon: "fa-cog"
        }, {
            name: "Transactions Report",
            classis: "active",
            anchor: "transaction-report",
            icon: "fa-cog"
        }, {
            name: "Till Register",
            classis: "active",
            anchor: "till-register",
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
    }, {
        name: "Terms and Conditions",
        classis: "active",
        icon: "fa-pencil-square-o",
        anchor: "terms-condition"
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

        callApi: function (url, callback) {
            $http.post(adminurl + url).then(function (data) {
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