/**
 * Created by lenovo on 2017/1/17.
 */
operApp.controller("MemberListController", ["$scope", function ($scope) {
    $scope.orderByList = [
        {
            txt: "按注册时间升序",
            id: 1
        },
        {
            txt: "按注册时间降序",
            id: 2
        }
    ];

    $scope.pageData = {
        orderBy: $scope.orderByList[0]
    };
}]);