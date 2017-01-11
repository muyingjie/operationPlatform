operApp.service("LogService", ["ms", function (ms) {
    //数据初始化的时候和点击查询的时候，调用同一个方法。
    function getLogList(data){
        return ms("Log.getLogList", data);
    };
    function getOperLogList(data){
        return ms("Log.getOperLogList",data);
    }
    return {
        getLogList: getLogList,
        getOperLogList:getOperLogList
    }
}]);
