/**
 * Created by lenovo on 2016/12/7.
 */
operApp.controller("CreateSandBoxOrderController",["$scope","$state" ,function ($scope,$state) {
    $scope.members = [
        {
            memberID:"123456789",
            cellphone:'12354786951',
            email:'laorui@sohu.com',
            twoLevelDomainName: "abc123.shopce.cn",
            memberClassify:'合作商'
        },
        {
            memberID:"123456789",
            cellphone:'12354786951',
            email:'laorui@sohu.com',
            twoLevelDomainName: "abc123.shopce.cn",
            memberClassify:'合作商'
        },
        {
            memberID:"123456789",
            cellphone:'12354786951',
            email:'laorui@sohu.com',
            twoLevelDomainName: "abc123.shopce.cn",
            memberClassify:'合作商'
        },
        {
            memberID:"123456789",
            cellphone:'12354786951',
            email:'laorui@sohu.com',
            twoLevelDomainName: "abc123.shopce.cn",
            memberClassify:'合作商'
        }
    ]

    $scope.checkedMember = $scope.members ? true : false;
    
    $scope.getOrder = function () {

    };

    $scope.statusList = {
        versionList:[
            {
                id:"0",
                txt:"请选择版本"
            },
            {
                id:"1",
                txt:"基础版"
            },
            {
                id:"2",
                txt:"专业版"
            }
        ],
        domainSuffixList:[
            {
                id:"0",
                txt:"域后缀"
            },
            {
                id:"1",
                txt:"shopcevip.cn"
            },
            {
                id:"2",
                txt:"shopce.cn"
            }
        ]
    };
    $scope.pageDate = {
        curVersionStatusItem:$scope.statusList.versionList[0],
        curDomainSuffixStatusItem:$scope.statusList.domainSuffixList[0]
    };

    //时间选择
    $scope.dateData = {
        dt: new Date(),
        opened: false,
        format: "yyyy-MM-dd",
        language:'cn',
        dateOptions: {
            startingDay: 0
        },
        mixDate: null,
        maxDate: null,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.dateData.opened = true;
        },
        closeTxt: "关闭"
    };

    $scope.submitSandBoxOrder = function () {
        $state.go("orderList")
    }
}]);
