/**
 * Created by lenovo on 2016/11/28.
 */
operApp.service("RoleService", ["ms", function (ms) {
    function getRoleList(){
        return ms("Role.getRoleList", {});
    }
    function addRole(data){
        return ms("Role.addRole", data);
    }
    return {
        getRoleList: getRoleList,
        addRole: addRole
    };
}]);