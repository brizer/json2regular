
const util = require('./util');
const TAG = require('./tagConst');

let parser = {};
parser.tempOut = {
    html:''
}

/**
 * 转换
 */
parser.transform = (transform)=>{
    
    let out = Object.assign({},parser.tempOut);

    if(transform){
        out = parser.doTransform(transform);
    }

    return out.html;
    
}

/**
 * 真正的转换操作
 */
parser.doTransform = (transform)=>{
    let elements = Object.assign({},parser.tempOut);
    //递归操作转换对象数组
    let stitcher = parser.recursiveTransform(transform);
    elements = parser.append(elements,stitcher)
    
    return elements;
}


/**
 * 拼接内容
 */
parser.append = (o1,o2)=>{
    let out = Object.assign({},parser.tempOut);
    if(o1 && o2){
        out.html = o1.html+o2.html;    
    }
    return out;
}

/**
 * 递归转换
 */
parser.recursiveTransform = (
    transform=[]
    )=>{
    let elements = Object.assign({},parser.tempOut);
    if(util.isArray(transform)){
        transform.forEach((value)=>{
            let stitcher = parser.recursiveTransform(value);
            elements = parser.append(elements,stitcher);
        })
    }else if(typeof transform == 'object'){
        //标准对象解析
        let element = '<>';
        if(transform[element]){
            let name = parser.getValue(transform,element);

            elements.html += `<${name}`;

            let children = Object.assign({},parser.tempOut);

            let html;

            let _transform;

            for (var key in transform) {

                switch(key) {
                    // 标签标示
                    case TAG.TAG:
                    break;
                    
                    //dom内文本内容
                    case TAG.TEXT:
                        _transform = transform[key];
                        //转义
                        html = parser.toText( parser.getValue(transform,key) );
                        
                    break;

                    //html代表有子层次结构
                    case TAG.CHILD:

                        _transform = transform[key];

                        // 子层次以数组结构承载
                        if(util.isArray(_transform)) {
                            
                            //对子层进行递归操作
                            let stitcher = parser.recursiveTransform(_transform);
                            children = parser.append(children,stitcher);
                        }
                    break;

                    //rdata标示regular传递下去的属性
                    case TAG.REGULAR_DATA:
                        _transform = transform[key];
                        for(let [key,value] of Object.entries(_transform)){
                            let valueStr = ` ${key}={${value}}`;
                            elements.html +=valueStr;
                        }
                        
                    break;

                    default:
                        //除了特定匹配的标识符外，其他都作为普通属性
                        let val = parser.getValue(transform, key);
                        
                        //进行简单的赋值操作拼接
                        if(val !== undefined) {
                            let out;
                            
                            if(typeof val == 'string') {
                                out = '"' + val.replace(/"/g, '&quot;') + '"';
                            }else {
                                out = val
                            };
                            
                            //创造对应的字符串
                            let valueStr = ` ${key}=${out}`;
                            elements.html += valueStr;
                        }
                    break;
                }
            }
            //开标签
            elements.html += '>';
            
            //增加innerHTML内容
            if(html) elements.html += html;

            //将当前节点的子层进行拼接
            elements = parser.append(elements,children);

            //闭合标签
            elements.html += `</${name}>`;
        }
    }

    return elements;

}

/**
 * 基本转义
 */
parser.toText = (html)=>{
    return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

/**
 * 获取内容
 */
parser.getValue = (transform,key)=>{
    let val = transform[key];
    return val;
}


module.exports = parser;