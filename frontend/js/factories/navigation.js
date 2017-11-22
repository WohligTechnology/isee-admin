var uploadurl = adminurl + "upload/";

myApp.factory('NavigationService', function ($http) {

    var navigation_tab = [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            // hasSub: "has-sub",
            icon: "fa-tachometer",
            subnav: []
        },
        {
            name: "Predictive Dashboard",
            classis: "active",
            anchor: "predictive-dashboard",
            icon: "fa-tachometer",
            subnav: []
        }
        // , {
        //     name: "Rules Admin",
        //     classis: "active",
        //     icon: "fa-pencil-square-o",
        //     // anchor: "rules-admin"
        //     hasSub: "has-sub",
        //     subnav: [{
        //         name: "Violations",
        //         classis: "active",
        //         anchor: "rules-admin-violations",
        //         icon: "fa-cog"
        //     }]
        // }
        ,
        {
            name: "Reports",
            classis: "active",
            icon: "fa-pencil-square-o",
            // anchor: "reports"
            hasSub: "has-sub",
            subnav: [{
                name: "Corporate Overview",
                classis: "active",
                anchor: "corporate",
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
        },
        {
            name: "Case Management",
            classis: "active",
            icon: "fa-pencil-square-o",
            anchor: "case-management",
            subnav: []
        },

    ]

    var navigation_mobile = [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            // hasSub: "has-sub",
            icon: "fa-tachometer",
            subnav: []
        },
        {
            name: "Predictive Dashboard",
            classis: "active",
            anchor: "predictive-dashboard",
            icon: "fa-tachometer",
            subnav: []
        },
        {
            name: "Corporate Overview",
            classis: "active",
            anchor: "corporate",
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
        },
        {
            name: "Case Management",
            classis: "active",
            icon: "fa-pencil-square-o",
            anchor: "case-management",
            subnav: []
        }
    ];


    var navigation = [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            // hasSub: "has-sub",
            icon: "fa-tachometer",
            subnav: []
        }, {
            name: "Predictive Dashboard",
            classis: "active",
            anchor: "predictive-dashboard",
            icon: "fa-tachometer",
            subnav: []
        }, {
            name: "Product Admin",
            classis: "active",
            // anchor: "product-admin",
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
                anchor: "license-manager",
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
            // anchor: "company-admin"
            hasSub: "has-sub",
            subnav: [{
                    name: "Setup User",
                    classis: "active",
                    anchor: "setup-user",
                    icon: "fa-cog"
                },
                {
                    name: "Role Administration",
                    classis: "active",
                    anchor: "company-role-administration",
                    icon: "fa-cog"
                }, {
                    name: "Store/Branch Setup",
                    classis: "active",
                    anchor: "branch-setup",
                    icon: "fa-cog"
                }
            ]
        }, {
            name: "Rules Admin",
            classis: "active",
            icon: "fa-pencil-square-o",
            // anchor: "rules-admin"
            hasSub: "has-sub",
            subnav: [{
                    name: "Setup Rules",
                    classis: "active",
                    anchor: "drl-rule",
                    icon: "fa-cog"
                }, {
                    name: "What-if-Analysis",
                    classis: "active",
                    anchor: "what-if-analysis",
                    icon: "fa-cog"
                }, {
                    name: "Rules Report",
                    classis: "active",
                    anchor: "view-rules",
                    icon: "fa-cog"
                },
                {
                    name: "Violations",
                    classis: "active",
                    anchor: "rules-admin-violations",
                    icon: "fa-cog"
                }
            ]
        }, {
            name: "Reports",
            classis: "active",
            icon: "fa-pencil-square-o",
            // anchor: "reports"
            hasSub: "has-sub",
            subnav: [{
                name: "Corporate Overview",
                classis: "active",
                anchor: "corporate",
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
            anchor: "case-management",
            subnav: []
        }, {
            name: "Help",
            classis: "active",
            icon: "fa-pencil-square-o",
            hasSub: "has-sub",
            subnav: [{
                name: "Help Documentation",
                classis: "active",
                anchor: "help",
                icon: "fa-cog"
            }]
        },
        // {
        //     name: "Terms and Conditions",
        //     classis: "active",
        //     icon: "fa-pencil-square-o",
        //     anchor: "terms-condition",
        //     subnav: []
        // }
    ];

    return {
        getNavigation: function () {
            return navigation;
        },
        getNavigationMobile: function () {
            return navigation_mobile;
        },
        getNavigationTab: function () {
            return navigation_tab;
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