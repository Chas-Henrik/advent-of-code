
// Include fs module
const fs = require('fs');

let data = fs.readFileSync('./data/list5.txt', 'utf8');
const FIND_CORRECT_PAGES = false;
let globalSwapCnt = 0;

parseDay5Data();

function parseDay5Data() {
    let rulesObj = {};
    const linesArr = data.split('\r\n');
    const rulesArr = linesArr.filter(line => line.includes('|'));
    const rulesArrArr = rulesArr.map(rule => rule.split('|').map(num => parseInt(num)));
    rulesArrArr.forEach(element => {
        (rulesObj[element[0]]===undefined) ? rulesObj[element[0]] = [element[1]] : rulesObj[element[0]].push(element[1]);
    });
    const pagesArr = linesArr.filter(line => !line.includes('|') && line !== '');
    const pagesArrArr = pagesArr.map(line => line.split(',').map(num => parseInt(num)));

    if(FIND_CORRECT_PAGES) {
        const correctPagesArrArr = pagesArrArr.filter((update) => isCorrectlyOrderedUpdate(update, rulesObj));
        const sum = correctPagesArrArr.reduce((acc, update) => acc + getMiddle(update), 0);
        console.log("sum", sum); // Correct answer: 6034
        return;
    } else {
        const incorrectPagesArrArr = pagesArrArr.filter((update) => !isCorrectlyOrderedUpdate(update, rulesObj));
        const correctPagesArrArr = incorrectPagesArrArr.map((update) => fixIncorrectOrder2(update, rulesObj));
        // console.log("correctPagesArrArr", correctPagesArrArr);
        const isCorrect = correctPagesArrArr.every((update) => isCorrectlyOrderedUpdate(update, rulesObj));
        console.log("isCorrect", isCorrect);
        const sum = correctPagesArrArr.reduce((acc, update) => acc + getMiddle(update), 0);
        console.log("correctPagesArrArr.length", correctPagesArrArr.length);
        console.log("globalSwapCnt", globalSwapCnt);
        console.log("sum", sum); // Correct answer: 6305
    }
}

function fixIncorrectOrder2(update, rules) {
    let swapCnt = 0;
    do {
        swapCnt = 0;
        for(let i=update.length-2; i>=0; i--) {
            const rulesArr = rules[update[i+1]];
            if(rulesArr.includes(update[i])) {
                swapElement(update, i, i+1)
                swapCnt++;
                globalSwapCnt++;
            }
        }
    } while(swapCnt > 0);

    return update;
}

function fixIncorrectOrder(update, rules) {
    for(let i = 0; i < update.length - 1; i++) {
        const rulesArr = rules[update[i]];
        //Check that all rule elements are after the current element in the array
        for(let ruleElement of rulesArr) {
            const idx = update.findIndex((val) => val === ruleElement);
            if(idx >= 0 && idx < i) {
                moveElement(update, idx, i+1); // Move the element to after the current element
                i--; // i drops one since idx element in front is removed
            }
        }
    }
    return update;
}

function swapElement(arr, from, to) {
    const temp = arr[from];
    arr[from] = arr[to];
    arr[to] = temp;
}

function moveElement(arr, from, to) {
    const removedElement = arr.splice(from, 1)[0];
    arr.splice(to, 0, removedElement);
}

function moveElementToEnd(arr, from) {
    const removedElement = arr.splice(from, 1)[0];
    arr.push(removedElement);
}


function isCorrectlyOrderedUpdate(update, rules) {
    for(let i = 0; i < update.length - 1; i++) {
        const rulesArr = rules[update[i]];
        //Check that all rule elements are after the current element in the array
        const isCorrect = rulesArr.every( (element) => {
            let idx = update.findIndex((val) => val === element);
            return (idx === -1 || idx >= i); // Rule element is not found or after current element
        });

        if(!isCorrect ) {
            return false;
        }
    }
    return true;
}

function getMiddle(page) {
    if(page.length === 0) return 0;
    const middleIndex = Math.floor(page.length / 2);
    return page[middleIndex];
}

