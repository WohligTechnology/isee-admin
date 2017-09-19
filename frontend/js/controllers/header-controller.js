myApp.controller('headerCtrl', function ($scope, TemplateService, $state, $scope) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $.fancybox.close(true);

  //submenu
  $scope.oneAtATime = true;

  $scope.classNg = "open";

  $scope.openiconmenu = function () {
    $scope.classNg = "menucollapse";
    $scope.sideMenu();
  }
  $scope.sideMenu = function () {
    console.log("menu");
    if (!$('#sidemenu').hasClass('menucollapse')) {
      console.log("inside menucollapse");
      $scope.classNg = "open";
    }

    if ($scope.classNg === "open") {
      // $scope.classNg = "collapsed";
      // $('#sidemenu').addClass("collapsed");
      $scope.classNg = "menucollapse"; //for animated side menu
      $('#sidemenu').addClass("menucollapse");
      $('#iseelogo').css("width", "70px");
      $('#header-collapsed-icon').css("display", "block"); //to make icon visible in header
      $('.accordion-custom').css("display", "none");
      $('.iseetitle').css("display", "none");
      $('.sideicon').css("opacity", "1");
      // console.log("classNg", $scope.classNg);
    } else {
      $scope.classNg = "open";
      // $('#sidemenu').removeClass("collapsed");
      $('#sidemenu').removeClass("menucollapse");
      $('#iseelogo').css("width", "100px");
      $('#header-collapsed-icon').css("display", "none"); //to hide icon in header 
      $('.accordion-custom').css("display", "block");
      $('.iseetitle').css("display", "inline-block");
      $('.sideicon').css("opacity", "0");
      // console.log("classNg", $scope.classNg);
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