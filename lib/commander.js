const fs = require('fs');
const beautify = require('js-beautify');

const template =require('./template');
const parser = require('./parser');

const srcPath = './src/test.json';
const outputPath = './dist/test.html';

let commander = {};
commander.run = ()=>{

    let transform = [];
    transform.push(template['input'])
    transform.push(template['radio-group']);


    



    let jsonContent = fs.readFileSync(srcPath).toString();
    let json = JSON.parse(jsonContent);
    let resultContent = parser.transform(transform);
    let html = beautify.html(resultContent,{
        indent_size:4
    })

    console.log(html);
    fs.writeFileSync(outputPath,html);

}
module.exports = commander;