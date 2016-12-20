/**
 * Created by lenovo on 2016/12/8.
 */
operApp.directive("promptBox", ["$modal", "$q", function ($modal, $q) {
    return {
        scope: {
            params: "=",
            extData: "="
        },
        restrict: "E",
        templateUrl: "promptBoxBtnTpl.html",
        replace: false,
        link: function ($scope) {
            var params = ($scope.params = ($scope.params ? $scope.params : {}));
            var extData = ($scope.extData = ($scope.extData ? $scope.extData : {}));
            //popTitle: 弹框标题
            //onPopBefore: 必须返回延迟对象
            //isShowConfirmBtn
            //isShowCancelBtn
            //confirmBtnTxt
            //cancelBtnTxt
            //btn: 被点击弹框的按钮
            //popBtns: 弹出框内footer部分的按钮
            //onConfirmClick: 点击确认时触发的事件
            //onCancelClick: 点击取消时触发的事件
            //popBodyTplUrl: 弹框内body部分模板链接
            //popBodyTpl: 弹框内body部分模板内容 如果popBodyTplUrl和popBodyTpl都传的话优先取popBodyTplUrl
            var onPopBefore = params.onPopBefore ? params.onPopBefore : function () {
                var def = $q.defer();
                def.resolve({
                    defaultPopBeforeEvent: true
                });
                return def.promise;
            };
            params.popTitle = (params.popTitle ? params.popTitle : "提示");
            var isShowConfirmBtn = params.isShowConfirmBtn ? params.isShowConfirmBtn : true;
            var isShowCancelBtn = params.isShowCancelBtn ? params.isShowCancelBtn : true;
            var confirmBtnTxt = params.confirmBtnTxt ? params.confirmBtnTxt : "确定";
            var cancelBtnTxt = params.cancelBtnTxt ? params.cancelBtnTxt : "取消";
            var btn = (params.btn = (params.btn ? params.btn : {
                txt: "按钮",
                ele: "a",
                theme: ""
            }));
            var btnStyle = (params.btnStyle = (params.btnStyle ? params.btnStyle : {}));
            var popBtns = (params.popBtns = (params.popBtns ? params.popBtns : []));
            var onConfirmClick = params.onConfirmClick ? params.onConfirmClick : function () {};
            var onCancelClick = params.onCancelClick ? params.onCancelClick : function () {};
            var popBodyTplUrl = params.popBodyTplUrl ? params.popBodyTplUrl : "popBodyTpl.html";
            var popBodyTpl = params.popBodyTpl ? params.popBodyTpl : "";
            var popBodyTplNameLen = popBodyTplUrl.length;
            var isPopBodyTplHaveHtmlExt = popBodyTplUrl.substring(popBodyTplNameLen - 5);
            if(isPopBodyTplHaveHtmlExt != ".html"){
                popBodyTplUrl = popBodyTplUrl + ".html";
            }
            popBtns.length = 0;
            if(isShowConfirmBtn){
                popBtns.push({
                    txt: confirmBtnTxt,
                    style: "info",
                    clickFn: function (d) {
                        onConfirmClick(d);
                    }
                });
            }
            if(isShowCancelBtn){
                popBtns.push({
                    txt: cancelBtnTxt,
                    style: "gray",
                    clickFn: function (d) {
                        onCancelClick(d);
                    }
                });
            }

            $scope.open = function () {
                var config = {
                    size: "sm",
                    templateUrl: "promptBoxContentTpl.html",
                    controller: "promptBoxController",
                    resolve: {
                        params: function () {
                            return $scope.params;
                        },
                        extData: function () {
                            return $scope.extData;
                        }
                    }
                };
                onPopBefore(extData).then(function (val) {
                    $modal.open(config);
                });
            };
        }
    };
}]);
operApp.controller("promptBoxController", ["$scope", "$sce", "params", "extData", "$modalInstance", function ($scope, $sce, params, extData, $modalInstance) {
    $scope.params = params;
    $scope.extData = extData;
    var bodyParams = {};
    var popBodyTplUrl = params.popBodyTplUrl ? params.popBodyTplUrl : "";
    var popBodyTpl = params.popBodyTpl ? params.popBodyTpl : "";
    if(popBodyTplUrl){
        bodyParams.isUrl = true;
        bodyParams.templateUrl = popBodyTplUrl;
    }else if(popBodyTpl){
        bodyParams.isUrl = false;
        bodyParams.template = $sce.trustAsHtml(popBodyTpl);
    }else{
        console.error("未传递模板或模板链接");
        bodyParams.isUrl = true;
        bodyParams.templateUrl = "popBodyTpl.html";
    }
    $scope.bodyParams = bodyParams;
    $scope.closePop = function () {
        $modalInstance.dismiss('cancel');
    };
}]);