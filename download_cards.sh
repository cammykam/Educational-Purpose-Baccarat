#!/bin/bash

# Create the cards directory if it doesn't exist
mkdir -p assets/cards

# Base URL for the card images
BASE_URL="https://deckofcardsapi.com/static/img"

# Download card back
curl -L "${BASE_URL}/back.png" -o "assets/cards/back.png"

# Download all card faces
for suit in H D C S; do
    # Map suit letters to full names
    case $suit in
        "H") full_suit="hearts";;
        "D") full_suit="diamonds";;
        "C") full_suit="clubs";;
        "S") full_suit="spades";;
    esac

    # Download number cards (2-10)
    for num in {2..10}; do
        # Special case for 10
        if [ $num -eq 10 ]; then
            curl -L "${BASE_URL}/0${suit}.png" -o "assets/cards/10_of_${full_suit}.png"
        else
            curl -L "${BASE_URL}/${num}${suit}.png" -o "assets/cards/${num}_of_${full_suit}.png"
        fi
        sleep 0.1
    done
    
    # Download face cards
    curl -L "${BASE_URL}/A${suit}.png" -o "assets/cards/ace_of_${full_suit}.png"
    sleep 0.1
    curl -L "${BASE_URL}/J${suit}.png" -o "assets/cards/jack_of_${full_suit}.png"
    sleep 0.1
    curl -L "${BASE_URL}/Q${suit}.png" -o "assets/cards/queen_of_${full_suit}.png"
    sleep 0.1
    curl -L "${BASE_URL}/K${suit}.png" -o "assets/cards/king_of_${full_suit}.png"
    sleep 0.1
done 