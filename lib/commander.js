const fs = require('fs');
const beautify = require('js-beautify');

const nejDefine = require('./generator/nejDefine');
const regularTemplate = require('./generator/regularTemplate');

const srcPath = './src/test.json';
const outputPath = './dist/component.html';
const outputJSPath = './dist/component.js';

let commander = {};
commander.run = ()=>{

    let jsonContent = fs.readFileSync(srcPath).toString();
    let json = JSON.parse(jsonContent);
    let items = json.item;

    let resultContent = regularTemplate.getFormTemplate(items);
    let html = beautify.html(resultContent,{
        indent_size:4
    })
    console.log(html);
    fs.writeFileSync(outputPath,html);


    let jsStr = nejDefine.getNejDefinedContent(items);
    console.log(jsStr);
    fs.writeFileSync(outputJSPath,jsStr);


}
module.exports = commander;