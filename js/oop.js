
// Include fs module
const fs = require('fs');

const SUITES = ['S', 'H', 'D', 'C'];
const API_CARD_VALUE = ['', '' , '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
const CARD_VALUE = ['', '' , '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


async function getSvgImage(url) {
    try {
        const response = await fetch(url, { mode: 'no-cors' });
        if(!response.ok) {
            throw new Error("Fetch response not ok");
        }
        return await response.text();
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

async function getCards() {
    for(let i=0; i<4; i++) {
        for(let j=2; j<15; j++) {
            const url = `https://deckofcardsapi.com/static/img/${API_CARD_VALUE[j]}${SUITES[i]}.svg`;
            console.log('Reading : ', url);
            const data = await getSvgImage(url);
            if(data != null) {
                const fd = fs.openSync(`./cards/${CARD_VALUE[j]}${SUITES[i]}.svg`, 'w');
                fs.writeFileSync(fd, data);
            }
        }
    }
}

getCards();

