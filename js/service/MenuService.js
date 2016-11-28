/**
 * Created by yj on 2016/11/6.
 */
operApp.service("MenuService", ["$q", function($q){
    function getMenuList(){
        var deferred = $q.defer();
        var menuData = [{
            name: "系统管理",
            items: [
                {
                    name: "角色管理",
                    hash: "roleOperating"
                },{
                    name: "添加账号",
                    hash: "addAccount"
                }, {
                    name: "系统账号",
                    hash: "systemAccountList"
                }
            ]
        }, {
            name: "订单管理",
            items: [
                {
                    name: "订单列表",
                    hash: "orderList"
                },
                {
                    name: "生成沙箱订单",
                    hash: "createSandBoxOrder"
                }
            ]
        }, {
            name: "产品管理",
            items: [
                {
                    name: "产品套餐",
                    hash: "memberList"
                },
                {
                    name: "技术产品",
                    hash: "memberGrade"
                }
            ]
        }, {
            name: "日志管理",
            items: [
                {
                    name: "登录日志",
                    hash: "loginLog"
                },
                {
                    name: "操作日志",
                    hash: "operatingLog"
                }
            ]
        }];
        deferred.resolve(menuData);
        return deferred.promise;
    }

    return {
        getMenuList: getMenuList
    }
}]);