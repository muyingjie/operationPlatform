/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("AddAcountController", ["$scope", "RoleService", "ToolService", "$state", function ($scope, RoleService, ToolService, $state) {
    $scope.account = {
        username: "",
        password: "",
        passwordagain: "",
        name: "",
        role: null,
        status: 1
    };
    RoleService.getRoleList().then(function (data) {
        data.unshift({
            roleName: "请选择",
            id: "-1"
        });
        $scope.roleList = data;
        $scope.account.role = $scope.roleList[0];
    });
    $scope.validateList = {
        "username": {
            name: "用户名",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "用户名不能为空"},
                {attr: "_pass", tip: ""}
            ]
        },
        "password":{
            name: "密码",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "_pass", tip: ""}
            ]
        },
        "passwordagain":{
            name: "确认密码",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "passwordSame", tip: "两次密码输入不一致"},
                {attr: "_pass", tip: ""}
            ]
        },
        "name":{
            name: "姓名",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "姓名不能为空"},
                {attr: "_pass", tip: ""}
            ]
        },
        "role":{
            name: "角色",
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "roleDefined", tip: "角色不能为空"},
                {attr: "_pass", tip: ""}
            ]
        }
    };

    $scope.passwordIsSame = function () {
        $scope.validateList.passwordagain.promptAttr = "passwordSame";
        return $scope.account.password == $scope.account.passwordagain;
    };

    $scope.roleIsDefined = function () {
        $scope.validateList.role.promptAttr = "roleDefined";
        return $scope.account.role.id != -1;
    };

    $scope.save = function () {
        var isResPass = true;
        angular.forEach($scope.validateList, function (o, attr) {
            if(o.promptAttr != "_pass"){
                $scope.inputBlurFn(
                    o,
                    $scope.accountForm[attr] ? $scope.accountForm[attr].$error : undefined,
                    (attr == "passwordagain") ? $scope.passwordIsSame : (attr == "role") ? $scope.roleIsDefined : undefined);
                isResPass = false;
                return false;
            }
        });
        console.log(isResPass);
        var transportData;
        if(isResPass){
            accountData = {
                username: $scope.account.username,
                password: $scope.account.password,
                name: $scope.account.name,
                roleId: $scope.account.role.id
            };
            RoleService.addAccount(accountData).then(function (data) {
                alert("保存成功");
                $state.go("roleOperating");
            });
        }
    };
}]);