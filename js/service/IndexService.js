/**
 * Created by lenovo on 2016/12/27.
 */
operApp.service("IndexService", ["ms", function (ms) {
    function getTotalOverviewData(){
        return ms("Index.getTotalOverviewData");
    }
    function getYesterdayData(){
        return ms("Index.getYesterdayData");
    }
    return {
        getTotalOverviewData: getTotalOverviewData,
        getYesterdayData: getYesterdayData
    };
}]);