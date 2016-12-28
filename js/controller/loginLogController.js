/**
 * Created by lenovo on 2016/12/05.
 */
operApp.controller("loginLogController", ["$scope", "LogService",function ($scope,LogService) {
    //1、日期选择
    $scope.dateData = {
        startTime:new Date(),
        //dt: "2016-1-1",
        opened: false,
        format: "yyyy-MM-dd",
        dateOptions: {
            startingDay: 0
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
        endTime:new Date(),
        opened: false,
        format: "yyyy-MM-dd",
        dateOptions: {
            startingDay: 0
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
    $scope.filterData = {
        startTime: "",
        endTime: "",
        operPerson: "",
    };
    //列表渲染 从后台获取数据显示到页面中 12.19
    getLogList();
    function getLogList(option){
       /* $scope.filterData.status = $scope.pageData.curStatusItem.id;*/
     /*   console.log($scope.filterData);
        console.log( $scope.filterData.status);*/
        LogService.getLogList(option).then(function(data){
           $scope.logList = data.dataList;//把从后台请求的返回的数据展示
            $scope.paginationConf.total = data.total;
        })
    }
    $scope.changeRoleStatus = function () {
        console.log($scope.pageData.curStatusItem);
    };
    //日志的查询，从后台返回的查询结果绑定到视图上
    $scope.filterData={};
    $scope.search = function(){
        var data = {
            startTime:new Date($scope.filterData.startTime.toLocaleDateString()).getTime(),
            endTime:new Date($scope.filterData.endTime.toLocaleDateString()).getTime()+(24*60*60-1)*1000,
            operPerson:$scope.filterData.operPerson,
            status:$scope.pageData.curStatusItem.id

        };
        //根据搜索条件寻找对应的值
        getLogList(data);
    };
    //分页
    $scope.paginationConf = {
        currentPage: 1,
        total:1,
        pageSize:20,
        pagesLength: 5,
        menuState:"all",
        upDateInterFace: function (data) {
            getLogList(data);
        }
    };


}]);