/**
 * Created by lenovo on 2016/12/05.
 */
operApp.controller("operationLogController", ["$scope","$http", "LogService",function ($scope,$http,LogService) {
    //1、日期选择
    $scope.dateData = {
        //dt: "2016-1-1",
        startTime:new Date(),
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
        format2: "yyyy-MM-dd",
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
    $scope.filterData = {
        logId:"",
        startTime: "",
        endTime: "",
        operPerson: "",
    };
    //(new Date()).valueOf(); 转化成时间戳到后台

    //列表渲染 从后台获取数据显示到页面中 12.19
    getOperLogList();
    function getOperLogList(option){
        //$scope.filterData.status = $scope.pageData.curStatusItem.id;
        LogService.getOperLogList(option).then(function(data){
            $scope.logList = data;//把从后台请求的返回的数据展示
            $scope.paginationConf.total = data.total;
        })
    }
    //分页
    $scope.paginationConf = {
        currentPage: 1,
        total:1,
        pageSize:40,
        pagesLength: 5,
        menuState:"all",
        upDateInterFace: function (data) {
            getOperLogList(data)
        }
    };
    $scope.changeRoleStatus = function () {
        console.log($scope.pageData.curStatusItem);
    };
    //日志的查询,向后台传递数据，然后显示到视图上
    $scope.filterData={};
    $scope.search=function(){
       var data = {
           logId:$scope.filterData.logId,
           startTime:new Date($scope.filterData.startTime.toLocaleDateString()).getTime(),
           endTime:new Date($scope.filterData.endTime.toLocaleDateString()).getTime()+(24*60*60-1)*1000,
           operPerson: $scope.filterData.operPerson,
           status:$scope.pageData.curStatusItem.id
       };
        getOperLogList(data);
    };

}]);