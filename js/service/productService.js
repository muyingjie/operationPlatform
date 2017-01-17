/**
 * Created by lenovo on 2016/12/21.
 */
operApp.service("productService",["ms", function (ms) {
    function getProductPackage(option){
        return ms("Product.getProductPackage",option);
    }
    function saleOnShelves(option){
        return ms("Product.saleOnShelves",option)
    }
    function productPackageDetails(option){
        return ms("Product.productPackageDetails",option)
    }
    function productPackage(option){
        return ms("Product.productPackage",option)
    }
    return{
        getProductPackage:getProductPackage,
        saleOnShelves:saleOnShelves,
        productPackageDetails:productPackageDetails,
        productPackage:productPackage
    }
}]);
