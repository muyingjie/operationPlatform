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
                        var roleList = LocalStorageService.get("roleList");var roleList = LocalStorageService.get("roleList");
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
                }
                break;
            case "Account":
                switch (fnName){
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
                    case "changeAccountPassword":
                        var transportData = data;
                        break;
                }
                break;
            case "Order":
                switch (fnName){
                    case "getOrderList":
                        console.log(data);
                        res = {
                            status:true,
                            data:{
                                dataList:[
                                    {
                                        memberID:10001,
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
                                        memberID:10002,
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
                                        memberID:10003,
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
                                        memberID:10004,
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
                                ],
                                total:354
                            }
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
                                    classify: "注册",
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
                    case "getSandBoxOrder":
                        console.log(data)
                        res = {
                            status:true,
                            data:[
                                {
                                    memberID:"123456789",
                                    cellphone:'35654786951',
                                    email:'laorui@sohu.com',
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    memberClassify:'合作商'
                                },
                                {
                                    memberID:"953456789",
                                    cellphone:'54754786951',
                                    email:'laorui@sohu.com',
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    memberClassify:'合作商'
                                },
                                {
                                    memberID:"587456",
                                    cellphone:'15487521456',
                                    email:'laorui@sohu.com',
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    memberClassify:'合作商'
                                },
                                {
                                    memberID:"9542334",
                                    cellphone:'15478565442',
                                    email:'laorui@sohu.com',
                                    twoLevelDomainName: "abc123.shopce.cn",
                                    memberClassify:'合作商'
                                }
                            ]
                        };
                        break;
                    case "submitSandBoxOrder":
                        res = {
                            status:true
                        };
                        break;
                }
                break;
            case "Product":
                switch (fnName){
                    case "getProductPackage":
                        console.log(data)
                        res = {
                            status:true,
                            data:[
                                {
                                    productPackageNum:"box-ccc-001",
                                    productPackageName:"基础版",
                                    price:"198",
                                    priority:"0",
                                    remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                    releaseTime:"2016-10-11",
                                    state:"待出售",
                                    sold:"55345"
                                },
                                {
                                    productPackageNum:"box-ccc-001",
                                    productPackageName:"基础版",
                                    price:"198",
                                    priority:"0",
                                    remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                    releaseTime:"2016-10-11",
                                    state:"待出售",
                                    sold:"55345"
                                },
                                {
                                    productPackageNum:"box-ccc-001",
                                    productPackageName:"基础版",
                                    price:"198",
                                    priority:"0",
                                    remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                    releaseTime:"2016-10-11",
                                    state:"待出售",
                                    sold:"55345"
                                },
                                {
                                    productPackageNum:"box-ccc-001",
                                    productPackageName:"基础版",
                                    price:"198",
                                    priority:"0",
                                    remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                    releaseTime:"2016-10-11",
                                    state:"待出售",
                                    sold:"55345"
                                },
                                {
                                    productPackageNum:"box-ccc-001",
                                    productPackageName:"基础版",
                                    price:"198",
                                    priority:"0",
                                    remarks:"基础版，298元/月，1年2980块，买10个月，送2个月",
                                    releaseTime:"2016-10-11",
                                    state:"待出售",
                                    sold:"55345"
                                }
                            ]
                        }
                }
            case "Log":
                switch (fnName){
                    case "getLogList":
                        res = {
                            status: true,
                            data: [
                                {
                                    id: "1",
                                    account: "admin",
                                    name: "管理员",
                                    createTime: 1480403979578,
                                    ip: "111.145.214.175",
                                    result:"成功",
                                },
                                {
                                    id: "2",
                                    account: "abc123",
                                    name: "李钦",
                                    createTime: 1480403979534,
                                    ip: "222.145.214.173",
                                    result:"失败",
                                },
                                {
                                    id: "3",
                                    account: "youxian",
                                    name: "小李",
                                    createTime: 1480403971278,
                                    ip: "333.145.214.175",
                                    result:"成功",

                                }
                            ]
                        };
                        break;
                    case "getOperLogList":
                        res = {
                            status: true,
                            data: [
                                {
                                    id: "11113",
                                    createTime: 1480403979578,
                                    name: "管理员",
                                    ip: "111.145.214.175",
                                    classify:"修改菜单",
                                    result:"修改订单[ID:5678 订单状态变更为已支付]"
                                },
                                {
                                    id: "222",
                                    createTime: 1480403975980,
                                    name: "管理员",
                                    ip: "222.145.214.10",
                                    classify:"修改会员密码",
                                    result:" 修改会员密码[ID:5678 会员密码更改为********]",
                                },
                                {
                                    id: "333",
                                    createTime: 1480403945612,
                                    name: "管理员",
                                    ip: "222.145.214.10",
                                    classify:"修改商品价格",
                                    result:"商品的价格暂时定义为1988",

                                }
                            ]
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