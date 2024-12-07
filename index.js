
// Include fs module
const fs = require('fs');

parseDay7Data();


function readFileData(fileName) {
    let data = fs.readFileSync(fileName, 'utf8');
    const linesArr = data.split('\r\n');
    return linesArr.map(line => line.split(/:\s|\s/));
}

function parseDay7Data() {
    let dataArrArr = readFileData('./data/list7.txt')
    dataArrArr = dataArrArr.map(dataArr => dataArr.map(data => parseInt(data)));
    console.log("dataArrArr.length", dataArrArr.length);
    const trueEqArrArr = dataArrArr.filter(dataArr => checkEquation(dataArr));
    const sum = trueEqArrArr.reduce((acc, dataArr) => acc + dataArr[0], 0);
    console.log("trueEqArrArr.length", trueEqArrArr.length);
    console.log("Test vals sum: ", sum); // Correct result: 4555081946288
    const trueEqArrArr2 = dataArrArr.filter(dataArr => checkEquation2(dataArr));
    const sum2 = trueEqArrArr2.reduce((acc, dataArr) => acc + dataArr[0], 0);
    console.log("trueEqArrArr2.length", trueEqArrArr2.length);
    console.log("Test vals sum2: ", sum2); // Correct result: 227921760109726
}

function checkEquation(dataArr) {
    [result, ...testVals] = dataArr;
    const opsArr = createBinArr(1, testVals.length-1);
    const opsArrMax = Math.pow(2, testVals.length-1)-1;

    for(let i = 0; i <= opsArrMax; i++) {
        const opsArr = createBinArr(i, testVals.length-1);
        const res = calcEquation(testVals, opsArr);
        if(res === result) 
            return true;
    }

    return false;
}

function createBinArr(num, width) {
    const tmpNum = Math.pow(2, width) + num;
    const tmpNumStr = tmpNum.toString(2);
    let tmpNumArr = tmpNumStr.split('');
    tmpNumArr.shift();
    tmpNumArr = tmpNumArr.map(num => parseInt(num));

    return tmpNumArr;
}   

function calcEquation(dataArr, opsArr) {
    const [init, ...rest] = dataArr;
    const res =  rest.reduce((acc, num, index) => (opsArr[index] === 0) ? acc + num : acc * num, init);

    return res;
}


function checkEquation2(dataArr) {
    const [result, ...testVals] = dataArr;
    const opsArrMax = Math.pow(3, testVals.length-1);

    for(let i = 0; i < opsArrMax; i++) {
        const opsArr = toArrBase(i, testVals.length-1, 3);
        const [init, ...rest] = testVals;
        const res = rest.reduce((acc, num, index) => calcEquation2(acc, num, index, opsArr), init);
        if(res === result) 
            return true;
    }

    return false;
}

function toArrBase(num, width, base) {
    const res = [];
    for(let i = 0; i < width; i++) {
        res.push(num % base);
        num = Math.floor(num / base);
    }
    return res;
}

function concatOp(val1, val2) {
    return parseInt(`${val1}${val2}`);
}

function calcEquation2(acc, num, index, opsArr) {
    switch(opsArr[index]) {
        case 0:
            return concatOp(acc, num);
        case 1:
            return acc + num;
        case 2:
            return acc * num;
    }
}