const temp = {
    'input':{
        '<>':'div',
        'class':'block',
        'html':[
            {
                '<>':'div',
                'class':'block-name',
                'text':'文本框组件'
            },
            {
                '<>':'div',
                'class':'block-value',
                'html':[
                    {
                        '<>':'ux-input',
                        'rdata':{
                            'value':'value'
                        }
                    }
                ]
            }
        ]
    },
    'radio-group':{
        '<>':'div',
        'class':'block',
        'html':[
            {
                '<>':'div',
                'class':'block-name',
                'text':'多选框组件'
            },
            {
                '<>':'div',
                'class':'block-value',
                'html':[
                    {
                        '<>':'ux-radio-group',
                        'rdata':{
                            'source':'source',
                            'on-select':'this.onSelect($events)'
                        }
                    }
                ]
            }
        ]
    }
}


module.exports = temp;