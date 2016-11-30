/**
 * Created by lenovo on 2016/11/28.
 */
operApp.service("LocalStorageService", [function () {
    return {
        get: function (key){
            var res;
            try{
                res = JSON.parse(localStorage[key]);
            }catch(e){
                res = {
                    status: false,
                    data: {
                        msg: "本地读取数据失败"
                    }
                };
            }
            return res;
        },
        set: function (key, val) {
            var res;
            try{
                localStorage[key] = JSON.stringify(val);
                res = {
                    status: true,
                    data: {
                        msg: "操作成功"
                    }
                };
            }catch(e){
                res = {
                    status: false,
                    data: {
                        msg: "本地存储数据失败"
                    }
                };
            }
            return res;
        }
    };
}]);