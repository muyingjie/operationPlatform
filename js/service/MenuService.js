/**
 * Created by yj on 2016/11/6.
 */
operApp.service("MenuService", ["$q", "CommonService", function($q, CommonService){
    function getMenuList(){
        return CommonService.getMenuList();
    }

    return {
        getMenuList: getMenuList
    }
}]);