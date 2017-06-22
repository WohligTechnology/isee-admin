myApp.controller('headerCtrl', function ($scope, TemplateService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $.fancybox.close(true);
            $scope.classNg = "open";
  $scope.sideMenu = function(){
      console.log("menu");
    if ($scope.classNg === "open")
      $scope.classNg = "collapsed";
    else
      $scope.classNg = "open";
  };

              $scope.subClass = "closeSub";
  $scope.subMenu = function(){
      console.log("menu");
    if ($scope.subClass === "closeSub")
      $scope.subClass = "expanded";
    else
      $scope.subClass = "closeSub";
  };
});