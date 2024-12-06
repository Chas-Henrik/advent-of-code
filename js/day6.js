
// Include fs module
const fs = require('fs');

let data = fs.readFileSync('./data/list6.txt', 'utf8');
const directions = ['N', 'E', 'S', 'W'];
let currentDirection = 'N';
let visitedPositions = 0;

parseDay6Data();

function parseDay6Data() {
    const linesArr = data.split('\r\n');
    const mapArrArr = linesArr.map(line => line.split(''));
    const startPos = findStartPos(mapArrArr);
    patrol(mapArrArr, startPos, 'N');
    const fd = fs.openSync('./data/mapfile.txt', 'w');
    fs.writeFileSync(fd, mapArrArr.map((line) => line.join('')).join('\r\n'));
    console.log(visitedPositions); // Correct answer: 5444
}

function findStartPos(mapArrArr) {
    let startPos = [];
    for (let y = 0; y < mapArrArr.length; y++) {
        for (let x = 0; x < mapArrArr[y].length; x++) {
            if (mapArrArr[y][x] === '^') {
                startPos = {y, x};
            }
        }
    }
    return startPos;
}

function patrol(mapArrArr, startPos) {
    let pos = {...startPos};
    do {
        markVisited(mapArrArr, pos);
        let newPos = getNewPos(pos);
        //Change direction if there is an obstacle
        while(!isOutsideMap(mapArrArr, newPos) && isObstacle(mapArrArr, newPos)){
            currentDirection = directions[(directions.indexOf(currentDirection) + 1) % 4];
            newPos = getNewPos(pos)
        }
        pos = {...newPos};

    } while (!isOutsideMap(mapArrArr, pos));
}

function getNewPos(pos) {
    let newPos = {...pos};
    switch (currentDirection) {
        case 'N':
            newPos.y = pos.y - 1;
            break;
        case 'E':
            newPos.x = pos.x + 1;
            break;
        case 'S':
            newPos.y = pos.y + 1;
            break;
        case 'W':
            newPos.x = pos.x - 1;
            break;
    }

    return newPos;
}

function markVisited(mapArrArr, pos) {
    if(mapArrArr[pos.y][pos.x] === '.' || mapArrArr[pos.y][pos.x] === '^') {
        visitedPositions++;
        if(mapArrArr[pos.y][pos.x] != '^') {
            mapArrArr[pos.y][pos.x] = 'X';
        }
    }
}

function isObstacle(mapArrArr, pos) {
    return mapArrArr[pos.y][pos.x] === '#';
}

function isOutsideMap(mapArrArr, pos) {
    const isOutside = pos.y < 0 || pos.x < 0 || pos.y >= mapArrArr.length || pos.x >= mapArrArr[pos.y].length;
    return isOutside;
}

// Include fs module
const fs = require('fs');

let data = fs.readFileSync('./data/list6.txt', 'utf8');
const directions = ['N', 'E', 'S', 'W'];
let currentDirection = 'N';
let visitedPositions = 0;

parseDay6Data();

function parseDay6Data() {
    const linesArr = data.split('\r\n');
    const mapArrArr = linesArr.map(line => line.split(''));
    const startPos = findStartPos(mapArrArr);
    patrol(mapArrArr, startPos, 'N');
    const fd = fs.openSync('./data/mapfile.txt', 'w');
    fs.writeFileSync(fd, mapArrArr.map((line) => line.join('')).join('\r\n'));
    console.log(visitedPositions); // Correct answer: 5444
}

function findStartPos(mapArrArr) {
    let startPos = [];
    for (let y = 0; y < mapArrArr.length; y++) {
        for (let x = 0; x < mapArrArr[y].length; x++) {
            if (mapArrArr[y][x] === '^') {
                startPos = {y, x};
            }
        }
    }
    return startPos;
}

function patrol(mapArrArr, startPos) {
    let pos = {...startPos};
    do {
        markVisited(mapArrArr, pos);
        let newPos = getNewPos(pos);
        //Change direction if there is an obstacle
        while(!isOutsideMap(mapArrArr, newPos) && isObstacle(mapArrArr, newPos)){
            currentDirection = directions[(directions.indexOf(currentDirection) + 1) % 4];
            newPos = getNewPos(pos)
        }
        pos = {...newPos};

    } while (!isOutsideMap(mapArrArr, pos));
}

function getNewPos(pos) {
    let newPos = {...pos};
    switch (currentDirection) {
        case 'N':
            newPos.y = pos.y - 1;
            break;
        case 'E':
            newPos.x = pos.x + 1;
            break;
        case 'S':
            newPos.y = pos.y + 1;
            break;
        case 'W':
            newPos.x = pos.x - 1;
            break;
    }

    return newPos;
}

function markVisited(mapArrArr, pos) {
    if(mapArrArr[pos.y][pos.x] === '.' || mapArrArr[pos.y][pos.x] === '^') {
        visitedPositions++;
        if(mapArrArr[pos.y][pos.x] != '^') {
            mapArrArr[pos.y][pos.x] = 'X';
        }
    }
}

function isObstacle(mapArrArr, pos) {
    return mapArrArr[pos.y][pos.x] === '#';
}

function isOutsideMap(mapArrArr, pos) {
    const isOutside = pos.y < 0 || pos.x < 0 || pos.y >= mapArrArr.length || pos.x >= mapArrArr[pos.y].length;
    return isOutside;
}
