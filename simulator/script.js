const generatedDeck = Object.keys(cardsBySuit).map(suit => {
    const cardsOnTheSuit = cardsBySuit[suit].map(cardNumber => {
        const cardOnPosition = cardsOnPosition[`${cardNumber}-${suit}`];
        if (cardOnPosition) return { ...cardOnPosition, cardNumber, suit, defined: true }
        else return false //{ cardNumber, suit, defined: false }
    })
    return cardsOnTheSuit;
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle…
    while (currentIndex) {
        // Pick a remaining element…
        randomIndex = Math.floor(Math.random() * currentIndex--);
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const deckFlat = generatedDeck.flat().filter(a => a);
const doShuffle = shuffle.bind(this, deckFlat)
doShuffle();
doShuffle();
doShuffle();

const generateCards = () => deckFlat.map((card, positionOnDeck) => {
    const cardEl = document.createElement('div');
    const numberSuitEl = document.createElement('span');
    const textBoxEl = document.createElement('div');
    const cardTitleEl = document.createElement('div');
    const cardCostEl = document.createElement('div');
    const monsterStatusEl = document.createElement('div');
    const imgEl = document.createElement('img');
    const hoverArea = document.createElement('div');

    // hover element

    cardEl.classList.add('card')
    numberSuitEl.classList.add('number-suit')
    textBoxEl.classList.add('text-box')
    cardTitleEl.classList.add('card-title')
    cardCostEl.classList.add('card-cost')
    monsterStatusEl.classList.add('monster-status')
    hoverArea.classList.add('hover-area')

    cardEl.dataset.suit = card.suit;
    cardEl.dataset.number = card.cardNumber;
    cardEl.dataset.cardId = card.id;

    cardEl.draggable = true;
    cardEl.addEventListener("dragstart", (ev) => {
        ev.dataTransfer.setData("position", positionOnDeck);
        document.body.classList.add('dragging');
        //maybe prevent default to not show the faded image
        ev.dataTransfer.effectAllowed = "move";
    });

    cardEl.addEventListener("dragend", () => {
        document.body.classList.remove('dragging');
    });

    //stacking
    // cardEl.addEventListener("drop", (ev) => ev.preventDefault())

    cardEl.style.setProperty('--position', positionOnDeck);
    cardEl.style.setProperty('--img-url', `url(${card.img ?? 'WIP.png'})`)
    cardEl.style.setProperty('--reduce-font', `${card.reduceFont ?? '0rem'}`)
    cardEl.style.setProperty('--img-color', cssImgColors[cardColors[SUITS_COLORS[card.suit]]])
    cardEl.style.setProperty('--card-color', cssCardColors[cardColors[SUITS_COLORS[card.suit]]])
    cardEl.style.setProperty('--img-margin', card.cardMargin ?? 'unset');
    numberSuitEl.innerHTML = `${card.cardNumber} ${![SUITS.RED, SUITS.BLACK].includes(card.suit) ? symbols[card.suit] : ''}`
    cardCostEl.innerHTML = card.cost ?? '';
    cardTitleEl.innerHTML = card[`title${language}`] ?? '';
    textBoxEl.innerHTML = card[`text${language}`]?.replace(symbols.currentSuit, symbols[card.suit]) ?? '';
    monsterStatusEl.innerHTML = card.monsterStatus ?? '';

    //add highlight event;
    cardEl.addEventListener('mouseover', () => {
        if (!cardEl.parentElement.classList.contains('deck')) {
            const clone = cardEl.cloneNode(true);
            highlight.firstChild && highlight.removeChild(highlight.firstChild);
            highlight.appendChild(clone);
        }
    })


    const lines = {
        corte: document.createElement('div'),
        sangria: document.createElement('div'),
        full: document.createElement('div')
    }
    lines.corte.classList.add('corte');
    lines.sangria.classList.add('sangria');
    lines.full.classList.add('full');

    cardEl.append(numberSuitEl, ...Object.values(lines).map(line => {
        line.classList.add('line-box');
        return line;
    }));

    if (card.monsterStatus) cardEl.appendChild(monsterStatusEl);
    if (card.cardNumber == 'JOKER') {
        numberSuitEl.classList.add('joker');
        cardEl.classList.add('rare');
    };
    if (!card.defined) {
        numberSuitEl.classList.add('not-def');
    } else {
        cardEl.append(textBoxEl, cardTitleEl, cardCostEl, imgEl, hoverArea);
    }
    return cardEl;
})

const cardElements = generateCards();

// const fundoEl = document.createElement('div');
// const imgEl = document.createElement('img');
// const lines = {
//     corte: document.createElement('div'),
//     sangria: document.createElement('div'),
//     full: document.createElement('div')
// }
// lines.corte.classList.add('corte');
// lines.sangria.classList.add('sangria');
// lines.full.classList.add('full');
// fundoEl.style.setProperty('--img-color', cardColors.BLACK)
// fundoEl.style.setProperty('--card-color', cssCardColors.BLACK)
// fundoEl.style.setProperty('--img-url', `url(simulator-bg.png)`);
// imgEl.style = `width: 100%; height: 100%; background-size: cover; mask-size:cover; top:0px; left: 0px`;
// fundoEl.classList.add('card')
// fundoEl.append(imgEl, ...Object.values(lines).map(line => {
//     line.classList.add('line-box');
//     return line;
// }))
// cardElements.unshift(fundoEl)

const field = document.getElementById("field");
const hand = document.getElementById("hand");
const highlight = document.getElementById("highlight");
const deck = document.getElementById("deck");
const discardPile = document.getElementById("discard");
const opfield = document.getElementById("opfield");
const discardView = document.getElementById("discard-view");

let viewShowingTimeout = null;

discardPile.addEventListener('click', () => {
    discardView.style.visibility = 'unset';
    discardView.innerHTML = '';
    discardView.append(...Array.from(discardPile.children).map(cardEl => cardEl.cloneNode(true)))
    viewShowingTimeout = setTimeout(() => {
        discardView.style.visibility = 'hidden';
    }, 5000);
})

discardView.addEventListener('mouseleave', () => {
    discardView.style.visibility = 'hidden';

})

discardView.addEventListener('mouseenter', () => {
    clearTimeout(viewShowingTimeout);
})

/// use this on webSocket
//maybe use this on diferent file
const getCardInfo = (cardEl) => {
    const cardId = cardEl.dataset.cardId;
    const cardInfo = existingCards[cardId];
    return cardInfo;
}
const playerActions = {
    play: (cardEl) => {
        const cardInfo = getCardInfo(cardEl);
        console.log('PLAYED:', cardInfo)
        // if (!isNaN(cardInfo.cost)) {
        //     const toDiscard = Array.from(deck.children).slice(-1 * cardInfo.cost);

        //     //maybe do this on an interval;
        //     toDiscard.forEach(cardToDiscard => {
        //         cardToDiscard.style.setProperty('--position', Number(discardPile.lastChild?.style.getPropertyValue('--position') || 0) + 1);
        //         discardPile.append(cardToDiscard);
        //     })
        // }
    },
    discard: (cardEl) => {
        const cardInfo = getCardInfo(cardEl);
        console.log('DISCARDED:', cardInfo);
    }
    //stack, showHand, heal
    //add option to get from discard to hand

    //add buton to discard by card cost on right click, it shoud has, put on filed, payCost, grabToHand
    //not pay cost on grave

    //add right click options
}



const dropHandler = (ev) => {
    ev.preventDefault();
    const target = ev.currentTarget;
    const data = ev.dataTransfer.getData("position");
    const cardEl = cardElements[data];
    cardEl.style.setProperty('--position', Number(target.lastChild?.style.getPropertyValue('--position') || 0) + 1)
    target.appendChild(cardEl);
    if (target === field) {
        playerActions.play(cardEl);
    }
    //add play on opfield action too, leave card without rotation if it is on op field;
    if (target === discardPile) {
        playerActions.discard(cardEl);
    }
    ev.target.classList.remove('drag-over');
    document.body.classList.remove('dragging');
}

const dragOverHandler = (ev) => {
    ev.preventDefault();
    ev.target.classList.add('drag-over')
    ev.dataTransfer.dropEffect = "move";
}

const dragLeaveHandler = (ev) => {
    ev.preventDefault();
    ev.target.classList.remove('drag-over')
}

const dragAndDropElements = [field, hand, discardPile, opfield]
dragAndDropElements.forEach(el => {
    el.addEventListener("dragover", dragOverHandler);
    el.addEventListener("drop", dropHandler);
    el.addEventListener("dragleave", dragLeaveHandler);
})


const getCardCSSData = (x, numberOfPoints) => {
    const middle = Math.ceil(numberOfPoints / 2)
    const isPair = numberOfPoints % 2 == 0;
    const dist = (x + 1) - middle - (isPair && x >= middle ? 1 : 0);
    const multiplierDeg = 0.01 * dist ** 2;
    const multiplierY = 0.01 * dist ** 2;

    if (dist == 0) return { deg: 0, y: 0 };
    return {
        deg: Number(15 * multiplierDeg).toFixed(2) * (dist < 1 ? -1 : 1),
        y: Number(100 * multiplierY).toFixed(2)
    }
};

const handObserver = function (mutationList, observer) {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            const childArray = Array.from(hand.children);
            const setCSSVariables = (valuesObj = { x: 0, y: 0, deg: 0 }, card) => {
                card.style.setProperty('--y', `${valuesObj.y}%`);
                card.style.setProperty('--deg', `${valuesObj.deg}deg`);
            }

            const forEachFunc = (card, i) => {
                const valuesObj = {
                    y: getCardCSSData(i, childArray.length).y,
                    deg: getCardCSSData(i, childArray.length).deg,
                }
                setCSSVariables(valuesObj, card)
            }
            childArray.forEach(forEachFunc);
        }
    }
};

const observer = new MutationObserver(handObserver);
observer.observe(hand, { childList: true });
deck.append(...cardElements);
//bottom of list, is first cards on deck
hand.append(...cardElements.slice(-5));


// do a class to print this later, and add all the cards to that, non shuffling and removing the field stuff;
// const printVersion = () => {
//     document.body.innerHTML = '';
//     document.body.append(...cardElements);
// }

// printVersion();

// add a placeholder on the right of the field to be able to always add cards to it; make it wrap too, maybe zoom out with to much cards

// printVersion();

// do drag and drop highlights
// do onAnimationEnd to discard card by card, trigger animation on chain effects;


// do opponent zones, field, discard, deck, hand
// do buttons for, swap player, show hand, undo maybe, draw, other actions besides drag
// when click on op card highlight it for him
// may make pay cost automatically
// option to check discard pile and to add things there to hand
// option to heal
//add game flow

// maybe to respond need to stack, it would be really helpful to see

// maybe use only one field, but oponnets cards get aligned to top, and if a card-stack has multiple players cards it centers itself

//add deck count abovedeck

//IMPORTANT, use only the card_back on opdeck and stuff, we only need to now the card count, the other things the server can handle


//add mock here just to see styles, then finish with the net code

//@TODO add card owner property, you can only mess with own cards