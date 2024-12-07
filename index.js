
// Include fs module
const fs = require('fs');

parseDay8Data();


function readFileData(fileName) {
    let data = fs.readFileSync(fileName, 'utf8');
    const linesArr = data.split('\r\n');
    return linesArr.map(dataArr => dataArr.map(data => parseInt(data)));
}

function parseDay8Data() {
    let dataArrArr = readFileData('./data/list8.txt')

}

