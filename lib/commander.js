const fs = require('fs');
const beautify = require('js-beautify');

const template =require('./template');
const parser = require('./parser');
const nejDefine = require('./generator/nejDefine');

const srcPath = './src/test.json';
const outputPath = './dist/component.html';
const outputJSPath = './dist/component.js';

let commander = {};
commander.run = ()=>{

    let transform = [];

    let jsonContent = fs.readFileSync(srcPath).toString();
    let json = JSON.parse(jsonContent);
    let items = json.item;
    items.forEach((value)=>{
        transform.push(template.getformRowTpl(value));
    });
    let resultContent = parser.transform(transform);
    let html = beautify.html(resultContent,{
        indent_size:4
    })
    fs.writeFileSync(outputPath,html);


    let jsStr = nejDefine.getNejDefinedContent(items);
    fs.writeFileSync(outputJSPath,jsStr);


}
module.exports = commander;