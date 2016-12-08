/**
 * Created by lenovo on 2016/12/8.
 */
operApp.controller("ProductPackageDetailsController",["$scope", "$state",function ($scope,$state) {
    $scope.productPackageDetailsDate = {
        applicationMall:"B2C基础版 v1.0",
        docker:"1个",
        storage:"10G",
        bandwidth:"10M",
        template:"默认、朝霞、冷艳、绿润",
        application:"促销v1.0",
        messages:"1千条",
        emails:"1千封",
        state:"在售/已下架（下架时间：2016-11-12 14:47）",
        identifier:"box-ccc-001",
        productPackageName:"基础版",
        price:" 298元/月",
        priority:"0",
        remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
        releaseTime:"2016-11-10 15:35",
        lastModifiedTime:"2016-11-10 15:35",
        sold:"10000套"
    };
    $scope.back = function () {
        $state.go("productPackage");
    }
}]);
