/**
 * Created by lenovo on 2016/11/29.
 */
operApp.service("CommonService", ["$q", function ($q) {
    var menuList;
    return {
        getMenuList: function () {
            var deferred = $q.defer();
            menuList = [
                {
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
                            hash: "productPackage"
                        },
                        {
                            name: "技术产品",
                            hash: "techniqueProduct"
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
                            hash: "operationLog"
                        }
                    ]
                }
            ];
            deferred.resolve(menuList);
            return deferred.promise;
        },
        authorityInstance: function () {
            angular.forEach(menuList, function (menu, i) {
                menu.authoritative = true;
                angular.forEach(menu.items, function (subMenu, i) {
                    subMenu.authoritative = true;
                });
            });
            var authorityList = {
                //菜单权限设置
                menu: menuList,
                //功能权限设置
                functions: {}
            };
            return $.extend(true, {}, authorityList);
        }
    };
}]);