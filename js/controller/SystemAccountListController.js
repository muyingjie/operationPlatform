/**
 * Created by lenovo on 2016/11/29.
 */
operApp.controller("SystemAccountListController", ["$scope", function ($scope) {
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
    $scope.roleList = [
        {
            id: 1,
            name: "系统管理员"
        },
        {
            id: 2,
            name: "总经理SEO"
        },
        {
            id: 3,
            name: "市场经理"
        }
    ];
    renderSystemAccountList();
    function renderSystemAccountList(){
        $scope.accountList = [
            {
                id: "1",
                username: "admin",
                name: "Admin",
                roleId: 1,
                createTime: 1480403979522,
                status: 1
            }
        ];
        extendAccountList();
    }
    function extendAccountList() {
        angular.forEach($scope.accountList, function (o, i) {
            angular.forEach($scope.roleList, function (o1, i1) {
                if(o.roleId == o1.id){
                    o.roleTxt = o1.name;
                }
            });
            o.statusTxt = (o.status == 1) ? "已启用" : (o.status == 2) ? "已停用" : "异常状态";
            o.isEdit = false;
        });
    }

    $scope.oper = function (oper, account) {
        var editStatus = false;
        switch(oper){
            case "save":
                editStatus = false;
                break;
            case "cancel":
                editStatus = false;
                break;
            case "edit":
                editStatus = true;
                break;
            case "enable":
                account.status = 1;
                extendAccountList();
                break;
            case "disable":
                account.status = 2;
                extendAccountList();
                break;
            default:
                console.error("未知的操作类型");
        }
        account.isEdit = editStatus;
    };

    $scope.changeRoleStatus = function () {
        console.log($scope.pageData.curStatusItem);
    };
}]);