myApp.controller('headerCtrl', function ($scope, TemplateService, $state, $scope) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $.fancybox.close(true);

  //submenu
  $scope.oneAtATime = true;
  $scope.classNg = "open";
  $scope.sideMenu = function () {
    console.log("menu");


    if ($scope.classNg === "open") {
      $scope.classNg = "collapsed";
      $('#sidemenu').addClass("collapsed");
      // $scope.classNg = "menucollapse";    //for animated side menu
      // $('#sidemenu').addClass("menucollapse");
      $('#header-collapsed-icon').css("display", "block"); //to make icon visible in header
    } else {
      $scope.classNg = "open";
      $('#sidemenu').removeClass("collapsed");
      //  $('#sidemenu').removeClass("menucollapse");
      $('#header-collapsed-icon').css("display", "none"); //to hide icon in header 
    }
  };

  //End submenu

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