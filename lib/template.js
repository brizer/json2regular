
/**
 * 组件对应模板
 * 
 * 基本模板template，
 * 依赖变量和路径
 */
const comTpl = {
    'input':{
        template:[
            {
                '<>':'ux-input',
                'rdata':{
                    'value':'value'
                }
            }
        ],
        dependLink:'pool/component-input/src/input/ui',
        dependName:'InputUI'
    },
    'textarea':{
        template:[
            {
                '<>':'ux-textarea',
                'rdata':{
                    'value':'value'
                }
            }
        ],
        dependLink:'pool/component-input/src/textarea/ui',
        dependName:'TexraretUI'
    },
    'dropdown':{
        template:[
            {
                '<>':'ux-dropdown',
                'rdata':{
                    'source':'source',
                    'selected':'selected',
                    'on-select':'this.select($event)'
                }
            }
        ],
        dependLink:'pool/component-dropdown/src/dropdown/ui',
        dependName:'DropdownUI'
    },
    'radio-group':{
        template:[
            {
                '<>':'ux-radio-group',
                'rdata':{
                    'source':'source',
                    'on-select':'this.onSelect($events)'
                }
            }
        ],
        dependLink:'pool/component-check/src/radio-group/web/ui',
        dependName:'RadioGroupUI'
    },
    'check':{
        template:[
            {
                '<>':'ux-check',
                'rdata':{
                    'checked':'checked',
                    'on-check':'this.onCheck($events)'
                }
            }
        ],
        dependLink:'pool/component-check/src/check/ui',
        dependName:'CheckUI' 
    },
    'check-group':{
        template:[
            {
                '<>':'ux-check-group',
                'rdata':{
                    'source':'source',
                    'on-check':'this.onCheck($events)'
                }
            }
        ],
        dependLink:'pool/component-check/src/check-group/ui',
        dependName:'CheckGroupUI' 
    },
    'dateTimePicker':{
        template:[
            {
                '<>':'ux-dateTimePicker',
                'rdata':{
                    'date':'date'
                }
            }
        ],
        dependLink:'pool/component-calendar/src/dateTimePicker/ui',
        dependName:'dateTimePickerUI' 
    },
    'dateTimePickerRange':{
        template:[
            {
                '<>':'ux-dateTimePicker',
                'rdata':{
                    'date':'date'
                }
            },
            {
                '<>':'span',
                'text':'至'
            }
            ,{
                '<>':'ux-dateTimePicker',
                'rdata':{
                    'date':'date'
                }
            }
        ],
        dependLink:'pool/component-calendar/src/dateTimePicker/ui',
        dependName:'dateTimePickerUI' 
    }
}

/**
 * 表单行内html模板
 * @param {String} type 组件类型
 */
const getformRowTpl =(type)=>{

    let rowTpl = {
        '<>':'div',
        'class':'block',
        'html':[
            {
                '<>':'div',
                'class':'block-name',
                'text':'文本内容'
            },
            {
                '<>':'div',
                'class':'block-value',
                'html':comTpl[type].template
            }
        ]
    } 
    return rowTpl;
}
/**
 * Nej依赖定义的模板
 * @param {} depentLinkList 
 * @param {*} dependNameList 
 */
const nejDefineContent = (depentLinkList,dependNameList)=>{
    return  `NEJ.define([
    'pool/component-base/src/base',
    'pool/component-base/src/util',
    ${depentLinkList.map(item => `'${item}',
    `).join('')}
],function(
    Component,
    util,
    ${dependNameList.map(item => `${item},
    `).join('')}
){
    
});`
}



const template = {
    getformRowTpl:getformRowTpl,
    nejDefineContent:nejDefineContent,
    comTpl:comTpl
}


module.exports = template;