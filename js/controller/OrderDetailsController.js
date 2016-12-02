/**
 * Created by lenovo on 2016/12/1.
 */
operApp.controller("OrderDetailsController",["$scope", function ($scope) {
    $scope.orderInfor = {
        orderNumber: "111110010050",
        memberName: "张三",
        twoLevelDomainName: "abc123.shopce.cn",
        orderTime: "2016-11-30 16:30:24",
        classify: "注册",
        commodity: "试用版",
        cost:"297.00",
        timeLimit:'365天',
        effectiveDate:'2016-11-30~2017-11-30',
        payStatus:'未支付',
        deliveryStatus:'已交付',
        protocolState:"执行中",
        operation:'详情'
    };
    $scope.commitState = false;
    $scope.commitState = $scope.orderInfor.payStatus === "未支付" ? true : false;

    $scope.paymentVoucherInfor = {
        paymentWay:'支付宝',
        paymentAccount:'laorui@163.com',
        paymentAmount:'2980.00',
        paymentTime:'2016-11-30 16:30:24',
        remarks:'这是备注信息'
    };
    $scope.memberInfor = {
        memberID:'100000008',
        cellphone:'12354786951',
        name:'张三/果园老农',
        email:'laorui@sohu.com',
        twoLevelDomainName: "abc123.shopce.cn"
    };
    $scope.commodityInfor = {
        commodityNumber:'box-ccc-001',
        term:'3个月',
        commodity:'适用版',
        effectiveDate:'2016-11-30~2017-11-30',
        deliveryStatus:'已交付'
    };
    $scope.serviceInfor = [
        {
            workOrderNum:'111110010050',
            workOrderClassify:'商城开通',
            generationTime:'2016-11-21 17:47',
            productID:'xyz12'
        }
    ]
}]);
