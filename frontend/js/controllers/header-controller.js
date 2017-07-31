myApp.controller('headerCtrl', function ($scope, TemplateService, $state, $scope) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $.fancybox.close(true);

  //submenu
  $scope.subClass = "closeSub";
  // $scope.subMenu = function () {
  //   console.log("menu");

  // };
  //End submenu



  $scope.subMenu = function (navigation) {
    if (navigation.subClass == "closeSub") {
      navigation.subClass = "expanded";
    } else {
      navigation.subClass = "closeSub";
      console.log("Closemenu");
    };
  }

  // jStorage for user 
  if (!$.jStorage.get("User")) {
    $state.go("login");
  }

  $scope.userData = $.jStorage.get("User");

  $scope.logout = function () {
    $.jStorage.flush("User");
    $state.go("login");
  };

  //End  jStorage for user
});