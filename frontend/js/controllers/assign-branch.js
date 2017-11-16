myApp.controller('AssignBranchCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/assign-branch.html");
    TemplateService.title = "Assign Branch"; //This is the Title of the Website
    TemplateService.class = "assignbranch"; //This is the Class of the Theme
    // TemplateService.templateTitle = "Assign Branch"; //This is the Title of the Theme
    $scope.navigation = NavigationService.getNavigation();
    // $('#multiselect').multiselect();
    $scope.assigned = ['branch 1', 'branch 3', 'branch 5'];
    $scope.available = ['branch 1', 'branch 2', 'branch 3', 'branch 4', 'branch 5', 'branch 6', 'branch 7', 'branch 8'];
    $scope.select = {
        a: null,
        b: null
    }
    $scope.moveleft = function () {

    }
    $scope.moveright = function () {
        console.log($scope.select.a, "select a");
        // console.log(_.indexOf($scope.assigned, $scope.select.a), "moeright");
        // _.slice();
    }

})