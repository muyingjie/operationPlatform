/**
 * Created by lenovo on 2016/11/29.
 */
operApp.service("CommonService", ["$q", "ms", function ($q, ms) {
    var menuList;
    return {
        getMenuList: function () {
            return ms("Common.getMenuList");
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