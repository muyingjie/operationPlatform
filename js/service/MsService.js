/**
 * Created by lenovo on 2016/11/28.
 */
operApp.service("ms", ["$q", "LocalStorageService", function ($q, LocalStorageService) {
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
                        // res = [
                        //     {
                        //         id: "id",
                        //         roleName: "系统管理员",
                        //         roleMembers: [
                        //             {
                        //                 id: "1",
                        //                 name: "刘爽",
                        //                 username: "admin"
                        //             },
                        //             {
                        //                 id: "2",
                        //                 name: "范宗洞",
                        //                 username: "adminstrator"
                        //             }
                        //         ]
                        //     },
                        //     {
                        //         id: "id",
                        //         roleName: "系统管理员",
                        //         roleMembers: [
                        //             {
                        //                 id: "1",
                        //                 name: "刘爽",
                        //                 username: "admin"
                        //             },
                        //             {
                        //                 id: "2",
                        //                 name: "范宗洞",
                        //                 username: "adminstrator"
                        //             }
                        //         ]
                        //     }
                        // ];
                        res = LocalStorageService.get("roleList");
                        break;
                    case "addRole":
                        res = LocalStorageService.set("roleList", data);
                        break;
                }
                break;
            default:
                res = {
                    status: false,
                    msg: "没有找到对应模块"
                };
        }
        if(res.status){
            deferred.resolve(res);
        }else{
            console.error(res.msg);
            deferred.reject(res);
        }
        return deferred.promise;
    };
}]);