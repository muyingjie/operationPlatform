/**
 * Created by lenovo on 2016/12/27.
 */
operApp.controller("IndexController", ["$scope", "IndexService", function ($scope, IndexService) {
    IndexService.getTotalOverviewData().then(function (data) {
        $scope.totalOverviewData = data;
    });
    IndexService.getYesterdayData().then(function (data) {
        $scope.yesterdayData = data;
    });
}]);