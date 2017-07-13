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
    $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
        {
            name: 'Afghanistan',
            code: 'AF'
        },
        {
            name: 'Åland Islands',
            code: 'AX'
        },
        {
            name: 'Albania',
            code: 'AL'
        },
        {
            name: 'Algeria',
            code: 'DZ'
        },
        {
            name: 'Azerbaijan',
            code: 'AZ'
        },
        {
            name: 'Bahamas',
            code: 'BS'
        },
        {
            name: 'Bahrain',
            code: 'BH'
        },
        {
            name: 'Bangladesh',
            code: 'BD'
        },
        {
            name: 'Bulgaria',
            code: 'BG'
        },
        {
            name: 'Burkina Faso',
            code: 'BF'
        },
        {
            name: 'Burundi',
            code: 'BI'
        },
        {
            name: 'Cambodia',
            code: 'KH'
        },
        {
            name: 'Cameroon',
            code: 'CM'
        },
        {
            name: 'Czech Republic',
            code: 'CZ'
        },
        {
            name: 'Denmark',
            code: 'DK'
        },
        {
            name: 'Djibouti',
            code: 'DJ'
        },
        {
            name: 'Dominica',
            code: 'DM'
        },
        {
            name: 'Dominican Republic',
            code: 'DO'
        },
        {
            name: 'Ecuador',
            code: 'EC'
        },
        {
            name: 'Egypt',
            code: 'EG'
        },
        {
            name: 'El Salvador',
            code: 'SV'
        },
        {
            name: 'Equatorial Guinea',
            code: 'GQ'
        },
        {
            name: 'Eritrea',
            code: 'ER'
        },
        {
            name: 'Estonia',
            code: 'EE'
        },
        {
            name: 'Gabon',
            code: 'GA'
        },
        {
            name: 'Gambia',
            code: 'GM'
        },
        {
            name: 'Georgia',
            code: 'GE'
        },
        {
            name: 'Germany',
            code: 'DE'
        },
        {
            name: 'Ghana',
            code: 'GH'
        },
        {
            name: 'Heard Island and Mcdonald Islands',
            code: 'HM'
        },
        {
            name: 'Holy See (Vatican City State)',
            code: 'VA'
        },
        {
            name: 'Honduras',
            code: 'HN'
        },
        {
            name: 'Hong Kong',
            code: 'HK'
        },
        {
            name: 'Hungary',
            code: 'HU'
        },
        {
            name: 'Iceland',
            code: 'IS'
        },
        {
            name: 'India',
            code: 'IN'
        },
        {
            name: 'Indonesia',
            code: 'ID'
        },
        {
            name: 'Kazakhstan',
            code: 'KZ'
        },
        {
            name: 'Kenya',
            code: 'KE'
        },
        {
            name: 'Kiribati',
            code: 'KI'
        },
        {
            name: 'Korea, Democratic People\'s Republic of',
            code: 'KP'
        },
        {
            name: 'Korea, Republic of',
            code: 'KR'
        },
        {
            name: 'Niue',
            code: 'NU'
        },
        {
            name: 'Norfolk Island',
            code: 'NF'
        },
        {
            name: 'Northern Mariana Islands',
            code: 'MP'
        },
        {
            name: 'Norway',
            code: 'NO'
        },
        {
            name: 'Oman',
            code: 'OM'
        },
        {
            name: 'Pakistan',
            code: 'PK'
        },
        {
            name: 'Palau',
            code: 'PW'
        },
        {
            name: 'Russian Federation',
            code: 'RU'
        },
        {
            name: 'Rwanda',
            code: 'RW'
        },
        {
            name: 'Saint Helena',
            code: 'SH'
        },
        {
            name: 'Swaziland',
            code: 'SZ'
        },
        {
            name: 'Sweden',
            code: 'SE'
        },
        {
            name: 'Switzerland',
            code: 'CH'
        },
        {
            name: 'Syrian Arab Republic',
            code: 'SY'
        },
        {
            name: 'Taiwan, Province of China',
            code: 'TW'
        },
        {
            name: 'Tajikistan',
            code: 'TJ'
        },
        {
            name: 'Togo',
            code: 'TG'
        },
        {
            name: 'Tokelau',
            code: 'TK'
        },
        {
            name: 'Tonga',
            code: 'TO'
        },
        {
            name: 'Virgin Islands, U.S.',
            code: 'VI'
        },
        {
            name: 'Wallis and Futuna',
            code: 'WF'
        },
        {
            name: 'Western Sahara',
            code: 'EH'
        },
        {
            name: 'Yemen',
            code: 'YE'
        },
        {
            name: 'Zambia',
            code: 'ZM'
        },
        {
            name: 'Zimbabwe',
            code: 'ZW'
        }
    ];

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