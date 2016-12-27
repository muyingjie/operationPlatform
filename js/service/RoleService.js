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
    function addAccount(accountData){
        return ms("Role.addAccount", accountData);
    }
    function getAccountList(filter){
        return ms("Role.getAccountList", filter);
    }
    function editAccount(accountData){
        return ms("Role.editAccount", accountData);
    }
    function changeAccountStatus(accountId){
        return ms("Role.changeAccountStatus", accountId);
    }
    function changeAccountPassword(data){
        return ms("Role.changeAccountPassword", data);
    }
    return {
        getRoleList: getRoleList,
        addRole: addRole,
        getRoleInfo: getRoleInfo,
        setRoleAuthority: setRoleAuthority,
        addAccount: addAccount,
        getAccountList: getAccountList,
        editAccount: editAccount,
        changeAccountStatus: changeAccountStatus,
        changeAccountPassword: changeAccountPassword
    };
}]);