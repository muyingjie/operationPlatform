/**
 * Created by lenovo on 2016/11/28.
 */
operApp.controller("RoleOperatingController", ["$scope", "RoleService", "$state", function ($scope, RoleService, $state) {
    //列表渲染
    getRoleList();
    function getRoleList(){
        RoleService.getRoleList().then(function (data){
            $scope.roleList = data.data;
        });
    }

    //表单校验
    function change(inputItem, err){
        for(var attr in err){
            if(err[attr]==true){
                $scope.validate[inputItem].promptAttr = attr;
                return false;
            }
        }
        $scope.validate[inputItem].promptAttr="pass";
        return true;
    }
    $scope.validate = {
        roleName: {
            promptAttr: "default",
            promptList: [
                {attr: "default", tip: ""},
                {attr: "required", tip: "角色名称不能为空"},
                {attr: "pass", tip: "√"}
            ],
            change: function (err) {
                change("roleName", err);
            }
        }
    };
    $scope.change = change;

    //添加角色
    $scope.roleItem = {
        roleName: ""
    };
    $scope.addRole = function () {
        if(change("roleName", $scope.roleForm.roleName.$error)){
            RoleService.addRole($scope.roleItem).then(function (data){
                getRoleList();
                $scope.roleItem.roleName = "";
                $scope.validate.roleName.promptAttr = "default";
            });
        }
    };

    //跳转权限页面
    $scope.goToAuthorityManagement = function (roleId) {
        $state.go("authorityManagement", {roleId: roleId});
    };
}]);