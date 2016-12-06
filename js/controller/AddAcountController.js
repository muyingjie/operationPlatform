/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("AddAcountController", ["$scope", "RoleService", "ToolService", function ($scope, RoleService, ToolService) {
    $scope.account = {
        username: "",
        password: "",
        passwordagain: "",
        name: "",
        role: null,
        status: 1
    };
    RoleService.getRoleList().then(function (data) {
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
                {attr: "pass", tip: "√"}
            ]
        },
        "password":{
            name: "密码",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "pass", tip: "√"}
            ]
        },
        "passwordagain":{
            name: "确认密码",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "passwordSame", tip: "两次密码输入不一致"},
                {attr: "pass", tip: "√"}
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
                {attr: "pass", tip: "√"}
            ]
        }
    };

    $scope.passwordIsSame = function () {
        $scope.validateList.passwordagain.promptAttr = "passwordSame";
        return $scope.account.password == $scope.account.passwordagain;
    };

    $scope.save = function () {

    };
}]);