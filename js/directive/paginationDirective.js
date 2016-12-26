/**
 * Created by lenovo on 2016/12/15.
 */
operApp.directive("myPagination",[function () {
    return{
        scope:{
            conf: "="
        },
        restrict:"E",
        templateUrl:"paginationTpl.html",
        replace:false,
        link: function ($scope) {
            //监听总数据条数
            $scope.$watch(function () {
                return $scope.conf.total;
            }, function (newVal,oldVal) {
                if(newVal != oldVal){
                    getPageSize();
                }
            },true);
            //每页显示多少条的数据
            $scope.pagesStatusList = [
                {
                    id:"0",
                    txt:'20'
                },
                {
                    id:'1',
                    txt:"40"
                },
                {
                    id:"2",
                    txt:"60"
                }
            ];
            //每页显示多少条
            getPageSize();
            function getPageSize(){
                function getIndex(){
                    var j;
                    angular.forEach($scope.pagesStatusList, function (o,i) {
                        if(o.txt == $scope.conf.pageSize){
                            j = i;
                        }
                    });
                    return j;
                }

                $scope.pageData = $scope.pagesStatusList[getIndex()];
                calculationPages();
            }


            //计算有多少页
            function calculationPages(){
                $scope.totalPages = Math.ceil($scope.conf.total/$scope.conf.pageSize);
                //默认当前页处于非法值时的处理
                $scope.conf.currentPage = $scope.conf.currentPage < 1 ? 1 : $scope.conf.currentPage > $scope.totalPages ? $scope.totalPages : $scope.conf.currentPage;
                getPagination();
            }


            //点击某一页
            $scope.changeCurrentPage = function (item) {
                $scope.conf.currentPage = item;
            };
            //跳转到某一页;
            $scope.goPage = function () {
                $scope.page = $scope.conf.currentPage = parseInt($scope.page) > $scope.totalPages ? $scope.totalPages : parseInt($scope.page) < 1 ? 1 : parseInt($scope.page);
            };
            //上一页
            $scope.prevPage = function () {
                if($scope.conf.currentPage > 1){
                    $scope.conf.currentPage -= 1;
                }
            };
            //下一页
            $scope.nextPage = function () {
                if($scope.conf.currentPage < $scope.totalPages){
                    $scope.conf.currentPage += 1;
                }
            };

            //页码显示规则
            function getPagination(){
                var prevVal = parseInt($scope.conf.pagesLength/2) + 1;
                var nextVal = $scope.conf.pagesLength - prevVal;
                var pageLen = $scope.totalPages < $scope.conf.pagesLength ? $scope.totalPages : $scope.conf.pagesLength;
                var startPage = $scope.totalPages < $scope.conf.pagesLength ? 0 : $scope.conf.currentPage < prevVal ? 0 : $scope.conf.currentPage < $scope.totalPages - nextVal ? $scope.conf.currentPage - prevVal : $scope.totalPages - $scope.conf.pagesLength;
                $scope.pageList = [];
                for(var i = 1;i <= pageLen;i++){
                    startPage++;
                    $scope.pageList.push(startPage);
                }
            }

            //每页显示多少条
            $scope.getPageSize = function () {
                $scope.conf.pageSize = parseInt($scope.pageData.txt);
                calculationPages();
                $scope.conf.upDateInterFace({currentPage:$scope.conf.currentPage,pageSize:$scope.conf.pageSize});
                getPagination();
                console.log($scope.conf.currentPage + ","+ $scope.conf.pageSize)
            };

            //监听当前页
            $scope.$watch(function(){
                return $scope.conf.currentPage;
            }, function (newVal,oldVal) {
                //if(newVal !== oldVal){
                    $scope.conf.upDateInterFace({currentPage:newVal,pageSize:$scope.conf.pageSize});
                    getPagination();
                    //alert(newVal)
                //}
            },true);
        }
    }
}]);