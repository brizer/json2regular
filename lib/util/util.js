

let util = {}

util.isArray = (obj)=>{
    return Object.prototype.toString.call(obj) === '[object Array]';
}

module.exports= util;