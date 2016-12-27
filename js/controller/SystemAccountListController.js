/**
 * Created by lenovo on 2016/11/29.
 */
operApp.controller("SystemAccountListController", ["$scope", "RoleService", "$q", function ($scope, RoleService, $q) {
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

            getAccountList();
        });
    }
    $scope.filterData = {
        name: "",
        username: ""
    };
    $scope.search = function () {
        var handledFilterData = {
            name: $scope.filterData.name,
            username: $scope.filterData.username,
            status: $scope.pageData.curStatusItem.id
        };
        getAccountList($scope.filterData);
    };
    function getAccountList(filterData){
        filterData = filterData ? filterData : {};
        RoleService.getAccountList(filterData).then(function (d) {
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
            o.oldPassword = "";
            o.newPassword = "";
            o.newPasswordAgain = "";
        });
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

    var passwordVali = {
        oldPassword: {
            name: "旧密码",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "旧密码不能为空"},
                {attr: "_pass", tip: ""}
            ]
        },
        newPassword: {
            name: "新密码",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "新密码不能为空"},
                {attr: "_pass", tip: ""}
            ]
        },
        newPasswordAgain: {
            name: "确认密码",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "新密码不能为空"},
                {attr: "passwordSame", tip: "两次密码输入不一致"},
                {attr: "_pass", tip: ""}
            ]
        }
    };
    function passwordIsSame(account) {
        passwordVali.newPasswordAgain.promptAttr = "passwordSame";
        return account.newPassword == account.newPasswordAgain;
    }

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
        onPopBefore: function ($scope) {
            var def = $q.defer();
            // console.log($scope);
            $scope.extData.oldPassword = "";
            $scope.extData.newPassword = "";
            $scope.extData.newPasswordAgain = "";
            def.resolve();
            return def.promise;
        },
        onConfirmClick: function ($modalScope) {
            var account = $modalScope.extData;
            var isResPass = true;
            //拿不到accountForm对象！！！！！
            angular.forEach(passwordVali, function (o, attr) {
                var $error;
                var inputVal;
                if(o.promptAttr != "_pass"){
                    inputVal = account[attr];
                    angular.forEach(o.validateItems, function (condition, conditionName) {
                        switch(conditionName){
                            case "required":
                                if(condition){
                                    $error = {required: inputVal == ""};
                                }
                                break;
                        }
                    });

                    $scope.inputBlurFn(
                        o,
                        $error ? $error : undefined,
                        (attr == "newPasswordAgain") ? getPasswordIsSameFn(account) : undefined
                    );
                    isResPass = false;
                    return false;
                }
            });
            var transportData = {};
            if(isResPass){
                transportData["username"] = account.orgName;
                transportData["oldPassword"] = account.oldPassword;
                transportData["newPassword"] = account.newPassword;
            }
            RoleService.changeAccountPassword(transportData).then(function () {
                alert("修改成功");
            });
            return isResPass;
        },
        popData: {
            passwordVali: passwordVali,
            getPasswordIsSameFn: getPasswordIsSameFn
        }
    };

    function getPasswordIsSameFn(account){
        return function (){
            return passwordIsSame(account);
        };
    }
}]);