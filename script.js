// Baccarat Game Logic
function baccaratGame() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = [
        'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
        'J', 'Q', 'K'
    ];
    
    // Create a deck of cards
    const deck = createDeck(suits, values);
    shuffle(deck);

    // Deal two cards to Player and Banker
    const playerHand = [deck.pop(), deck.pop()];
    const bankerHand = [deck.pop(), deck.pop()];

    // Determine winner
    const playerScore = calculateScore(playerHand);
    const bankerScore = calculateScore(bankerHand);

    console.log('Player Hand:', playerHand, 'Score:', playerScore);
    console.log('Banker Hand:', bankerHand, 'Score:', bankerScore);

    if (playerScore > bankerScore) {
        console.log('Player Wins!');
    } else if (bankerScore > playerScore) {
        console.log('Banker Wins!');
    } else {
        console.log('Tie!');
    }
}

function createDeck(suits, values) {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function calculateScore(hand) {
    let score = 0;
    for (const card of hand) {
        if (card.value === 'A') {
            score += 1;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 0;
        } else {
            score += parseInt(card.value);
        }
    }
    return score % 10; // Baccarat scoring is modulo 10
}

// Run the baccarat game
baccaratGame();