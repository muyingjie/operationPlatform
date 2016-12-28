/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("ProductPackageController",["$scope" ,"$modal","$log","$state","productService",function ($scope,$modal,$log,$state,productService) {
    //初始化产品套餐列表
    function getProductPackage(option){
        productService.getProductPackage(option).then(function (data) {
            $scope.productPackageListInfor = data;
        })
    }

    //添加套餐包
    $scope.addProductPackage = function () {
       $state.go("addProductPackage")
    };
    //上下架操作
    $scope.params = {
        btn: {
            txt: "上架",
            ele: "a"
        },
        popTitle: "操作提示",
        popBodyTpl: "确认要上架吗？",
        onConfirmClick: function () {

            productService.saleOnShelves({id:1223}).then(function (data) {
                alert("确定时触发");
            })
        }
    };
    //分页
    $scope.paginationConf = {
        currentPage: 5,
        total:18895,
        pageSize:20,
        pagesLength: 5,
        upDateInterFace: function (data) {
            //console.log(data);
            getProductPackage(data);
        }
    };

    //编辑
    $scope.edit = function () {
        $state.go("addProductPackage")
    };
    //详情
    $scope.details = function () {
        $state.go("productPackageDetails")
    }
}]);

