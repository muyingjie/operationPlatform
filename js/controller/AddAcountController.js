/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("AddAcountController", ["$scope", "RoleService", function ($scope, RoleService) {
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
    function change(inputItem, err){
        for(var attr in err){
            if(err[attr]==true){
                $scope.validateList[inputItem].promptAttr = attr;
                return false;
            }
        }
        $scope.validateList[inputItem].promptAttr="pass";
        return true;
    }
    $scope.validateList = [
        {
            name: "姓名",
            ele: "input",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "用户名不能为空"},
                {attr: "pass", tip: "√"}
            ],
            change: function (err) {
                change("username", err);
            }
        },
        {
            name: "密码",
            ele: "input",
            eleType: "password",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "pass", tip: "√"}
            ],
            change: function (err) {
                change("password", err);
            }
        },
        {
            name: "确认密码",
            ele: "input",
            eleType: "password",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "pass", tip: "√"}
            ],
            change: function (err) {
                change("passwordagain", err);
            }
        },
        {
            name: "姓名",
            ele: "input",
            eleType: "text",
            validateItems: {
                required: true
            },
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "密码不能为空"},
                {attr: "pass", tip: "√"}
            ],
            change: function (err) {
                change("password", err);
            }
        }
    ];
    $scope.change = change;

    $scope.save = function () {

    };
}]);