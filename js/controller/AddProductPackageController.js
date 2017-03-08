/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("AddProductPackageController",["$scope", "$state","$stateParams","productService",function ($scope,$state,$stateParams,productService) {
    //console.log($stateParams.productPackageNum);
    function getProductPackage(option){
        productService.productPackage(option).then(function (data) {
            $scope.productConfiguration = data;
            $scope.pageDate = $scope.statusList[data.priceRule];
        })
    }
    getProductPackage($stateParams.productPackageNum);
    $scope.statusList = [
        {
            id:"0",
            txt:"元/月"
        },
        {
            id:"1",
            txt:"元/套"
        }
    ];

    $scope.configuration = {};
    $scope.productPackage ={};
    $scope.save = function () {
        function getCheckedId(ary){
            var newAry = [];
            angular.forEach(ary, function (data, index) {
                if(data.isChecked){
                    newAry.push(data.id)
                }
            });
            return newAry;
        }

        var data = {
            applicationMall:$scope.configuration.applicationMall,
            docker:$scope.configuration.docker,
            storage:$scope.configuration.storage,
            bandwidth:$scope.configuration.bandwidth,
            messages:$scope.configuration.messages,
            emails:$scope.configuration.emails,
            template:getCheckedId($scope.productConfiguration.template),
            application:getCheckedId($scope.productConfiguration.application),
            productPackageName:$scope.productPackage.name,
            price:$scope.productPackage.price,
            priceRule:$scope.pageDate.id,
            priority:$scope.productPackage.priority,
            remarks:$scope.productPackage.remarks
        };
        productService.saveProductPackage(data).then(function (data) {
            $state.go("productPackage")
        })
    };

    $scope.cancel = function () {
        $state.go("productPackage")
    }
}]);
