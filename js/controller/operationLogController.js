/**
 * Created by lenovo on 2016/12/05.
 */
operApp.controller("operationLogController", ["$scope","$http", function ($scope,$http) {
    //1、日期选择
    $scope.dateData = {
        //dt: "2016-1-1",
        opened: false,
        format: "yyyy-MM-dd",
        dateOptions: {
            startingDay: 4
        },
        mixDate: null,
        maxDate: null,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.dateData.opened = true;
            $scope.dateData2.opened = false;
        },
        closeTxt: "关闭"
    };

    $scope.dateData2 = {
        //dt: "2016-1-7",
        opened: false,
        format2: "yyyy-MM-dd",
        dateOptions: {
            startingDay: 4
        },
        mixDate: null,
        maxDate: null,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.dateData2.opened = true;
            $scope.dateData.opened = false;
        },
        closeTxt: "关闭"
    };
    $scope.logStatusList = [
        //定义列表项
        {
            id: 0,
            txt: "分类"
        },
        {
            id: 1,
            txt: "开通商家"
        },
        {
            id: 2,
            txt: "审核商家"
        }
    ];
    $scope.pageData = {
        curStatusItem: $scope.logStatusList[0]
    };

    renderSystemLogList();
    function renderSystemLogList(){
        $scope.logList = [
            {
                id: "111",
                createTime: 1480403979578,
                name: "管理员",
                ip: "111.145.214.175",
                classify:"修改菜单",
                result:"修改订单[ID:5678 订单状态变更为已支付]"
            },
            {
                id: "222",
                createTime: 1480403975980,
                name: "管理员",
                ip: "222.145.214.10",
                classify:"修改会员密码",
                result:" 修改会员密码[ID:5678 会员密码更改为********]",
            },
            {
                id: "333",
                createTime: 1480403945612,
                name: "管理员",
                ip: "222.145.214.10",
                classify:"修改商品价格",
                result:"商品的价格暂时定义为1988",

            }
        ];
    };
    $scope.changeRoleStatus = function () {
        console.log($scope.pageData.curStatusItem);
    };
    //日志的查询
    $scope.search=function(){
        $http({
             method:'POST',
             url:'',
             data:JSON.stringify({
                 'pageNum': pageNum
                 })
             })
            .success(function (data,status,header,config){

            })
            .error(function (data,status,header,config) {
                    console.error('服务器繁忙，请稍后再试！');
            });
    }



}]);