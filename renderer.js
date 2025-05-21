// Card deck and game state
let deck = [];
let playerHand = [];
let bankerHand = [];
let isDealing = false;

// Card suits and values
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Initialize the deck
function initDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Get card image path
function getCardImagePath(card) {
    // Map card values to file names
    const valueMap = {
        'A': 'ace',
        'J': 'jack',
        'Q': 'queen',
        'K': 'king',
        '10': '10'  // Special case for 10
    };
    
    // Get the correct value for the file name
    let value = valueMap[card.value] || card.value;
    
    // Special case for 10 to match the file naming convention
    if (card.value === '10') {
        return `./assets/cards/10_of_${card.suit}.png`;
    }
    
    return `./assets/cards/${value}_of_${card.suit}.png`;
}

// Create card element
function createCardElement(card, isFaceUp = true) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    if (isFaceUp) {
        const imagePath = getCardImagePath(card);
        console.log('Loading card image:', imagePath); // Debug log
        cardElement.style.backgroundImage = `url('${imagePath}')`;
    } else {
        cardElement.classList.add('card-back');
    }
    return cardElement;
}

// Deal a single card with animation
async function dealCard(hand, container, isFaceUp = true) {
    const card = deck.pop();
    hand.push(card);
    const cardElement = createCardElement(card, isFaceUp);
    cardElement.style.opacity = '0';
    cardElement.style.transform = 'translateY(-20px)';
    container.appendChild(cardElement);
    
    // Trigger animation
    await new Promise(resolve => setTimeout(resolve, 50));
    cardElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    cardElement.style.opacity = '1';
    cardElement.style.transform = 'translateY(0)';
    
    return card;
}

// Deal initial cards
async function dealInitial() {
    if (isDealing) return;
    isDealing = true;
    
    const playerHandDiv = document.getElementById('player-hand');
    const bankerHandDiv = document.getElementById('banker-hand');
    const gameStatus = document.getElementById('game-status');
    
    // Clear previous hands
    playerHandDiv.innerHTML = '';
    bankerHandDiv.innerHTML = '';
    playerHand = [];
    bankerHand = [];
    gameStatus.textContent = '';
    
    // Deal two cards to each with animation
    for (let i = 0; i < 2; i++) {
        await dealCard(playerHand, playerHandDiv);
        await new Promise(resolve => setTimeout(resolve, 200));
        await dealCard(bankerHand, bankerHandDiv);
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Show result
    const winner = determineWinner();
    gameStatus.textContent = winner;
    isDealing = false;
}

// Calculate hand value
function calculateHandValue(hand) {
    let value = 0;
    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            value += 0;
        } else if (card.value === 'A') {
            value += 1;
        } else {
            value += parseInt(card.value);
        }
    }
    return value % 10;
}

// Determine winner
function determineWinner() {
    const playerValue = calculateHandValue(playerHand);
    const bankerValue = calculateHandValue(bankerHand);
    
    if (playerValue > bankerValue) {
        return `Player wins! (${playerValue} vs ${bankerValue})`;
    } else if (bankerValue > playerValue) {
        return `Banker wins! (${bankerValue} vs ${playerValue})`;
    } else {
        return `Tie! (${playerValue})`;
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    initDeck();
    
    document.getElementById('deal-button').addEventListener('click', () => {
        if (!isDealing) {
            dealInitial();
        }
    });
});