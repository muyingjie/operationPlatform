/**
 * Created by lenovo on 2016/12/8.
 */
operApp.controller("ProductPackageDetailsController",["$scope", "$state","$stateParams","productService",function ($scope,$state,$stateParams,productService) {
    console.log($stateParams.productPackageNum);
    //初始化产品套餐详情
    function getProductPackage(option){
        productService.productPackageDetails(option).then(function (data) {
            $scope.productPackageDetailsDate = data;
        })
    }
    getProductPackage($stateParams.productPackageNum);

    $scope.back = function () {
        $state.go("productPackage");
    }
}]);
