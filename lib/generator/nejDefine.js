const template = require('../template');

let comTpl = template.comTpl;

/**
 * 获取nej的定义的字符串
 * @param {Array} ls 
 */
const getNejDefinedContent =(ls=[])=>{
    let dependsList = formatDependList(ls);
    let jsStr = template.nejDefineContent(dependsList.dependLinkList,dependsList.dependNameList);
    return jsStr;
}

/**
 * 整理nej依赖列表
 * @param {Array} ls 
 */
const formatDependList=(ls=[])=>{
    let dependLinkList = [];
    let dependNameList = [];
    ls.map(value=>{
        dependLinkList.push(comTpl[value].dependLink);         
        dependNameList.push(comTpl[value].dependName);         
    });
    return {
        dependLinkList:[...new Set(dependLinkList)],
        dependNameList:[...new Set(dependNameList)]
    }
}

module.exports = {
    getNejDefinedContent:getNejDefinedContent
};