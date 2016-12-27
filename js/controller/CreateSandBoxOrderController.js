/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("CreateSandBoxOrderController",["$scope","$state","orderService",function ($scope,$state,orderService) {
    //初始化会员列表数据
    getMemberInfor();
    function getMemberInfor(option){
        orderService.getSandBoxOrder(option).then(function (data) {
            $scope.members = data;
            $scope.checkedMember = $scope.members ? true : false;
        })
    }
    //下订单
    $scope.getOrder = function (index) {
        $scope.getOrderMemID = $scope.members[index].memberID;
        $scope.getOrderMemCellphone = $scope.members[index].cellphone;
    };

    $scope.statusList = {
        versionList:[
            {
                id:"0",
                txt:"请选择版本"
            },
            {
                id:"1",
                txt:"基础版"
            },
            {
                id:"2",
                txt:"专业版"
            }
        ],
        domainSuffixList:[
            {
                id:"0",
                txt:"域后缀"
            },
            {
                id:"1",
                txt:"shopcevip.cn"
            },
            {
                id:"2",
                txt:"shopce.cn"
            }
        ]
    };
    $scope.pageDate = {
        curVersionStatusItem:$scope.statusList.versionList[0],
        curDomainSuffixStatusItem:$scope.statusList.domainSuffixList[0]
    };

    //时间选择
    $scope.dateData = {
        dt: new Date(),
        opened: false,
        format: "yyyy-MM-dd",
        language:'cn',
        dateOptions: {
            startingDay: 0
        },
        mixDate: null,
        maxDate: null,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.dateData.opened = true;
        },
        closeTxt: "关闭"
    };

    //查找
    $scope.member = {};
    $scope.search = function () {
        var data = {
            memberID:$scope.member.id,
            cellphone:$scope.member.cellphone,
            email:$scope.member.email
        };
        getMemberInfor(data);
    };
    //提交订单
    $scope.submitSandBoxOrder = function () {
        var data = {
            memberID:$scope.getOrderMemID,
            cellphone:$scope.getOrderMemCellphone,
            version:$scope.pageDate.curVersionStatusItem.txt,
            timeEnd:new Date($scope.dateData.dt.toLocaleDateString()).getTime()+(24*60*60-1)*1000,
            twoLevelDomain:$scope.twoLevelDomain+'.'+$scope.pageDate.curDomainSuffixStatusItem.txt
        };
        orderService.submitSandBox(data).then(function () {
            $state.go("orderList");
        });
    }
}]);
