/**
 * Created by lenovo on 2016/12/6.
 */
operApp.controller("ApplicationForPayment",["$scope", "$state","$stateParams","orderService",function ($scope,$state,$stateParams,orderService) {
    //console.log($stateParams.orderNum);
    $scope.payment = {};

    //初始化订单信息
    getOrderInf({
        memberID:$stateParams.memberId,
        state:"",
        content:""
    });
    function getOrderInf(obj){
        orderService.getOrderDetail(obj).then(function (data) {
            $scope.orderInfor = data.orderInfor;
        })
    }
    function sendApplication(obj){
        orderService.submitApplication(obj).then(function (data) {
            $state.go("orderDetails");
        })
    }
    $scope.submitApplication = function () {
        var payment = {
            memberID:$stateParams.memberId,
            way:$scope.payment.way,
            account:$scope.payment.account,
            amount:$scope.payment.amount,
            time:$scope.payment.time,
            remarks:$scope.payment.remarks
        }
        console.log(payment);
        sendApplication(payment)

    };
    $scope.cancelSubmitApplication = function () {
        $state.go("orderDetails");
    }
}]);
