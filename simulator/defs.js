const cardColors = {
    RED: 'RED',
    BLACK: 'BLACK',
    GREEN: 'GREEN',
    BLUE: 'BLUE',
}

const cssCardColors = {
    [cardColors.RED]: `darkred`,
    [cardColors.BLACK]: `black`,
    [cardColors.GREEN]: `darkgreen`,
    [cardColors.BLUE]: `darkblue`,
    //img-color rgb(90, 0, 0);
}

const cssImgColors = {
    [cardColors.RED]: `rgb(90, 0, 0)`,
    [cardColors.BLACK]: `black`,
    [cardColors.GREEN]: `darkgreen`,
    [cardColors.BLUE]: `darkblue`,
    //img-color rgb(90, 0, 0);
}

const SUITS = {
    CLUBS: "clubs",
    DIAMONDS: "diamonds",
    HEARTS: "hearts",
    SPADES: "spades",
    RED: "red",
    BLACK: "black",
};

//as magic gathering info 
// spades is like blue
// clubs is like red
// HERE TO ADD 4 COLOR DECK
const SUITS_COLORS = {
    [SUITS.CLUBS]: cardColors.BLACK,
    [SUITS.SPADES]: cardColors.BLACK,
    [SUITS.BLACK]: cardColors.BLACK,

    [SUITS.HEARTS]: cardColors.RED,
    [SUITS.DIAMONDS]: cardColors.RED,
    [SUITS.RED]: cardColors.RED,

    // 4COLOR VARIANT
    // [SUITS.CLUBS]: cardColors.GREEN,
    // [SUITS.DIAMONDS]: cardColors.BLUE,

}

const symbols = {
    instantCast: `&#991;`, //https://www.utf8icons.com/character/991/greek-small-letter-koppa
    onceAturn: '&#8634;', //https://www.utf8icons.com/character/8634/anticlockwise-open-circle-arrow
    triggerOnPlay: '&#9166;', //https://www.utf8icons.com/character/9166/return-symbol
    triggerOnDiscard: '&#9939', // https://www.utf8icons.com/character/9939/chains
    triggerOnFlip: '', // add rules for playing cards face-down
    triggerOnAttack: '&#9876;', //https://www.utf8icons.com/character/9876/crossed-swords
    ongoingEffect: '&#9733;',//https://www.utf8icons.com/character/9733/black-star black star, aura, ongoing effect;
    attachCard: '&#9167;', // https://www.utf8icons.com/character/9167/eject-symbol
    allSuits: `&#9824;/&#9827;/&#9830;/&#9829;`, // all suits symbol
    [SUITS.SPADES]: '&#9824;',
    [SUITS.CLUBS]: '&#9827;',
    [SUITS.DIAMONDS]: '&#9830;',
    [SUITS.HEARTS]: '&#9829;',
    [SUITS.RED]: `&#9830;/&#9829;`,
    [SUITS.BLACK]: `&#9824;/&#9827;`,
    currentSuit: 'CURRENT_SUIT',

    //https://www.utf8icons.com/character/9752/shamrock luck clover symbol;
    //https://www.utf8icons.com/character/9733/black-star black star, aura, ongoing effect;
    //https://www.utf8icons.com/character/9856/die-face-1
    //https://www.utf8icons.com/character/9857/die-face-2
    //https://www.utf8icons.com/character/9858/die-face-3
    //https://www.utf8icons.com/character/9859/die-face-4
    //https://www.utf8icons.com/character/9860/die-face-5
    //https://www.utf8icons.com/character/9861/die-face-6
}

//HEAL MEANS shuffle x cards of grave to your deck
const existingCards = {
    counterSpell: {
        cost: 3,
        textEN: `<b>${symbols.instantCast} :</b> Cancel a card`,
        textPT: `<b>${symbols.instantCast} :</b> Cancele uma carta`, // <b>${symbols.currentSuit}</b> 
        img: 'counter-spell.png',
        titleEN: 'Counter-Spell',
        titlePT: 'Contra-Magia',
    },
    darkGrimoire: {
        cost: 5,
        textEN: `<b>${symbols.instantCast} :</b> Draw 2 cards.`,
        textPT: `<b>${symbols.instantCast} :</b> Compre 2 cartas.`,
        img: 'book.png',
        titleEN: 'Dark Grimoire',
        titlePT: 'Grimorio Obscuro',
    },
    instantDeath: {
        cost: 5,
        textEN: `<b>${symbols.instantCast} :</b> Kill a monster card.`,
        textPT: `<b>${symbols.instantCast} :</b> Mate uma carta de monstro.`,
        img: 'death-pact.png',
        titleEN: 'Instant Death',
        titlePT: 'Morte Instantânea',
    },
    darkFire: {
        cost: 4,
        textEN: `<b>${symbols.instantCast} :</b> Deal 7 dammage to your opponent.`,
        textPT: `<b>${symbols.instantCast} :</b> Cause 7 de dano ao seu oponente.`,
        img: 'meteor.png',
        titleEN: 'Dark Fire',
        titlePT: 'Fogo Obscuro',
    },
    shock: {
        cost: 'X',
        textEN: `<b>${symbols.instantCast} :</b> Copy the las played action card on this turn (X is the copied's card cost).`,
        textPT: `<b>${symbols.instantCast} :</b> Copia e ultima carta de ação jogada neste turno (X é o custo da carta copiada).`, //<b>${symbols.currentSuit}</b> 
        img: 'shock.png',
        titleEN: 'Shock',
        titlePT: 'Choque',
    },
    explosion: {
        cost: 'X',
        textEN: `<b>${symbols.instantCast} :</b> Deal 2X dammage to a monster card.`,
        textPT: `<b>${symbols.instantCast} :</b> Cause 2X de dano a uma carta de monstro.`,
        img: 'explosion.png',
        titleEN: 'Explosion',
        titlePT: 'Explosão',
    },
    soulRelease: {
        cost: 7,
        textEN: `<b>${symbols.instantCast} :</b> Add a 3 cards from you discard pile to your hand, then you remove [Soul Release] from the game.`,
        textPT: `<b>${symbols.instantCast} :</b> Adicione 3 cards de sua pilha de descartes a sua mão, e entao remova [Liberação da Alma] do jogo.`,
        img: 'soul-release.png',
        titleEN: 'Soul Release',
        titlePT: 'Liberação da Alma',
    },
    healingFlame: {
        cost: 0,
        textEN: `<b>${symbols.instantCast} :</b> Heal 5.`,
        textPT: `<b>${symbols.instantCast} :</b> Cure 5.`,
        img: 'heal.png',
        cardMargin: '1.5rem',
        titleEN: 'Healing Flame',
        titlePT: 'Fogo curativo',
    },
    defend: {
        cost: 0,
        textEN: `<b>${symbols.instantCast} :</b> Cancel an attack.`,
        textPT: `<b>${symbols.instantCast} :</b> Cancele um ataque.`,
        img: 'block.png',
        titleEN: 'Defend!',
        titlePT: 'Defenda!',
    },
    owlChimera: {
        cost: 2,
        textEN: `<b>${symbols.onceAturn} :</b> You may draw a card.`,
        textPT: `<b>${symbols.onceAturn} :</b> Você pode, comprar uma carta.`, // maybe search?
        img: 'owl-chimera.png',
        monsterStatus: 1,
        titleEN: 'Owl-Chimera',
        titlePT: 'Coruja-Chimera',
    },
    allSeeingEye: {
        cost: 3,
        textEN: `<b>${symbols.instantCast} :</b> Look at your opponents hand.`,
        textPT: `<b>${symbols.instantCast} :</b> Olha a mão de seu oponente.`,
        img: 'eye.png',
        titleEN: 'All Seeing Eye',
        titlePT: 'Olho que tudo vê',
    },
    skeletonKid: {
        cost: 1,
        textEN: `<b>${symbols.triggerOnDiscard} :</b> adicione uma carta do descarte à sua mão.`,
        textPT: `<b>${symbols.triggerOnDiscard} :</b> add a card from the discard to your hand.`, //name a card, show hand and discard it
        img: 'skeleKid.png',
        titleEN: 'Skeleton Kid',
        titlePT: 'Esqueleto Infante',
        monsterStatus: '2'
    },
    goatSage: {
        cost: 3,
        textEN: `<b>${symbols.triggerOnAttack} :</b> your opponent discards 1 card at random.`,
        textPT: `<b>${symbols.triggerOnAttack} :</b> Seu oponente descarta 1 carta aleatorioamente.`, //name a card, show hand and discard it
        img: 'goatsage.png',
        titleEN: 'Goat Sage',
        titlePT: 'Bode Sábio',
        monsterStatus: '2'
    },
    birdMage: {
        cost: 5,
        textEN: `<b>${symbols.triggerOnPlay} :</b> Return a monster to the hand of it's owner.`,
        textPT: `<b>${symbols.triggerOnPlay} :</b> Retorne um monstro para mão de seu dono.`, //name a card, show hand and discard it
        titleEN: 'Bird Mage',
        titlePT: 'Pássaro Mago',
        img: 'birdmage.png',
        monsterStatus: '4',
        cardMargin: '3rem'
    },
    royalWitch: {
        cost: 6,
        textEN: `<b>${symbols.onceAturn} :</b> You may cancel a action card.`,
        textPT: `<b>${symbols.onceAturn} :</b> Você pode cancelar uma carta de ação.`, //name a card, show hand and discard it
        img: 'Queen.png',
        titleEN: 'Royal Witch',
        titlePT: 'Bruxa Real',
        monsterStatus: '6'
    },
    skeletonMage: {
        cost: 7,
        textEN: `<b>${symbols.onceAturn} :</b> Deal 2 damage to a monster OR your opponent.`,
        textPT: `<b>${symbols.onceAturn} :</b> Cause 2 de dano à uma carta de monstro OU ao seu oponente.`,
        img: 'skelemage.png',
        titleEN: 'Skeleton Mage',
        titlePT: 'Esqueleto Mago',
        monsterStatus: '5'
    },
    skeletonKing: {
        cost: 7,
        //maybe do the mecanic of the most include
        //Braces to card names
        textEN: `
            Imunity to ${symbols[SUITS.CLUBS]} <br/>
            <b>${symbols.onceAturn} :</b> Summon a [Skeleton] card from your discard pile.
        `,
        textPT: `
            Imunidade à ${symbols[SUITS.CLUBS]} <br/>
            <b>${symbols.onceAturn} :</b> Invoque uma carta [Esqueleto] de sua pilha de descartes.
        `,
        img: 'skeleking.png',
        titleEN: 'Skeleton King',
        titlePT: 'Esqueleto Rei',
        monsterStatus: '7'
    },
    skeletonWarrior: {
        cost: 3,
        //italic to no-eff textEN
        textEN: `<i>"A experienced warrior, vassal of the king"</i>`,
        textPT: `<i>"Um guerreiro experiente, vassalo do rei"</i>`,
        img: 'skelewarrior.png',
        titleEN: 'Skeleton Warrior',
        titlePT: 'Esqueleto Guerreiro',
        monsterStatus: '3'
    },
    greedyGoblin: {
        cost: 0,
        textEN: `<b>${symbols.triggerOnDiscard} :</b> Draw 2 cards.`,
        textPT: `<b>${symbols.triggerOnDiscard} :</b> Compre 2 cartas.`,
        img: 'loot-goblin.png',
        titleEN: 'Greedy Goblin',
        titlePT: 'Goblin Ganancioso',
        cardMargin: '3rem',
        monsterStatus: '2'
    },
    goblinKing: {
        cost: 6,
        textEN: `<b>${symbols.onceAturn} :</b> Instead of conducting your normal draw, you may add a card from your discard pile to your hand.`,
        textPT: `<b>${symbols.onceAturn} :</b> Ao invés de conduzir sua compra normalmete, você pode adicionar uma carta de sua pilha de descartes à sua mão.`,
        img: 'goblinKing.png',
        titleEN: 'King Goblin',
        titlePT: 'Rei Goblin',
        // cardMargin: '3rem',
        monsterStatus: '4'
    },
    loyalDefender: {
        cost: 2,
        textEN: `
            <b>${symbols.onceAturn} :</b> This card may survive any attack <br>
            <b>${symbols.ongoingEffect}</b> Your opponent can't attack any other monster card.
            `,
        textPT: `
            <b>${symbols.onceAturn} :</b> Essa carta pode sobreviver à qualquer ataque <br>
            <b>${symbols.ongoingEffect}</b> Seu oponente não pode atacar outra carta de monstro.
            `,
        img: 'loyal-defender.png',
        titleEN: 'Loyal Defender',
        titlePT: 'Defensor Leal',
        // cardMargin: '3rem',
        monsterStatus: '2'
    },
    swordOftheWeak: {
        cost: 2,
        textEN: `
            <b>${symbols.attachCard} :</b> Can only be attached on monsters with prowess 3 or lower; <br>
            <b>${symbols.ongoingEffect} :</b> This card has +3 prowess.
        `,
        textPT: `
            <b>${symbols.attachCard} :</b> Só pode ser acoplado em monstro com proesa 3 ou menor; <br>
            <b>${symbols.ongoingEffect} :</b> Essa carta possui +3 de proesa.
        `,
        img: 'sword.png',
        titleEN: 'Sword of the Weak',
        titlePT: 'Espada dos Fracos',
        cardMargin: '3rem',
    },
    cowPriest: {
        cost: 5,
        textEN: `<b>${symbols.onceAturn} :</b> Heal 2`,
        textPT: `<b>${symbols.onceAturn} :</b> Cure 2`,
        img: 'cow.png',
        titleEN: 'Bull Helper',
        titlePT: 'Boi Ajudante',
        // cardMargin: '3rem',
        monsterStatus: '5'
    },
    gambler: {
        cost: 3,
        textEN: `
        <b>${symbols.ongoingEffect} :</b> Can't attack or be attacked<br/>
        <b>${symbols.ongoingEffect} :</b> On the start of your turn,
        Roll a 6-sided dice and apply:
        1 - Kill this card;
        2-5: Take 1 damage;
        6: Steal an opponents monster.
        `,
        textPT: `
        <b>${symbols.ongoingEffect} :</b> Não pode atacar ou ser atacado<br/>
        <b>${symbols.ongoingEffect} :</b> No inicio de seu turno,
        Role um dado de 6 lados e aplique:
        1 - Mate essa carta;
        2-5: Tome 1 de dano;
        6: Roube uma carta de monstro de seu oponente.
        `,
        img: 'gambler.png',
        titleEN: 'The Gambler',
        titlePT: 'O Apostador',
        monsterStatus: '1',
        reduceFont: '0.1rem'
    },
    angel: {
        cost: 3,
        textEN: `
        <b>${symbols.triggerOnPlay} / ${symbols.triggerOnDiscard} :</b> Play a monster (other than an Angel) from your discard paying half it's cost (rounded-up).
        `,
        textPT: `
        <b>${symbols.triggerOnPlay} / ${symbols.triggerOnDiscard} :</b> Jogue um monstro (que não seja um Anjo) de sua pilha de descarte pagando metade de seu custo (arredondado pra cima).
        `,
        img: 'angel.png',
        titleEN: 'The Angel',
        titlePT: 'O Anjo',
        monsterStatus: '4'
    },
    whirlwind: {
        cost: 10,
        textEN: `
        Imunity to ${symbols.allSuits} <br/>
        <b>${symbols.instantCast} :</b> Destroy all monsters cards on the field.
        `,
        textPT: `
        Imunidade à ${symbols.allSuits} <br/>
        <b>${symbols.instantCast} :</b> Destrua todas as cartas de monstro no campo.
        `,
        img: 'whirlwind.png',
        titleEN: 'Whirlwind',
        titlePT: 'Tornado',
    }// be an imune monster with 10
};

const existingCardsWithId = new Proxy(existingCards, {
    get: (target, prop) => {
        return { ...target[prop], id: prop }
    }
})

const suitCards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const cardsBySuit = {
    [SUITS.SPADES]: [...suitCards],
    [SUITS.CLUBS]: [...suitCards],
    [SUITS.DIAMONDS]: [...suitCards],
    [SUITS.HEARTS]: [...suitCards],
    [SUITS.RED]: ['JOKER'],
    [SUITS.BLACK]: ['JOKER']
};

//imuniy meeans can't be affected by card of that suit, even on hand, so you can't steal it

const cardsOnPosition = {
    //flip monsters on spades
    //equips on hearts
    //SEAL A CARD, silence
    //maybe we can vary which card is countering here and add all to spades
    [`A-${SUITS.SPADES}`]: existingCardsWithId.counterSpell,
    [`2-${SUITS.SPADES}`]: existingCardsWithId.counterSpell,
    [`3-${SUITS.SPADES}`]: existingCardsWithId.counterSpell,
    [`4-${SUITS.SPADES}`]: existingCardsWithId.shock,
    [`5-${SUITS.SPADES}`]: existingCardsWithId.shock,
    [`6-${SUITS.SPADES}`]: existingCardsWithId.skeletonKid, // discard cards
    [`7-${SUITS.SPADES}`]: existingCardsWithId.skeletonKid,
    [`8-${SUITS.SPADES}`]: existingCardsWithId.skeletonKid,
    [`9-${SUITS.SPADES}`]: existingCardsWithId.goatSage,
    [`10-${SUITS.SPADES}`]: existingCardsWithId.goatSage,
    [`J-${SUITS.SPADES}`]: existingCardsWithId.birdMage,
    [`Q-${SUITS.SPADES}`]: existingCardsWithId.birdMage,
    [`K-${SUITS.SPADES}`]: existingCardsWithId.royalWitch,

    [`A-${SUITS.CLUBS}`]: existingCardsWithId.explosion,
    [`2-${SUITS.CLUBS}`]: existingCardsWithId.explosion,
    [`3-${SUITS.CLUBS}`]: existingCardsWithId.instantDeath,
    [`4-${SUITS.CLUBS}`]: existingCardsWithId.instantDeath,
    [`5-${SUITS.CLUBS}`]: existingCardsWithId.skeletonWarrior,
    [`6-${SUITS.CLUBS}`]: existingCardsWithId.skeletonWarrior,
    [`7-${SUITS.CLUBS}`]: existingCardsWithId.skeletonWarrior,
    [`8-${SUITS.CLUBS}`]: existingCardsWithId.darkFire,
    [`9-${SUITS.CLUBS}`]: existingCardsWithId.darkFire,
    [`10-${SUITS.CLUBS}`]: existingCardsWithId.darkFire,
    [`J-${SUITS.CLUBS}`]: existingCardsWithId.skeletonMage,
    [`Q-${SUITS.CLUBS}`]: existingCardsWithId.skeletonMage,
    [`K-${SUITS.CLUBS}`]: existingCardsWithId.skeletonKing,

    [`3-${SUITS.HEARTS}`]: existingCardsWithId.healingFlame,
    [`A-${SUITS.HEARTS}`]: existingCardsWithId.loyalDefender,
    [`2-${SUITS.HEARTS}`]: existingCardsWithId.loyalDefender,
    [`3-${SUITS.HEARTS}`]: existingCardsWithId.loyalDefender,
    [`4-${SUITS.HEARTS}`]: existingCardsWithId.healingFlame,
    [`5-${SUITS.HEARTS}`]: existingCardsWithId.healingFlame,
    [`6-${SUITS.HEARTS}`]: existingCardsWithId.defend,
    [`7-${SUITS.HEARTS}`]: existingCardsWithId.defend,
    [`8-${SUITS.HEARTS}`]: existingCardsWithId.defend,
    [`9-${SUITS.HEARTS}`]: existingCardsWithId.swordOftheWeak,
    [`10-${SUITS.HEARTS}`]: existingCardsWithId.swordOftheWeak,
    [`J-${SUITS.HEARTS}`]: existingCardsWithId.angel,
    [`Q-${SUITS.HEARTS}`]: existingCardsWithId.angel,
    [`K-${SUITS.HEARTS}`]: existingCardsWithId.cowPriest,

    [`A-${SUITS.DIAMONDS}`]: existingCardsWithId.darkGrimoire,
    [`2-${SUITS.DIAMONDS}`]: existingCardsWithId.darkGrimoire,
    [`3-${SUITS.DIAMONDS}`]: existingCardsWithId.darkGrimoire,
    [`4-${SUITS.DIAMONDS}`]: existingCardsWithId.owlChimera,
    [`5-${SUITS.DIAMONDS}`]: existingCardsWithId.owlChimera,
    [`6-${SUITS.DIAMONDS}`]: existingCardsWithId.allSeeingEye,
    [`7-${SUITS.DIAMONDS}`]: existingCardsWithId.allSeeingEye,
    [`8-${SUITS.DIAMONDS}`]: existingCardsWithId.greedyGoblin,
    [`9-${SUITS.DIAMONDS}`]: existingCardsWithId.greedyGoblin,
    [`10-${SUITS.DIAMONDS}`]: existingCardsWithId.greedyGoblin,
    [`J-${SUITS.DIAMONDS}`]: existingCardsWithId.soulRelease,
    [`Q-${SUITS.DIAMONDS}`]: existingCardsWithId.gambler,
    [`K-${SUITS.DIAMONDS}`]: existingCardsWithId.goblinKing,

    [`JOKER-${SUITS.RED}`]: existingCardsWithId.whirlwind,
    [`JOKER-${SUITS.BLACK}`]: existingCardsWithId.whirlwind,
};

const {darkfire, soulRelease, healingFlame, defend, allSeeingEye, skeletonKid, skeletonKing, cowPriest, greedyGoblin, royalWitch, gambler, angel, whirlwind} = existingCardsWithId; 
const erratas = {
    darkfire,
    soulRelease,
    healingFlame,
    defend,
    allSeeingEye,
    skeletonKid,
    skeletonKing,
    cowPriest,
    greedyGoblin,
    royalWitch,
    gambler,
    angel,
    whirlwind
};
const ONLY_ERRATA_PRINT = false;
// const language = 'EN';

const language = 'PT';

