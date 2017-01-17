/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("AddProductPackageController",["$scope", "$state","$stateParams","productService",function ($scope,$state,$stateParams,productService) {
    //console.log($stateParams.productPackageNum);
    function getProductPackage(option){
        productService.productPackage(option).then(function (data) {
            $scope.productConfiguration = data;
            $scope.pageDate = $scope.statusList[data.priceRule];
        })
    }
    getProductPackage($stateParams.productPackageNum);
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

    $scope.configuration = {};

    $scope.save = function () {
        console.log($scope.configuration.applicationMall);
        console.log($scope.configuration.docker);
        console.log($scope.configuration.template);
        //$state.go("productPackage")
    };

    $scope.cancel = function () {
        $state.go("productPackage")
    }
}]);
