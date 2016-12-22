/**
 * Created by lenovo on 2016/12/21.
 */
operApp.service("orderService",["ms", function (ms) {
    function getOrderList(orderType){
        return ms("Order.getOrderList",orderType);
    }
    function getOrderDetail(member){
        return ms("Order.getOrderDetail",member);
    }
    return{
        getOrderList:getOrderList,
        getOrderDetail:getOrderDetail
    }
}]);
