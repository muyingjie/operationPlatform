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
                    id:"3",
                    txt:"50"
                }
            ];
            $scope.pageData = $scope.pagesStatusList[0];

            //计算有多少页
            function calculationPages(){
                $scope.totalPages = Math.ceil($scope.conf.total/$scope.conf.pageSize);
                //默认当前页处于非法值时的处理
                $scope.conf.currentPage = $scope.conf.currentPage < 1 ? 1 : $scope.conf.currentPage > $scope.totalPages ? $scope.totalPages : $scope.conf.currentPage;
            }
            calculationPages();

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

            //页码显示
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
            getPagination();

            //每页显示多少条
            $scope.getPageSize = function () {
                $scope.conf.pageSize = parseInt($scope.pageData.txt);
                calculationPages();
                getPagination();
                console.log($scope.conf.currentPage + ","+ $scope.conf.pageSize)
            };
            $scope.$watch(function(){
                return $scope.conf.currentPage;
            }, function (newVal,oldVal) {
                if(newVal !== oldVal){
                    getPagination();
                    //alert(newVal)
                }
            },true)
        }
    }
}]);