operApp.service("LogService", ["ms", function (ms) {
    //���ݳ�ʼ����ʱ��͵����ѯ��ʱ�򣬵���ͬһ��������
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
