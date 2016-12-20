/**
 * Created by lenovo on 2016/12/9.
 */
operApp.controller("TechniqueProductController",["$scope", function ($scope) {
    $scope.tabMenus = [
        {menuName:'基础产品'},
        {menuName:'计量产品'}
    ];
    $scope.selectedTab = 0;
    $scope.selectedMenu = function (row) {
        $scope.selectedTab = row;
        $scope.showProductList = $scope.tabMenus[row].menuName === "基础产品" ? true : false;
    };

    $scope.statusList = [
        {
            id:"0",
            txt:"分类"
        },
        {
            id:"1",
            txt:"商城"
        },
        {
            id:"2",
            txt:"模板"
        },
        {
            id:"3",
            txt:"应用"
        }
    ];
    $scope.pageData = $scope.statusList[0];

    $scope.showProductList = true;

    $scope.basiProductDate = [
        {
            Identification:"xyz123",
            classify:"商城",
            name:"PC-B2C",
            version:"v1.0",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        },
        {
            Identification:"xyz123",
            classify:"商城",
            name:"PC-B2C",
            version:"v1.0",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        },
        {
            Identification:"xyz123",
            classify:"商城",
            name:"PC-B2C",
            version:"v1.0",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        },
        {
            Identification:"xyz123",
            classify:"商城",
            name:"PC-B2C",
            version:"v1.0",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        }
    ];
    $scope.metringProductDate = [
        {
            Identification:"xyz123",
            classify:"商城",
            name:"20G空间",
            numVal:"20G",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        },
        {
            Identification:"xyz123",
            classify:"商城",
            name:"20G空间",
            numVal:"20G",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        },
        {
            Identification:"xyz123",
            classify:"商城",
            name:"20G空间",
            numVal:"20G",
            releaseTime:"2016-11-11 12:34",
            state:"已通过",
            handle:"上架"
        }
    ]

    //上下架操作
    $scope.params = {
        popTitle: "操作提示",
        popBodyTpl: "确认要上架吗？",
        onConfirmClick: function () {
            alert("确定时触发");
        }
    };
}]);
