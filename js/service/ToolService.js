/**
 * Created by lenovo on 2016/11/30.
 */
operApp.service("ToolService", [function () {
    return {
        rnd: function() {
            return Math.random().toString().substring(2);
        }
    };
}]);