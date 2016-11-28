/**
 * Created by lenovo on 2016/11/28.
 */
operApp.controller("RoleOperatingController", ["$scope", "RoleService", function ($scope, RoleService) {
    getRoleList();

    function getRoleList(){
        RoleService.getRoleList().then(function (data){
            $scope.roleList = data.data;
        });
    }

    $scope.roleItem = {
        roleName: ""
    };

    $scope.addRole = function () {
        RoleService.addRole($scope.roleItem).then(function (data){
            getRoleList();
            $scope.roleItem.roleName = "";
        });
    };
}]);