operApp.service("LogService", ["ms", function (ms) {
    //数据初始化的时候和点击查询的时候，调用同一个方法。
    function getLogList(){
        return ms("Log.getLogList", {
        });
    };
    function getOperLogList(){
        return ms("Log.getOperLogList", {
        });
    }
    return {
        getLogList: getLogList,
        getOperLogList:getOperLogList

    }
}]);
