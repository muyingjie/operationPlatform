/**
 * Created by lenovo on 2016/11/29.
 */
operApp.controller("SystemAccountListController", ["$scope", "RoleService", function ($scope, RoleService) {
    $scope.roleStatusList = [
        {
            id: 0,
            txt: "所有"
        },
        {
            id: 1,
            txt: "已启用"
        },
        {
            id: 2,
            txt: "已禁用"
        }
    ];
    $scope.pageData = {
        curStatusItem: $scope.roleStatusList[0]
    };
    // $scope.roleList = [
    //     {
    //         id: 1,
    //         name: "系统管理员"
    //     },
    //     {
    //         id: 2,
    //         name: "总经理SEO"
    //     },
    //     {
    //         id: 3,
    //         name: "市场经理"
    //     }
    // ];
    renderSystemAccountList();
    function renderSystemAccountList(){
        RoleService.getRoleList().then(function (roleList) {
            console.log(roleList);
            $scope.roleList = roleList;

            RoleService.getAccountList().then(function (d) {
                console.log(d);
                $scope.accountList = d;
                // $scope.accountList = [
                //     {
                //         id: "1",
                //         username: "admin",
                //         name: "Admin",
                //         roleId: 1,
                //         createTime: 1480403979522,
                //         status: 1
                //     }
                // ];
                extendAccountList();
            });
        });
    }
    function extendAccountList() {
        angular.forEach($scope.accountList, function (o, i) {
            angular.forEach($scope.roleList, function (o1, i1) {
                if(o.roleId == o1.id){
                    o.roleTxt = o1.roleName;
                    o.selectedRole = o1;
                    o.orgSelectedRole = o1;
                    o.orgName = o.name;
                    o.orgUsername = o.username;
                }
            });
            o.statusTxt = (o.status == 1) ? "已启用" : (o.status == 2) ? "已停用" : "异常状态";
            o.isEdit = false;
        });console.log($scope.accountList);
    }

    $scope.oper = function (oper, account) {console.log(account);
        var editStatus = false;
        var editData;
        var accountId = account.id;
        switch(oper){
            case "save":
                editData = {
                    id: account.id,
                    roleId: account.selectedRole.id,
                    name: account.name,
                    username: account.username
                };
                RoleService.editAccount(editData).then(function (d) {
                    alert("修改成功");
                });
                editStatus = false;
                break;
            case "cancel":
                account.name = account.orgName;
                account.username = account.orgUsername;
                account.selectedRole = account.orgSelectedRole;
                editStatus = false;
                break;
            case "edit":
                editStatus = true;
                break;
            case "enable":
                RoleService.changeAccountStatus(accountId).then(function (d) {
                   alert("修改成功");
                    account.status = 1;
                    extendAccountList();
                });
                break;
            case "disable":
                RoleService.changeAccountStatus(accountId).then(function (d) {
                   alert("修改成功");
                    account.status = 2;
                    extendAccountList();
                });
                break;
            default:
                console.error("未知的操作类型");
        }
        account.isEdit = editStatus;
    };

    $scope.changeRoleStatus = function () {
        console.log($scope.pageData.curStatusItem);
    };

    $scope.params = {
        btn: {
            txt: "修改密码",
            ele: "a",
            classes: {
                "btn btn-secondary btn-sm btn-icon icon-left": true
            }
        },
        popSize: "md",
        popTitle: "操作提示",
        // popBodyTpl: "确认要上架吗？",
        popBodyTplUrl: "changePassword.html",
        onConfirmClick: function () {
            alert("确定时触发");
        }
    };
}]);