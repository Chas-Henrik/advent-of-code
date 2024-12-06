
// Include fs module
const fs = require('fs');

const directions = ['N', 'E', 'S', 'W'];
let currentDirection = 'N';
let visitedPositions = 0;
let loopDetected = false;
let loopDetectionStatus = {
    active : false,
    turns : []
};

let test = 0;

parseDay6Data();

function parseDay6Data() {
    mapArrArr = readMapFile('./data/list6.txt')
    const startPos = findStartPos(mapArrArr);
    const startDirection = 'N';
    patrol(mapArrArr, startPos, startDirection);
    const fd = fs.openSync('./data/mapfile.txt', 'w');
    fs.writeFileSync(fd, mapArrArr.map((line) => line.join('')).join('\r\n'));
    console.log("visitedPositions", visitedPositions); // Correct answer: 5444

    const createdLoops = runLoopDetection(startPos, startDirection);
    console.log("createdLoops", createdLoops); // Correct answer: 1946
}

function readMapFile(fileName) {
    let data = fs.readFileSync(fileName, 'utf8');
    const linesArr = data.split('\r\n');
    return linesArr.map(line => line.split(''));
}

function runLoopDetection(startPos, startDirection) {
    let detectedLoops = 0;
    const mapFileArrArr = readMapFile('./data/mapfile.txt');
    for (let y = 0; y < mapFileArrArr.length; y++) {
        for (let x = 0; x < mapFileArrArr[y].length; x++) {
            if (mapFileArrArr[y][x] == 'X') {
                const mapArrArr = readMapFile('./data/list6.txt');
                mapArrArr[y][x] = 'O';
                delete loopDetectionStatus.turns;
                loopDetectionStatus = {
                    active : true,
                    turns : []
                };
                if(patrol(mapArrArr, startPos, startDirection)){
                    detectedLoops++;
                }
            }
        }
    }
    return detectedLoops;
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

function patrol(mapArrArr, startPos, direction) {
    let pos = {...startPos};

    do {
        let obstacle = false;
        let newPos = null;

        // Mark current position as visited
        markVisited(mapArrArr, pos);

        // Change direction if there is an obstacle
        do {

            // Get the new position (or null if outside map)
            newPos = getNewPos(mapArrArr, pos, direction);

            // Bail out if outside map
            if(newPos == null)
                return false;

            // Check if new position is an obstacle
            obstacle = isObstacle(mapArrArr, newPos);

            // Try another direction if there is an obstacle
            if(obstacle) {
                // Bail out if loop is detected
                if(isLoopDetected(pos, direction)) {
                    return true;
                }
                
                direction = directions[(directions.indexOf(direction) + 1) % directions.length];
            }

        } while(obstacle);

        // Goto new position
        pos = {...newPos};

    } while (true);
}

function markVisited(mapArrArr, pos) {
    if(mapArrArr[pos.y][pos.x] === '.' || mapArrArr[pos.y][pos.x] === '^') {
        visitedPositions++;
        if(mapArrArr[pos.y][pos.x] != '^') {
            mapArrArr[pos.y][pos.x] = 'X';
        }
    }
}

function getNewPos(mapArrArr, pos, direction) {
    let newPos = {...pos};
    switch (direction) {
        case 'N':
            newPos.y -= 1;
            break;
        case 'E':
            newPos.x += 1;
            break;
        case 'S':
            newPos.y += 1;
            break;
        case 'W':
            newPos.x -= 1;
            break;
    }

    if(!isOutsideMap(mapArrArr, newPos))
        return newPos;
    else
        return null;
}

function isOutsideMap(mapArrArr, pos) {
    const isOutsideMap = pos.y < 0 || pos.x < 0 || pos.y >= mapArrArr.length || pos.x >= mapArrArr[pos.y].length;
    return isOutsideMap;
}


function isObstacle(mapArrArr, pos) {
    const isObstacle = mapArrArr[pos.y][pos.x] === '#' || mapArrArr[pos.y][pos.x] === 'O';

    return isObstacle;
}

function isLoopDetected(pos, direction) {
    let loopDetected = false;

    if(loopDetectionStatus.active) {
        if(loopDetectionStatus.turns.length > 0)
            loopDetected = loopDetectionStatus.turns.some(turn => detectLoop(turn, pos, direction));
        loopDetectionStatus.turns.push({pos: {...pos}, direction: direction});
    }

    return loopDetected;
}

function detectLoop(turn, pos, direction) {
    const samePos = turn.pos.x == pos.x && turn.pos.y == pos.y;
    const sameDirection = turn.direction == direction;
    const loopDetected = samePos && sameDirection;

    return loopDetected;
}
