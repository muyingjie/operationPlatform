/**
 * Created by lenovo on 2016/11/28.
 */
operApp.run(["LocalStorageService", function (LocalStorageService) {
    var roleList = LocalStorageService.get("roleList");
    if(!roleList.status){
        roleList = {
            status: true,
            data: []
        };
        LocalStorageService.set("roleList", roleList);
    }
}]);