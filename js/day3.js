
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
        parseDay3Data(data);
    });

    return fileData;
}

function parseDay3Data(data) {
    const doRegex = /do\(\)|don't\(\)|mul\(\d+,\d+\)/g;
    const found = data.match(doRegex);
    // console.log(found);
    let enabled = true;
    const total = found.reduce((acc, item) => {
        switch(item) { 
            case "do()":
                enabled = true;
                break;
            case "don't()":
                enabled = false;
                break;
            default:
                if (enabled) {
                    const mulRegex = /\d+,\d+/g;
                    const numbers = item.match(mulRegex)[0].split(',');
                    console.log(numbers);
                    return acc + parseInt(numbers[0]) * parseInt(numbers[1]);
                }
        }
        return acc;
    },0);

    console.log(total); // Correct Answer: 79845780 & 157621318 
}

function mul(a, b) {
    return a * b;
}

readFileData('./data/list3.txt');
