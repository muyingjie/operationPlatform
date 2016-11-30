/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("AddAcountController", ["$scope", "RoleService", function ($scope, RoleService) {
    RoleService.getRoleList().then(function (data) {
        $scope.roleList = data;
    });
}]);