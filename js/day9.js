
// Include fs module
const fs = require('fs');
const DEFRAG_FILES = true;

parseDay9Data();

function readFileData(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const diskMap = data.split('');
    return diskMap;
}

function parseDay9Data() {
    const diskMap = readFileData('./data/list9.txt')
    const fileMap = createFreeSpaceMap(diskMap);

    const deFragmentedFileMap = defragFile(fileMap);
    const checksum = calcChecksum(deFragmentedFileMap);
    console.log("checksum", checksum); // Correct answer: 6200294120911
}

function defragFile(fileMap) {
    if(DEFRAG_FILES){
        return deFragmentFileMap2(fileMap);
    } else {
        return deFragmentFileMap(fileMap);
    }
}

function calcChecksum(deFragmentedFileMap) {
    let checksum = 0;
    for(let i=0; i<deFragmentedFileMap.length; i++) {
        if(deFragmentedFileMap[i] != '.') {
            checksum +=  i*deFragmentedFileMap[i];
        }
    }
    return checksum;
}

function findEmptySlot(defragMap, size) {
    for(let i=0; i<defragMap.length-1; i++){
        if(defragMap[i] === '.'){
            const testSlice = defragMap.slice(i, i+size);
            if(testSlice.every((block) => block === '.')) {
                return i;
            }
        }
    }
    return -1;
}

function moveFile(defragMap, from, to, fileSize) {
    const file = defragMap.slice(from, from + fileSize);
    defragMap.splice(to, file.length, ...file);
    for(let i=0; i<fileSize; i++) {
        defragMap[from+i] = '.'; 
    }
}

function deFragmentFileMap2(fileMap) {
    const defragMap = [...fileMap];

    let j = defragMap.length-1;
    do {
        // Goto next full pos (in reversed order)
        while(j>0 && defragMap[j] == '.') j--;

        // Get file size
        let fileSize = 0
        const fileId = defragMap[j];
        while(defragMap[j] === fileId) {
            j--;
            fileSize++;
        }
        const fromIdx = j+1;
        
        // Find empty slot with size >= fileSize
        const eIndex = findEmptySlot(defragMap, fileSize)
        if(eIndex >= 0 && eIndex < fromIdx) {
            moveFile(defragMap, fromIdx, eIndex, fileSize);
        }

    } while(j>0);

    return defragMap;
}

function deFragmentFileMap(fileMap) {
    const defragMap = [...fileMap];
    let i = 0;
    let j = defragMap.length-1;
    do {
        // Goto next empty pos
        while(i<defragMap.length && defragMap[i] != '.') i++;
        if(i>=defragMap.length)
            break;

        // Goto next full pos (in reversed order)
        while(j>i && defragMap[j] == '.') j--;

        defragMap[i] = defragMap[j];
        defragMap[j] = '.';
    } while(j>i);

    return defragMap;
}

function createFreeSpaceMap(diskMap) {
    const fileBlocks = [];
    let id = 0;
    for(let i=0; i<diskMap.length; i+=2, id++) {
        for(let j=0; j<diskMap[i]; j++) {
            fileBlocks.push(id);
        }
        if(i+1 < diskMap.length) {
            for(let j=0; j<diskMap[i+1]; j++) {
                fileBlocks.push('.');
            }
        }
    }
    return fileBlocks;
}
