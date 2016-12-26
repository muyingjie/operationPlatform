/**
 * Created by lenovo on 2016/12/6.
 */
operApp.controller("ApplicationForPayment",["$scope", "$state","$stateParams","orderService",function ($scope,$state,$stateParams,orderService) {
    //console.log($stateParams.orderNum);
    $scope.payment = {};

    //初始化订单信息
    getOrderInf();
    function getOrderInf(){
        orderService.getOrderDetail().then(function (data) {
            $scope.orderInfor = data.orderInfor;
        })
    }
    //$scope.orderInfor = {
    //    orderNumber: "111110010050",
    //    memberName: "张三",
    //    twoLevelDomainName: "abc123.shopce.cn",
    //    orderTime: "2016-11-30 16:30:24",
    //    classify: "沙箱",
    //    commodity: "试用版",
    //    cost:"297.00",
    //    timeLimit:'365天',
    //    effectiveDate:'2016-11-30~2017-11-30',
    //    payStatus:'未支付',
    //    deliveryStatus:'已交付',
    //    protocolState:"执行中",
    //    operation:'详情'
    //};

    $scope.submitApplication = function () {
        console.log($scope.payment.account);
        console.log($scope.payment.way);
        //$state.go("orderDetails");
    };
    $scope.cancelSubmitApplication = function () {
        $state.go("orderDetails");
    }
}]);
