
// Include fs module
const fs = require('fs');
const CALC_RESONANT_ANTI_NODES = true;
let mapHeight = 0;
let mapWidth = 0; 

parseDay8Data();

function readFileData(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const linesArr = data.split('\r\n');
    return linesArr;
}

function parseDay8Data() {
    const dataArr = readFileData('./data/list8.txt')
    const dataArrArr = dataArr.map((item) => item.split(""));
    mapHeight = dataArrArr.length;
    mapWidth = dataArrArr[0].length;   
    const antennas = compileAntennas(dataArrArr);
    const antiNodes = calcAntiNodeLocations(antennas);
    const uniqueLocations = removeDuplicates(antiNodes);
    // console.log(antiNodes);
    // console.log(uniqueLocations);
    console.log("Anti Nodes", antiNodes.length);
    console.log("Unique Locations", uniqueLocations.length); // Correct Answer: a) 299 , b) 1032
}

function isOnMap({y, x}) {
    return y >= 0 && x >= 0 && y < mapHeight && x < mapWidth;
}

function isSamePos(pos1, pos2) {
    return pos1.y===pos2.y && pos1.x===pos2.x;
}

function subtractPositions(pos1, pos2) {
    return {y: pos1.y-pos2.y, x: pos1.x-pos2.x};
}

function addPositions(pos1, pos2) {
    return {y: pos1.y+pos2.y, x: pos1.x+pos2.x};
}

function removeDuplicates(antiNodes) {
    const uniqueLocations = antiNodes.reduce((acc, pos) => {
        if(!acc.some((item) => isSamePos(item, pos))) {
            acc.push(pos);
        };
        return acc;
    }, []);

    return uniqueLocations;
}

function calcAntiNodeLocations(antennas) {
    const antiNodes = [];
    for(let antenna in antennas) {
        const antennaCnt = antennas[antenna].pos.length;
        for(let a1 = 0; a1<antennaCnt; a1++) {
            for(let a2 = a1+1; a2<antennaCnt; a2++) {
                if(CALC_RESONANT_ANTI_NODES) {
                    addResonantAntiNodesLocations(antiNodes, antennas[antenna].pos[a1], antennas[antenna].pos[a2]);
                } else {
                    addAntiNodesLocations(antiNodes, antennas[antenna].pos[a1], antennas[antenna].pos[a2]);
                }
            }
        }
    }
    return antiNodes;
}

function addAntiNodesLocations(antiNodes, a1, a2) {
    const nodeDist = subtractPositions(a2, a1);
    const antiNode1 = subtractPositions(a1, nodeDist);
    const antiNode2 = addPositions(a2, nodeDist);

    if(isOnMap(antiNode1))
        antiNodes.push(antiNode1);
    if(isOnMap(antiNode2))
        antiNodes.push(antiNode2);
}

function addResonantAntiNodesLocations(antiNodes, a1, a2) {
    const nodeDist = subtractPositions(a2, a1);
    let antiNode = a1;
    while(isOnMap(antiNode)) {
        antiNodes.push(antiNode);
        antiNode = subtractPositions(antiNode, nodeDist);
    }

    antiNode = a2;
    while(isOnMap(antiNode)) {
        antiNodes.push(antiNode);
        antiNode = addPositions(antiNode, nodeDist);
    }
}

function compileAntennas(dataArrArr) {
    const antennas = {};
    for(let y=0; y<dataArrArr.length; y++) {
        for(let x=0; x<dataArrArr[y].length; x++) {
            const aType = dataArrArr[y][x];
            const aPos = {y:y, x:x};
            if(aType !== '.') {
                if(typeof antennas[aType] === 'undefined') {
                    antennas[aType] = {pos: [aPos]};
                } else {
                    antennas[aType].pos.push(aPos);
                }
            }
        }
    }
    return antennas;
}
