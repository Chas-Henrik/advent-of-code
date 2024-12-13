
// Include fs module
const fs = require('fs');
const BUTTON_A_PRICE = 3;
const BUTTON_B_PRICE = 1;

parseDay13Data();

function readFileData(fileName) {
    const data = fs.readFileSync(fileName, 'utf8');
    const linesArr = data.split('\r\n');
    return linesArr;
}

function parseDay13Data() {
    const dataArr = readFileData('./data/list13.txt')
    const dataArrArr = dataArr.map((item) => item.split(/[:,]/).map((item) => item.trim()));
    const dataClaws = parseClaws(dataArrArr);
    const clawCombinations = calcClawsCombinations(dataClaws);
    const winningCombinations = clawCombinations.filter((item) => item.length !== 0);
    const totPrice = winningCombinations.reduce((acc, item) => acc + item[0].Price, 0);
    console.log(winningCombinations);
    console.log(totPrice); // Correct answer 36250
}

function calcClawsCombinations(clawsArr) {
    const combinations = [];
    clawsArr.forEach((claw) => combinations.push(calcClawCombinations(claw)));
    return combinations;
}

function calcClawCombinations({Buttons, Price}) {
    let combinations = {};
    combinations.X = calcCombinations(Buttons[0].X, Buttons[1].X, Price.X);
    combinations.Y = calcCombinations(Buttons[0].Y, Buttons[1].Y, Price.Y);
    // console.log("combinations before filter", combinations);
    combinations.X = combinations.X.filter((combination) => combIncludes(combinations.Y, combination));
    combinations.Y = combinations.Y.filter((combination) => combIncludes(combinations.X, combination));
    // Extract the lowest price combination
    const result = combinations.X.sort((a, b) => a.Price - b.Price)[0];
    if(typeof result === "undefined" )
        return [];

    return [result];
}

function combIncludes(combArr, combination) {
    for(let comb of combArr) {
        if((combination.A === comb.A) && (combination.B === comb.B))
            return true;
    }
    return false;
}

function calcCombinations(a, b, res) {
    const combinations = [];
    const maxA = Math.floor(res/a);

    for(let aPress=0; aPress<=maxA; aPress++){
        if((res - a*aPress) % b === 0) {
            const bPress = (res - a*aPress)/b;
            combinations.push({A: aPress, B: bPress, Price: BUTTON_A_PRICE*aPress + BUTTON_B_PRICE*bPress})
        }
    }

    return combinations;
}

function parseClaws(arr) {
    const parsedArr = [];

    // Parse Button offsets
    for(let i=0; i<arr.length; i++) {
        if(arr[i][0] == '') {
            continue;
        }
        parsedArr.push({Name: arr[i][0], X: Number(arr[i][1].split(/[+=]/)[1]), Y: Number(arr[i][2].split(/[+=]/)[1])})
    }

    //Create Claws array
    const claws = [];
    for(let i=0; i<parsedArr.length;) {
        const claw = {
            Buttons: [],
            Price: {}
        };
        while(parsedArr[i].Name != 'Prize') {
            claw.Buttons.push(parsedArr[i++]);
        }
        claw.Price = {X: parsedArr[i].X, Y: parsedArr[i].Y};
        i++;
        claws.push(claw);
    }

    return claws;
}
