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
    function basicsTechniqueProduct(option){
        return ms("Product.basicsTechniqueProduct",option)
    }
    function meteringTechniqueProduct(option){
        return ms("Product.meteringTechniqueProduct",option)
    }
    return{
        getProductPackage:getProductPackage,
        saleOnShelves:saleOnShelves,
        productPackageDetails:productPackageDetails,
        productPackage:productPackage,
        basicsTechniqueProduct:basicsTechniqueProduct,
        meteringTechniqueProduct:meteringTechniqueProduct
    }
}]);
