/**
 * Created by lenovo on 2016/11/8.
 */
operApp.filter("FilterField", function () {
    return function (aField) {
        var removeFields = [].slice.call(arguments, 1);
        angular.forEach(aField, function (field, i) {
            angular.forEach(removeFields, function (fieldName, i) {
                if(field.field == fieldName){
                    aField.splice(i, 1);
                }
            });
        });
        return aField;
    };
});