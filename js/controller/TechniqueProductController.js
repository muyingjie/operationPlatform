/**
 * Created by lenovo on 2016/12/9.
 */
operApp.controller("TechniqueProductController",["$scope","productService",function ($scope,productService) {
    function getBasicsTechniqueProduct(option){
        productService.basicsTechniqueProduct(option).then(function (data) {
            $scope.basiProductDate = data.dataList;
            $scope.paginationConf.total = data.total;
        })
    }
    function getMeteringTechniqueProduct(option){
        productService.meteringTechniqueProduct(option).then(function (data) {
            $scope.metringProductDate = data;
        })
    }
    $scope.tabMenus = [
        {menuName:'基础产品'},
        {menuName:'计量产品'}
    ];
    $scope.selectedTab = 0;
    $scope.selectedMenu = function (row) {
        switch (row){
            case 1:
                getMeteringTechniqueProduct();
                break;
        }
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
    $scope.pageData = {
        classify:$scope.statusList[0]
    };
    $scope.showProductList = true;
    //分页
    var filterConditions;
    $scope.paginationConf = {
        currentPage: 1,
        //total:189,
        pageSize:20,
        pagesLength: 5,
        filter:filterConditions,
        upDateInterFace: function (data) {
            console.log(data);
            getBasicsTechniqueProduct(data);
        }
    };

    //搜索
    $scope.technique = {}
    $scope.search = function(){
        console.log($scope.pageData);
        filterConditions = {
            classify:$scope.pageData.classify.id,
            Identification:$scope.technique.Identification,
            productName:$scope.technique.productName
        };
        $scope.paginationConf = {
            currentPage: 1,
            //total:189,
            pageSize:20,
            pagesLength: 5,
            filter:filterConditions,
            upDateInterFace: function (data) {
                console.log(data);
                getBasicsTechniqueProduct(data);
            }
        };
    };
    //上下架操作
    $scope.params = {
        popTitle: "操作提示",
        popBodyTpl: "确认要上架吗？",
        onConfirmClick: function () {
            alert("确定时触发");
        }
    };
}]);
