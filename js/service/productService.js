/**
 * Created by lenovo on 2016/12/21.
 */
operApp.service("productService",["ms", function (ms) {
    function getProductPackage(option){
        return ms("Product.getProductPackage",option);
    }

    return{
        getProductPackage:getProductPackage
    }
}]);
