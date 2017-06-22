myApp.controller('CorporateCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/corporate.html");
        TemplateService.title = "Corporate"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = "Data Manager"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();

        $scope.chartConfig = {
            options: {
                chart: {
                       plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'

                },
                title: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                }
            },
            series: [{
                 data: [
            { name: 'Microsoft Internet Explorer', y: 56.33 },
            { name: 'Chrome', y: 24.03 },
            { name: 'Firefox', y: 10.38 },
            { name: 'Safari', y: 4.77 },
            { name: 'Opera', y: 0.91 },
            { name: 'Proprietary or Undetectable', y: 0.2 }
        ]
            }],

            loading: false
        };

    })

    //Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });