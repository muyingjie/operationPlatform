/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("ProductPackageController",["$scope" ,"$modal","$log","$state",function ($scope,$modal,$log,$state) {
    $scope.productPackageListInfor = [
        {
            productPackageNum:"box-ccc-001",
            productPackageName:"基础版",
            price:"198",
            priority:"0",
            remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
            releaseTime:"2016-10-11",
            state:"待出售",
            sold:"55345"
        },
        {
            productPackageNum:"box-ccc-001",
            productPackageName:"基础版",
            price:"198",
            priority:"0",
            remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
            releaseTime:"2016-10-11",
            state:"待出售",
            sold:"55345"
        },
        {
            productPackageNum:"box-ccc-001",
            productPackageName:"基础版",
            price:"198",
            priority:"0",
            remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
            releaseTime:"2016-10-11",
            state:"待出售",
            sold:"55345"
        },
        {
            productPackageNum:"box-ccc-001",
            productPackageName:"基础版",
            price:"198",
            priority:"0",
            remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
            releaseTime:"2016-10-11",
            state:"待出售",
            sold:"55345"
        },
        {
            productPackageNum:"box-ccc-001",
            productPackageName:"基础版",
            price:"198",
            priority:"0",
            remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
            releaseTime:"2016-10-11",
            state:"待出售",
            sold:"55345"
        }
    ];
    //添加套餐包
    $scope.addProductPackage = function () {
       $state.go("addProductPackage")
    };
    //上下架操作
    $scope.handleShelves = function () {
        $scope.open();
    };
    $scope.items = {};
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContentq.html',
            controller: 'ModalInstanceCtrlq',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
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

operApp.controller('ModalInstanceCtrlq', ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
