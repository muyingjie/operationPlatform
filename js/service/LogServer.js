operApp.service("LogService", ["ms", function (ms) {
    //���ݳ�ʼ����ʱ��͵����ѯ��ʱ�򣬵���ͬһ��������
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
