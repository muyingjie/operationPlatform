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
    function getRoleInfo(roleId){
        return ms("Role.getRoleInfo", roleId);
    }
    function setRoleAuthority(id, authList){
        return ms("Role.setRoleAuthority", id, authList);
    }
    return {
        getRoleList: getRoleList,
        addRole: addRole,
        getRoleInfo: getRoleInfo,
        setRoleAuthority: setRoleAuthority
    };
}]);