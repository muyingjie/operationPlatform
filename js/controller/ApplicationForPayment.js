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

    $scope.submitApplication = function () {
        console.log($scope.payment.account);
        console.log($scope.payment.way);
        //$state.go("orderDetails");
    };
    $scope.cancelSubmitApplication = function () {
        $state.go("orderDetails");
    }
}]);
