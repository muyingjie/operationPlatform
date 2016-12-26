/**
 * Created by lenovo on 2016/12/1.
 */
operApp.controller("OrderDetailsController",["$scope","$modal","$log","$state","$stateParams","orderService",function ($scope,$modal,$log,$state,$stateParams,orderService) {
    //数据初始渲染
    console.log($stateParams.memberId);
    getOrderDetailInfor($stateParams.memberId);
    function getOrderDetailInfor(member){
        orderService.getOrderDetail().then(function (data) {
            $scope.orderInfor = data.orderInfor;
            $scope.paymentVoucherInfor = data.paymentVoucherInfor;
            $scope.memberInfor = data.memberInfor;
            $scope.commodityInfor = data.commodityInfor;
            $scope.serviceInfor = data.serviceInfor;
            $scope.remarksInfor =data.remarksInfor;

            $scope.commitState = false;
            $scope.commitState = $scope.orderInfor.payStatus === "未支付" ? true : false;
            $scope.goPage = function(orderNum){
                $state.go("applicationForPayment",{orderNum:orderNum});
            };
            $scope.isPaymentVoucher = $scope.paymentVoucherInfor ? true : false;

            $scope.leftBtn= {
                state:'stop',
                txt:'暂停',
                content:""
            };
            $scope.rightBtn = $scope.orderInfor.classify === '域名' ? {state:"unbundling",txt:"解绑"} : $scope.orderInfor.classify === '沙箱' ? {state:"closeSandBox",txt:"关闭沙箱"} : {state:"close",txt:'关闭'};
            $scope.showAllBtn = $scope.orderInfor.classify === '模板' ? false : true;
            $scope.rightBtn.btnShow = $scope.orderInfor.classify === "域名" ? false : true;
            $scope.params = {
                btn: {
                    txt: $scope.leftBtn.txt,
                    ele: "btn",
                    classes: {
                        "btn-first": true
                    }
                },
                popSize: "md",
                popTitle: "操作提示",
                popBodyTplUrl: "myModalContent.html",
                onConfirmClick: function ($modalScope) {
                    console.log($modalScope.extData.content);
                    switch ($modalScope.extData.state) {
                        case "stop":
                            $modalScope.params.btn.txt = "开启";
                            $modalScope.extData.state = "start";
                            break;
                        case "start":
                            $modalScope.params.btn.txt = "暂停";
                            $modalScope.extData.state = "stop";
                            break;
                    }
                    $modalScope.extData.content = "";
                }
            };
            $scope.params1 = {
                btn: {
                    txt: $scope.rightBtn.txt,
                    ele: "btn",
                    classes: {
                        "btn-first": false
                    }
                },
                popSize: "md",
                popTitle: "操作提示",
                popBodyTplUrl: "myModalContent.html",
                onConfirmClick: function ($modalScope) {
                    console.log($modalScope.extData.content);
                    switch ($modalScope.extData.state){
                        case "stop":
                            $modalScope.params.btn.txt = "开启";
                            $modalScope.extData.state = "start";
                            break;
                        case "start":
                            $modalScope.params.btn.txt = "暂停";
                            $modalScope.extData.state = "stop";
                            break;
                        case "closeSandBox":
                            $modalScope.params.btn.txt = "开启沙箱";
                            $modalScope.extData.state = "openSandBox";
                            $scope.rightBtn.btnShow = false;
                            break;
                        case "close":
                            $modalScope.params.btn.txt = "申请退款";
                            $modalScope.extData.state = "open";
                            break;
                        case "openSandBox":
                            $modalScope.params.btn.txt = "关闭沙箱";
                            $modalScope.extData.state = "closeSandBox";
                            $scope.rightBtn.btnShow = true;
                            break;
                        case "unbundling":
                            $scope.showAllBtn = false;
                            break;
                    }
                    $modalScope.extData.content = "";
                }
            };
    })
    };
}]);