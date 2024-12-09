
// Include fs module
const fs = require('fs');

parseDay9Data();

function readFileData(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const linesArr = data.split('\r\n');
    return linesArr;
}

function parseDay9Data() {
    const dataArr = readFileData('./data/list10.txt')
    const dataArrArr = dataArr.map((item) => item.split(""));

}

