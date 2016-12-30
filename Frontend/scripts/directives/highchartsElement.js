/**
 * Created by Trifon.Dardzhonov on 30/12/2016.
 */
app.directive("highchartsElement", [function () {
    return {
        restrict: 'E',
        scope: {
            options: "=",
            chartVersion: "="
        },
        template: "<div class='ch-container'></div>",
        link: function ($scope, element) {
            var highchartsElement = $(element[0].childNodes[0]);

            $scope.$watch('chartVersion', function () {
                if ($scope.options) {
                    $scope.options.width = 800;
                    $scope.options.credits = { enabled: false };
                    highchartsElement.highcharts($scope.options);
                }
            });
        }
    }
}]);