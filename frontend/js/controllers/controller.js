myApp.controller('CorporateCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/corporate.html");
        TemplateService.title = "Corporate"; //This is the Title of the Website
        TemplateService.class = "corporate"; //This is the Class of the Theme
        TemplateService.templateTitle = "Data Manager"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false

                },
                title: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                }
            },
            series: [{
                data: [{
                    name: 'Task Completion',
                    y: 61,
                    color: '#E94B3B'
                }, {
                    name: 'Earing',
                    y: 20,
                    color: '#8AD5E7'
                }, {
                    name: 'Download',
                    color: '#F8C471',
                    y: 19
                }]
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