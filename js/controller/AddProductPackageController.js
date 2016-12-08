/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("AddProductPackageController",["$scope", "$state",function ($scope,$state) {
    $scope.statusList = [
        {
            id:"0",
            txt:"元/月"
        },
        {
            id:"1",
            txt:"元/套"
        }
    ];
    $scope.pageDate = $scope.statusList[0];

    $scope.save = function () {
        $state.go("productPackage")
    }

    $scope.cancel = function () {
        $state.go("productPackage")
    }
}]);
