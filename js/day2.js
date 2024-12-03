
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
        parseDay2Data(data);
    });

    return fileData;
}

function parseDay2Data(data) {
    const myDataArr = data.split('\r\n');
    const myDataArrArr = myDataArr.map((itemStr) => {
        const test = itemStr.split(',');
        const test2 = test[0].split(' ');
        return test2;
    });

    myDataArrArr.forEach((item) => removeSingleFaultIfPossible(item));

    const myDiffArrArr = myDataArrArr.map((item) => createDiffArr(item));

    const myDiffArrArrSafe = myDiffArrArr.filter((item) => isDiffSafe(item));

    console.log("Number of safe 'levels'", myDiffArrArrSafe.length); // Correct Answer: 402
    console.log("Number of removed single faults", removedSingleFaults);
}

function createDiffArr(arr) {
    let diffArr = [];
    for(let i = 1; i < arr.length; i++) {
        diffArr.push(arr[i] - arr[i - 1]);
    }
    return diffArr;
}

function isDiffSafe(diffArr) {
    const posSign = diffArr.every((diff) => diff > 0);
    const negSign = diffArr.every((diff) => diff < 0);
    const safeDiff = diffArr.every((diff) => Math.abs(diff) >= 1 && Math.abs(diff) <= 3);
    return (posSign || negSign) && safeDiff;
}

function removeSingleFaultIfPossible(dataArr) {
    if(!isSafe(dataArr)) {
        return removeSingleFault(dataArr)
    }
    return dataArr;
}

function isSafe(dataArr) {
    if(dataArr.length <= 1) 
        return true;

    const slope = dataArr[1] - dataArr[0];
    for(let i = 1; i < dataArr.length; i++) {
        if(!isSafeIncrement(dataArr[i - 1], dataArr[i])) {
            return false;
        }
        if(slope * (dataArr[i] - dataArr[i - 1]) <= 0) {
            return false;
        }
    }
    return true;
}

function removeSingleFault(dataArr) {
    for(let i = 0; i < dataArr.length; i++) {
        const tmpArr = [...dataArr];
        tmpArr.splice(i, 1);
        if(isSafe(tmpArr)) {
            console.log(`Remove unsafe element ${dataArr[i]} in `, dataArr);
            dataArr.splice(i, 1);   // Remove unsafe element
            removedSingleFaults++;
            return tmpArr;
        }
    }
    return dataArr;
}


function isSafeIncrement(a, b) {
    return Math.abs(b-a) >= 1 && Math.abs(b-a) <= 3;
}


readFileData('./data/list2.txt');

