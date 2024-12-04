
// Include fs module
const fs = require('fs');
let removedSingleFaults = 0;

function readFileData(url) {
    console.log(url);
    let fileData;
    fs.readFile(url, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        parseDay4Data(data);
    });

    return fileData;
}

function parseDay4Data(data) {
    linesArr = data.split('\r\n');
    charLinesArr = linesArr.map((line) => line.split(''));
    let xmasMatches = 0;
    let xMasMatches = 0;
    for(let y = 0; y < charLinesArr.length; y++) {
        for(let x = 0; x < charLinesArr[y].length; x++) {
            xmasMatches += matchXMAS(charLinesArr, y, x, charLinesArr.length, charLinesArr[y].length);
            xMasMatches += matchX_MAS(charLinesArr, y, x, charLinesArr.length, charLinesArr[y].length);
        }
    }
    console.log('xmasMatches', xmasMatches); // Correct answer: 2545
    console.log('xMasMatches', xMasMatches); // Correct answer: 1886
}

function matchXMAS(data, y, x, yMax, xMax) {
    matches = 0;
    if(data[y][x] === 'X') {
        // check horizontal (right)
        if(x+3<xMax && data[y][x + 1] === 'M' && data[y][x + 2] === 'A' && data[y][x + 3] === 'S') {
            matches++;
        }
        // check horizontal (left)
        if(x-3>=0 && data[y][x - 1] === 'M' && data[y][x - 2] === 'A' && data[y][x - 3] === 'S') {
            matches++;
        }
        // check vertical (down)
        if(y+3<yMax && data[y + 1][x] === 'M' && data[y + 2][x] === 'A' && data[y + 3][x] === 'S') {
            matches++;
        }
        // check vertical (up)
        if(y-3>=0 && data[y - 1][x] === 'M' && data[y - 2][x] === 'A' && data[y - 3][x] === 'S') {
            matches++;
        }
        // check diagonal (down-right)
        if(y+3<yMax && x+3<xMax && data[y + 1][x + 1] === 'M' && data[y + 2][x + 2] === 'A' && data[y + 3][x + 3] === 'S') {
            matches++;
        }
        // check diagonal (down-left)
        if(y+3<yMax && x-3>=0 && data[y + 1][x - 1] === 'M' && data[y + 2][x - 2] === 'A' && data[y + 3][x - 3] === 'S') {
            matches++;
        }
        // check diagonal (up-left)
        if(y-3>=0 && x-3>=0 && data[y - 1][x - 1] === 'M' && data[y - 2][x - 2] === 'A' && data[y - 3][x - 3] === 'S') {
            matches++;
        }
        // check diagonal (up-right)
        if(y-3>=0 && x+3<xMax && data[y - 1][x + 1] === 'M' && data[y - 2][x + 2] === 'A' && data[y - 3][x + 3] === 'S') {
            matches++;
        }
    }
    return matches;
}

function matchX_MAS(data, y, x, yMax, xMax) {
    matches = 0;
    if(data[y][x] === 'A') {
        if(x-1>=0 && y-1>=0 && x+1 < xMax && y+1 < yMax) {
            if(data[y - 1][x - 1] === 'M' &&  data[y - 1][x + 1] === 'S' &&
                data[y + 1][x - 1] === 'M' && data[y + 1][x + 1] === 'S') {
                matches++;
            }
            if(data[y - 1][x - 1] === 'M' &&  data[y - 1][x + 1] === 'M' &&
                data[y + 1][x - 1] === 'S' && data[y + 1][x + 1] === 'S') {
                matches++;
            }
            if(data[y - 1][x - 1] === 'S' &&  data[y - 1][x + 1] === 'M' &&
                data[y + 1][x - 1] === 'S' && data[y + 1][x + 1] === 'M') {
                matches++;
            }
            if(data[y - 1][x - 1] === 'S' &&  data[y - 1][x + 1] === 'S' &&
                data[y + 1][x - 1] === 'M' && data[y + 1][x + 1] === 'M') {
                matches++;
            }
        }
    }
    return matches;
}

readFileData('./data/list4.txt');

