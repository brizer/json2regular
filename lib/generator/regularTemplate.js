const template = require('../template');
const parser = require('../parser');

/**
 * 获取表单模板
 * @param {Array} ls 
 */
const getFormTemplate = (ls=[])=>{
    let transform = [];
    ls.forEach(value=>{
        transform.push(template.getformRowTpl(value))
    });
    return parser.transform(transform);
}

module.exports = {
    getFormTemplate:getFormTemplate
}