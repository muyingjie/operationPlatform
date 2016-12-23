/**
 * Created by lenovo on 2016/11/28.
 */
operApp.service("ms", ["$q", "LocalStorageService", "CommonService", "ToolService", function ($q, LocalStorageService, CommonService, ToolService) {
    return function (servicePointfnName, data){
        var server = servicePointfnName.split(".");
        var service = server[0];
        var fnName = server[1];
        var res;
        var deferred = $q.defer();
        switch(service){
            case "Role":
                switch (fnName){
                    case "getRoleList":
                        res = LocalStorageService.get("roleList");
                        break;
                    case "addRole":
                        data.id = ToolService.rnd();
                        data.authorityList = CommonService.authorityInstance();
                        data.roleMembers = [];
                        var roleList = LocalStorageService.get("roleList");
                        roleList.data.push(data);
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "getRoleInfo":
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            if(data == o.id){
                                res = {
                                    status: true,
                                    data: o
                                };
                                return false;
                            }
                        });
                        break;
                    case "setRoleAuthority":
                        var roleId = data;
                        var authList = arguments[2];
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            if(roleId == o.id){
                                o.authorityList = authList;
                                return false;
                            }
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "addAccount":
                        var accountInfo = data;
                        data.id = ToolService.rnd();
                        data.status = 1; //默认启用状态
                        data.createTime = ToolService.getTime();
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            if(accountInfo.roleId == o.id){
                                o.roleMembers.push(accountInfo);
                                return false;
                            }
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "getAccountList":
                        var roleList = LocalStorageService.get("roleList");
                        var accountList = [];
                        angular.forEach(roleList.data, function (o, i) {
                            angular.forEach(o.roleMembers, function (o1, i1) {
                                accountList.push(o1);
                            });
                        });
                        res = {
                            status: true,
                            data: accountList
                        };
                        break;
                    case "editAccount":
                        var editData = data;
                        var roleList = LocalStorageService.get("roleList");
                        var accountList = [];
                        angular.forEach(roleList.data, function (o, i) {
                            angular.forEach(o.roleMembers, function (o1, i1) {
                                if(o1.id == editData.id){
                                    o1.roleId = editData.roleId;
                                    o1.name = editData.name;
                                    o1.username = editData.username;
                                }
                            });
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                    case "changeAccountStatus":
                        var accountId = data;
                        var roleList = LocalStorageService.get("roleList");
                        angular.forEach(roleList.data, function (o, i) {
                            angular.forEach(o.roleMembers, function (o1, i1) {
                                if(o1.id == accountId){
                                    o1.status = (o1.status == 1 ? 2 : o1.status == 2 ? 1 : o1.status);
                                }
                            });
                        });
                        res = LocalStorageService.set("roleList", roleList);
                        break;
                }
                break;
            case "Order":
                switch (fnName){
                    case "getOrderList":
                        //console.log(data);
                        res = {
                            status:true,
                            data:[
                                {
                                    member: "13750854360",
                                    memberName: "张三",
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    orderTime: "2016-11-30 16:30:24",
                                    classify: "注册",
                                    commodity: "试用版",
                                    cost:"297.00",
                                    timeLimit:'365天',
                                    effectiveDate:'2016-11-30~2017-11-30',
                                    payStatus:'已支付',
                                    deliveryStatus:'已交付',
                                    protocolState:"执行中",
                                    operation:'详情'
                                },
                                {
                                    member: "13750854360",
                                    memberName: "张三",
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    orderTime: "2016-11-30 16:30:24",
                                    classify: "注册",
                                    commodity: "试用版",
                                    cost:"297.00",
                                    timeLimit:'365天',
                                    effectiveDate:'2016-11-30~2017-11-30',
                                    payStatus:'已支付',
                                    deliveryStatus:'已交付',
                                    protocolState:"执行中",
                                    operation:'详情'
                                },
                                {
                                    member: "13750854360",
                                    memberName: "张三",
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    orderTime: "2016-11-30 16:30:24",
                                    classify: "注册",
                                    commodity: "试用版",
                                    cost:"297.00",
                                    timeLimit:'365天',
                                    effectiveDate:'2016-11-30~2017-11-30',
                                    payStatus:'已支付',
                                    deliveryStatus:'已交付',
                                    protocolState:"执行中",
                                    operation:'详情'
                                },
                                {
                                    member: "13750854360",
                                    memberName: "张三",
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    orderTime: "2016-11-30 16:30:24",
                                    classify: "注册",
                                    commodity: "试用版",
                                    cost:"297.00",
                                    timeLimit:'365天',
                                    effectiveDate:'2016-11-30~2017-11-30',
                                    payStatus:'已支付',
                                    deliveryStatus:'已交付',
                                    protocolState:"执行中",
                                    operation:'详情'
                                }
                            ]
                        };
                        break;
                    case "getOrderDetail":
                        res = {
                            status:true,
                            data:{
                                orderInfor:{
                                    orderNumber: "111110010050",
                                    memberName: "张三",
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    orderTime: "2016-11-30 16:30:24",
                                    classify: "域名",
                                    commodity: "试用版",
                                    cost:"297.00",
                                    timeLimit:'365天',
                                    effectiveDate:'2016-11-30~2017-11-30',
                                    payStatus:'未支付',
                                    deliveryStatus:'已交付',
                                    protocolState:"执行中",
                                    operation:'详情'
                                },
                                paymentVoucherInfor:{
                                    paymentWay:'支付宝',
                                    paymentAccount:'laorui@163.com',
                                    paymentAmount:'2980.00',
                                    paymentTime:'2016-11-30 16:30:24',
                                    remarks:'这是备注信息'
                                },
                                memberInfor:{
                                    memberID:'100000008',
                                    cellphone:'12354786951',
                                    name:'张三/果园老农',
                                    email:'laorui@sohu.com',
                                    twoLevelDomainName: "abc123.shopce.cn"
                                },
                                commodityInfor:{
                                    commodityNumber:'box-ccc-001',
                                    term:'3个月',
                                    commodity:'适用版',
                                    effectiveDate:'2016-11-30~2017-11-30',
                                    deliveryStatus:'已交付'
                                },
                                serviceInfor:[
                                    {
                                        workOrderNum:'111110010050',
                                        workOrderClassify:'商城开通',
                                        generationTime:'2016-11-21 17:47',
                                        productID:'xyz12',
                                        commodityName:'B2C',
                                        version:'V1.0',
                                        state:'待执行',
                                        completionTime:'2016-11-21 17:47'
                                    },
                                    {
                                        workOrderNum:'111110010050',
                                        workOrderClassify:'商城开通',
                                        generationTime:'2016-11-21 17:47',
                                        productID:'xyz12',
                                        commodityName:'B2C',
                                        version:'V1.0',
                                        state:'待执行',
                                        completionTime:'2016-11-21 17:47'
                                    },
                                    {
                                        workOrderNum:'111110010050',
                                        workOrderClassify:'商城开通',
                                        generationTime:'2016-11-21 17:47',
                                        productID:'xyz12',
                                        commodityName:'B2C',
                                        version:'V1.0',
                                        state:'待执行',
                                        completionTime:'2016-11-21 17:47'
                                    }
                                ],
                                remarksInfor:[
                                    '2016-11-21 17:47 因商品有问题，商城关闭；',
                                    '2016-11-21 17:47 商城重新开启；',
                                    '2016-11-21 17:47 服务到期，商城关闭；'
                                ]
                            }
                        };
                        break;
                }
                break;
            default:
                res = {
                    status: false,
                    data: {
                        msg: "没有找到对应模块"
                    }
                };
        }
        if(res.status){
            deferred.resolve(res.data);
        }else{
            console.error(res.data.msg);
            deferred.reject(res);
        }
        return deferred.promise;
    };
}]);