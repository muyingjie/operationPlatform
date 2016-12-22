/**
 * Created by lenovo on 2016/11/28.
 */
operApp.service("ms", ["$q", "LocalStorageService", "CommonService", "ToolService", function ($q, LocalStorageService, CommonService, ToolService) {
    return function (servicePointfnName, data){
        var server = servicePointfnName.split(".");
        var service = server[0];
        var fnName = server[1];
        var res;
        var deferred = $q.defer();
        switch(service){
            case "Role":
                switch (fnName){
                    case "getRoleList":
                        res = LocalStorageService.get("roleList");
                        break;
                    case "addRole":
                        data.id = ToolService.rnd();
                        data.authorityList = CommonService.authorityInstance();
                        data.roleMembers = [];
                        var roleList = LocalStorageService.get("roleList");
                        roleList.data.push(data);
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "getRoleInfo":
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            if(data == o.id){
                                res = {
                                    status: true,
                                    data: o
                                };
                                return false;
                            }
                        });
                        break;
                    case "setRoleAuthority":
                        var roleId = data;
                        var authList = arguments[2];
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            if(roleId == o.id){
                                o.authorityList = authList;
                                return false;
                            }
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "addAccount":
                        var accountInfo = data;
                        data.id = ToolService.rnd();
                        data.status = 1; //默认启用状态
                        data.createTime = ToolService.getTime();
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            if(accountInfo.roleId == o.id){
                                o.roleMembers.push(accountInfo);
                                return false;
                            }
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "getAccountList":
                        var roleList = LocalStorageService.get("roleList");
                        var accountList = [];
                        angular.forEach(roleList.data, function (o, i) {
                            angular.forEach(o.roleMembers, function (o1, i1) {
                                accountList.push(o1);
                            });
                        });
                        res = {
                            status: true,
                            data: accountList
                        };
                        break;
                    case "editAccount":
                        var editData = data;
                        var roleList = LocalStorageService.get("roleList");
                        var accountList = [];
                        angular.forEach(roleList.data, function (o, i) {
                            angular.forEach(o.roleMembers, function (o1, i1) {
                                if(o1.id == editData.id){
                                    o1.roleId = editData.roleId;
                                    o1.name = editData.name;
                                    o1.username = editData.username;
                                }
                            });
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "changeAccountStatus":
                        var accountId = data;
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            angular.forEach(o.roleMembers, function (o1, i1) {
                                if(o1.id == accountId){
                                    o1.status = (o1.status == 1 ? 2 : o1.status == 2 ? 1 : o1.status);
                                }
                            });
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                }
                break;
            default:
                res = {
                    status: false,
                    data: {
                        msg: "没有找到对应模块"
                    }
                };
        }
        if(res.status){
            deferred.resolve(res.data);
        }else{
            console.error(res.data.msg);
            deferred.reject(res);
        }
        return deferred.promise;
    };
}]);