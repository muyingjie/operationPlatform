/**
 * Created by lenovo on 2016/11/29.
 */
operApp.service("CommonService", [function () {
    return {
        rnd: function() {
            return Math.random().toString().substring(2);
        }
    };
}]);