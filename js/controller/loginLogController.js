/**
 * Created by lenovo on 2016/12/05.
 */
operApp.controller("loginLogController", ["$scope", function ($scope) {
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
        format: "yyyy-MM-dd",
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
            txt: "结果"
        },
        {
            id: 1,
            txt: "成功"
        },
        {
            id: 2,
            txt: "失败"
        }
    ];
    $scope.pageData = {
        curStatusItem: $scope.logStatusList[0]
    };

    renderSystemLogList();
    function renderSystemLogList(){
        $scope.logList = [
            {
                id: "1",
                account: "admin",
                name: "管理员",
                createTime: 1480403979578,
                ip: "111.145.214.175",
                result:"成功",
            },
            {
                id: "2",
                account: "abc123",
                name: "李钦",
                createTime: 1480403979534,
                ip: "222.145.214.173",
                result:"失败",
            },
            {
                id: "3",
                account: "youxian",
                name: "小李",
                createTime: 1480403971278,
                ip: "333.145.214.175",
                result:"成功",

            }
        ];
    };
    $scope.changeRoleStatus = function () {
        console.log($scope.pageData.curStatusItem);
    };
    //日志的查询
    $scope.search=function(){
        //发起http请求
    }
}]);