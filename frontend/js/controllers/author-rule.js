myApp.controller('AuthorRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
    $scope.template = TemplateService.getHTML("content/author-rule.html");
    TemplateService.title = "Author Rule"; //This is the Title of the Website
    TemplateService.class = ""; //This is the Class of Page
    $scope.navigation = NavigationService.getNavigation();
    $scope.submitForm = function (formLoginData) {
        console.log("This is it");
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };
    $scope.countries = [{}];

    $scope.operators = [
        {
        name:"="
    },
        {
        name:"<="
    },
        {
        name:">="
    },
        {
        name:">"
    },
        {
        name:"<"
    },
        {
        name:"!="
    },
        {
        name:"Contains"
    },
        {
        name:"Matches"
    },
    ];
//addition of Element/Expression
  $scope.choices = [{id: 'choice1'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };

//Remove of Element/Expression
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
// End Remove of Element/Expression

    $scope.confCancel = function (callback) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/views/modal/conf-cancel.html',
            size: 'md',
            scope: $scope
        });
        $scope.close = function (value) {
            callback(value);
            modalInstance.close("cancel");
        };
    };
})