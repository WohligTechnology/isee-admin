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
    $scope.countries = [];

    $scope.operators = ["==", "<=", ">=", ">", "<", "!=", "Contains", "Matches"];
    //addition of Element/Expression
    $scope.drlRule = {};
    $scope.drlRule.choices = [{}];

    $scope.addNewChoice = function () {
        $scope.drlRule.choices.push({});
    };

    //Remove of Element/Expression
    $scope.removeChoice = function (index) {
        $scope.drlRule.choices.splice(index, 1);
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

    NavigationService.callApi("Web/getAllModels", function (data) {
        if (data.value == true) {
            $scope.allModels = data.data;
            // console.log("aaaa-------    ", $scope.allModels);
        }
    });


    $scope.selectedModel = {};
    $scope.addAllModel = function (val, index) {
        $scope.drlRule.choices[index].model = val;
        $scope.selectedModel.model = val;
        NavigationService.apiCall("Web/getModelFields", $scope.selectedModel, function (data) {
            if (data.value == true) {
                $scope.allFields = data.data;
                // console.log("aaaa-------    ", $scope.allFields);
            }
        });
    };
    $scope.addModelField = function (val, index) {
        $scope.drlRule.choices[index].field = val;

    };
    $scope.addOperator = function (val, index) {
        $scope.drlRule.choices[index].operators = val;
    };


    $scope.drlSave = function (formdata) {
        $scope.rules = {};
        $scope.rules.name = formdata.name;
        $scope.rules.rule = formdata.choices;
        NavigationService.apiCall("RuleEngine/save", $scope.rules, function (data) {
            if (data.value == true) {
                // $scope.allFields = data.data;
                console.log("data-------    ", data);
            }
        });
    }
})