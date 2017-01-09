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
                $scope.page = $scope.conf.currentPage = isNaN($scope.page) || !$scope.page ? $scope.conf.currentPage : parseInt($scope.page) > $scope.totalPages ? $scope.totalPages : parseInt($scope.page) < 1 ? 1 : parseInt($scope.page);
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
                $scope.conf.upDateInterFace($scope.conf.menuState ? $scope.conf.filter ?{currentPage:$scope.conf.currentPage,pageSize:$scope.conf.pageSize,tagState:$scope.conf.menuState,filterConditions:$scope.conf.filter} : {currentPage:$scope.conf.currentPage,pageSize:$scope.conf.pageSize,tagState:$scope.conf.menuState} : $scope.conf.filter? {currentPage:$scope.conf.currentPage,pageSize:$scope.conf.pageSize,filterConditions:$scope.conf.filter} : {currentPage:$scope.conf.currentPage,pageSize:$scope.conf.pageSize} );
                getPagination();
            };

            //监听conf
            $scope.$watch(function(){
                return $scope.conf;
            }, function (newVal,oldVal) {
                var data = $scope.conf.menuState ? $scope.conf.filter ? {
                    currentPage:$scope.conf.currentPage,
                    pageSize:$scope.conf.pageSize,
                    tagState:$scope.conf.menuState,
                    filterConditions:$scope.conf.filter
                } : {
                    currentPage:$scope.conf.currentPage,
                    pageSize:$scope.conf.pageSize,
                    tagState:$scope.conf.menuState
                } : $scope.conf.filter ?{
                    currentPage:$scope.conf.currentPage,
                    pageSize:$scope.conf.pageSize,
                    filterConditions:$scope.conf.filter
                } : {
                    currentPage:$scope.conf.currentPage,
                    pageSize:$scope.conf.pageSize
                };

                if(newVal.currentPage !== oldVal.currentPage || newVal.menuState !== oldVal.menuState){//当前页或者tab标签变化时发送请求
                    $scope.conf.upDateInterFace(data);
                    getPagination();
                }else if(newVal == oldVal){//加载时的第一次请求
                    $scope.conf.upDateInterFace(data);
                }else if(Math.ceil(newVal.total/newVal.pageSize) != Math.ceil(oldVal.total/oldVal.pageSize)){//总页数发生变化时
                    getPageSize();
                }
            },true);
        }
    }
}]);