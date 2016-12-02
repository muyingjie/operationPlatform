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