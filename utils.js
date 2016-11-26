module.exports.require_optional = function(moduleName){
    var mod;
    try{
        mod = require(moduleName);
    }catch(e){
        console.info('module is not available: ' + moduleName);
    }
    return mod;
};
