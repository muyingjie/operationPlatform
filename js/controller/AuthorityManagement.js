/**
 * Created by lenovo on 2016/11/30.
 */
operApp.controller("AuthorityManagement", ["$scope", "$state", "$stateParams", "RoleService", function ($scope, $state, $stateParams, RoleService) {
    RoleService.getRoleInfo($stateParams.roleId).then(function (data) {
        $scope.roleInfo = data;
    });

    $scope.authClick = function (auth, subAuth) {
        var isAllChecked = true;
        var isAllCanceled = true;
        if(subAuth){
            //子权限
            subAuth.authoritative = !subAuth.authoritative;
            angular.forEach(auth.items, function (o, i) {
                if(!o.authoritative){
                    isAllChecked = false;
                }else{
                    isAllCanceled = false;
                }
            });
            if(isAllChecked){
                auth.authoritative = true;
            }
            if(isAllCanceled){
                auth.authoritative = false;
            }
        }else{
            auth.authoritative = !auth.authoritative;
            if(auth.authoritative){
                angular.forEach(auth.items, function (o, i) {
                    o.authoritative = true;
                });
            }else{
                angular.forEach(auth.items, function (o, i) {
                    o.authoritative = false;
                });
            }
        }
    };

    $scope.oper = function (operName) {
        switch(operName){
            case "save":
                RoleService.setRoleAuthority(roleInfo.id, roleInfo.authorityList);
                break;
            case "return":
                break;
            default:
                console.error("未知操作类型");
        }
        $state.go("roleOperating");
    }
}]);