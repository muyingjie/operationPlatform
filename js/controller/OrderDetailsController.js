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

            //$scope.orderInfor = {
            //    orderNumber: "111110010050",
            //    memberName: "张三",
            //    twoLevelDomainName: "abc123.shopce.cn",
            //    orderTime: "2016-11-30 16:30:24",
            //    classify: "注册",
            //    commodity: "试用版",
            //    cost:"297.00",
            //    timeLimit:'365天',
            //    effectiveDate:'2016-11-30~2017-11-30',
            //    payStatus:'未支付',
            //    deliveryStatus:'已交付',
            //    protocolState:"执行中",
            //    operation:'详情'
            //};
            $scope.commitState = false;
            $scope.commitState = $scope.orderInfor.payStatus === "未支付" ? true : false;
            $scope.goPage = function(orderNum){
                $state.go("applicationForPayment",{orderNum:orderNum});
            };
            //$scope.paymentVoucherInfor = {
            //    paymentWay:'支付宝',
            //    paymentAccount:'laorui@163.com',
            //    paymentAmount:'2980.00',
            //    paymentTime:'2016-11-30 16:30:24',
            //    remarks:'这是备注信息'
            //};
            $scope.isPaymentVoucher = $scope.paymentVoucherInfor ? true : false;

            //$scope.memberInfor = {
            //    memberID:'100000008',
            //    cellphone:'12354786951',
            //    name:'张三/果园老农',
            //    email:'laorui@sohu.com',
            //    twoLevelDomainName: "abc123.shopce.cn"
            //};
            //$scope.commodityInfor = {
            //    commodityNumber:'box-ccc-001',
            //    term:'3个月',
            //    commodity:'适用版',
            //    effectiveDate:'2016-11-30~2017-11-30',
            //    deliveryStatus:'已交付'
            //};
            //$scope.serviceInfor = [
            //    {
            //        workOrderNum:'111110010050',
            //        workOrderClassify:'商城开通',
            //        generationTime:'2016-11-21 17:47',
            //        productID:'xyz12',
            //        commodityName:'B2C',
            //        version:'V1.0',
            //        state:'待执行',
            //        completionTime:'2016-11-21 17:47'
            //    },
            //    {
            //        workOrderNum:'111110010050',
            //        workOrderClassify:'商城开通',
            //        generationTime:'2016-11-21 17:47',
            //        productID:'xyz12',
            //        commodityName:'B2C',
            //        version:'V1.0',
            //        state:'待执行',
            //        completionTime:'2016-11-21 17:47'
            //    },
            //    {
            //        workOrderNum:'111110010050',
            //        workOrderClassify:'商城开通',
            //        generationTime:'2016-11-21 17:47',
            //        productID:'xyz12',
            //        commodityName:'B2C',
            //        version:'V1.0',
            //        state:'待执行',
            //        completionTime:'2016-11-21 17:47'
            //    }
            //];

            //$scope.remarksInfor = [
            //    '2016-11-21 17:47 因商品有问题，商城关闭；',
            //    '2016-11-21 17:47 商城重新开启；',
            //    '2016-11-21 17:47 服务到期，商城关闭；'
            //];
            $scope.leftBtn= {
                state:'stop',
                txt:'暂停'
            };
            $scope.rightBtn = $scope.orderInfor.classify === '域名' ? {state:"unbundling",txt:"解绑"} : $scope.orderInfor.classify === '沙箱' ? {state:"closeSandBox",txt:"关闭沙箱"} : {state:"close",txt:'关闭'};
            //$scope.rightBtn = $scope.orderInfor.classify === '沙箱' ? {state:"closeSandBox",txt:"关闭沙箱"} : {state:"close",txt:'关闭'};
            $scope.showAllBtn = $scope.orderInfor.classify === '模板' ? false : true;
            $scope.leftBtnMethod = function (state) {
                $scope.items.title = $scope.leftBtn.txt;
                $scope.items.btnMethod = $scope.leftBtn;
                $scope.items.showAllBtn = $scope.showAllBtn;
                $scope.open();

            };
            $scope.btnShow = $scope.rightBtn.state === 'openSandBox' ? false : true;
            $scope.rightBtn.btnShow = $scope.orderInfor.classify === "域名" ? false : true;

            $scope.rightBtnMethod = function (state) {
                $scope.items.title = $scope.rightBtn.txt;
                $scope.items.btnMethod = $scope.rightBtn;
                $scope.items.showAllBtn = $scope.showAllBtn;
                $scope.open();

            };
            $scope.items = {};
            $scope.open = function (size) {
                var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
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
        })
    }
}]);
operApp.controller('ModalInstanceCtrl', ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.ok = function () {
        $modalInstance.close();
        switch ($scope.items.btnMethod.state){
            case 'stop':
                $scope.items.btnMethod.state = 'start';
                $scope.items.btnMethod.txt = '开启';
                break;
            case 'start':
                $scope.items.btnMethod.state = 'stop';
                $scope.items.btnMethod.txt = '暂停';
                break;
            case 'closeSandBox':
                $scope.items.btnMethod.state =  'openSandBox';
                $scope.items.btnMethod.txt = '开启沙箱';
                $scope.items.btnMethod.btnShow = false;
                break;
            case 'close':
                $scope.items.btnMethod.state =  'open';
                $scope.items.btnMethod.txt = '申请退款';
                $scope.items.btnMethod.btnShow = true;
                break;
            case 'openSandBox':
                $scope.items.btnMethod.state =  'closeSandBox';
                $scope.items.btnMethod.txt = '关闭沙箱';
                $scope.items.btnMethod.btnShow = true;
                break;
            case "unbundling":
                $scope.items.btnMethod.showAllBtn = false;
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);