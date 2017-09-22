myApp.controller('AuthorRuleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
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

    var radioChange = false;


    $scope.operators = ["==", "<=", ">=", ">", "<", "!="];
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

    //model block
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

    //table block

    $scope.selectedTable = {};
    $scope.addAlltables = function (val, index) {
        $scope.drlRule.choices[index].table = val;
        $scope.selectedTable.model = val;
        NavigationService.apiCall("Web/getModelFields", $scope.selectedTable, function (data) {
            if (data.value == true) {
                $scope.allTableFields = data.data;
            }
        });
    };
    $scope.addTableField = function (val, index) {
        $scope.drlRule.choices[index].tableField = val;

    };

    $scope.addOperator = function (val, index) {
        $scope.drlRule.choices[index].operators = val;
    };

    $scope.rules = {};
    $scope.drlSave = function (formdata) {

        if ($stateParams.ruleId) {
            $scope.rules.name = formdata.name;
            $scope.rules.rule = formdata.choices;
            $scope.rules._id = $stateParams.ruleId;
            $scope.rules.status = 'Pending';
            NavigationService.apiCall("RuleEngine/save", $scope.rules, function (data) {
                if (data.value == true) {
                    // $scope.allFields = data.data;
                    // console.log("data-------    ", data);
                    $state.go("view-rules");
                } else {
                    toastr.error("Rule Not Saved");
                }
            });
        } else {
            $scope.rules.name = formdata.name;
            $scope.rules.rule = formdata.choices;
            NavigationService.apiCall("RuleEngine/save", $scope.rules, function (data) {
                if (data.value == true) {
                    // $scope.allFields = data.data;
                    // console.log("data-------    ", data);
                    $state.go("view-rules");
                } else {
                    toastr.error("Rule Not Saved");
                }
            });
        }
    };

    //view all rulesss

    $scope.getRuleData = {};
    $scope.getRuleData._id = $stateParams.ruleId;
    NavigationService.apiCall("RuleEngine/getOne", $scope.getRuleData, function (data) {
        if (data.value == true) {
            $scope.drlRule = data.data;
            $scope.drlRule.choices = data.data.rule;
        }
    });

})