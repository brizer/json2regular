const fs = require('fs');
const parser = require('./parser');

const srcPath = './src/test.json';
const outputPath = './dist/test.html';

let commander = {};
commander.run = ()=>{


    let transform = [{'<>':'div','class':'card','html':[
        {'<>':'img','alt':'this is our logo','src':'logo.jpg','log':'123'},
        {'<>':'span','text':'Welcome to json2html!'}
    ]},{'<>':'div','class':'123','html':[
        {'<>':'p','text':'Welcome to json2html!','html':[
            {'<>':'ux-input','class':'ux-input'}
        ]}
    ]}];



    let jsonContent = fs.readFileSync(srcPath).toString();
    let json = JSON.parse(jsonContent);
    let resultContent = parser.transform(transform);
    console.log(resultContent);
    fs.writeFileSync(outputPath,resultContent);
}
module.exports = commander;