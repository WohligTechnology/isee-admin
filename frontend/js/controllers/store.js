    myApp.controller('StoreCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.getHTML("content/store.html");
        TemplateService.title = "Store"; //This is the Title of the Website
        TemplateService.class = "store"; //This is the Class of the Theme
        TemplateService.templateTitle = "Stores Manager"; //This is the Title of the Theme
        $scope.navigation = NavigationService.getNavigation();

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'spline'

                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Cash Refunded'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '°';
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                }
            },
            series: [{
                name: 'Tokyo',
                marker: {
                    symbol: 'square'
                },
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                    y: 26.5,
                    // marker: {
                    //     symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                    // }
                }, 23.3, 18.3, 13.9, 9.6]

            }, {
                name: 'London',
                marker: {
                    symbol: 'diamond'
                },
                data: [{
                    y: 3.9,
                    // marker: {
                    //     symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                    // }
                }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }],

            loading: false
        };
    })