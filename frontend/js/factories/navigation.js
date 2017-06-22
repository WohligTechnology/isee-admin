myApp.factory('NavigationService', function () {
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
            name: "Subnav1",
            classis: "active",
            anchor: "home"
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
    };
});