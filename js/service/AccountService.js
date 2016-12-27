/**
 * Created by lenovo on 2016/12/27.
 */
operApp.service("AccountService", ["ms", function (ms) {
    function addAccount(accountData){
        return ms("Account.addAccount", accountData);
    }
    function getAccountList(filter){
        return ms("Account.getAccountList", filter);
    }
    function editAccount(accountData){
        return ms("Account.editAccount", accountData);
    }
    function changeAccountStatus(accountId){
        return ms("Account.changeAccountStatus", accountId);
    }
    function changeAccountPassword(data){
        return ms("Account.changeAccountPassword", data);
    }
    return {
        addAccount: addAccount,
        getAccountList: getAccountList,
        editAccount: editAccount,
        changeAccountStatus: changeAccountStatus,
        changeAccountPassword: changeAccountPassword
    };
}]);