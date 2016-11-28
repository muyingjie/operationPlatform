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
                    msg: "本地读取数据失败"
                };
            }
            return res;
        },
        set: function (key, val) {
            var res;
            try{
                var list = JSON.parse(localStorage[key]).data;
                list.push(val);
                localStorage[key] = JSON.stringify({
                    status: true,
                    data: list
                });
                res = {
                    status: true,
                    msg: "操作成功"
                };
            }catch(e){
                res = {
                    status: false,
                    msg: "本地存储数据失败"
                };
            }
            return res;
        }
    };
}]);