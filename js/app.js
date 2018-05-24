/*
 * Create a list that holds all of your cards
 */
let cardsArray0, cardsArray1, fa, card, cardDeck, theCards, matchedCards, flippedCards;

let cardFlip180 = 'rotateY(180deg)';
let cardFlip0 = 'rotateY(0deg)';

fa = 'fa ';

card = document.getElementsByClassName('card');
deck = document.querySelector('.deck');
cardDeck = document.getElementById('card-deck');
matchedCards = [];
flippedCards = [];

cardsArray0 = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-leaf',
	'fa-bomb',
	'fa-bicycle'
];

cardsArray1 = cardsArray0.concat(cardsArray0);

//console.log(cardsArray);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

cardsArray1 = shuffle(cardsArray1);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Dynamically creates the html cards
function createCards(card) {
	let cardStr;
	let iconPic;
	let cards = '';
	for (let card of cardsArray1) {
		cards += `<li class='card'><i class ='${fa + card}'></i></li>`;
	}
	deck.innerHTML = cards;
	//add in the flipcard function
	//flipsCard();
}
createCards();

function displayCard() {
	for (let i = 0; i < cardsArray1.length; i++) {
		card[i].addEventListener('click', function() {
			flippedCards.push(cardsArray1[i]);
			if (flippedCards.length <= 2) {
				card[i].classList.add('show', 'open');
				card[i].style.transform = cardFlip180;
			}
			if (flippedCards.length == 2) {
				if (flippedCards[1] !== flippedCards[0]) {
					unmatched();
				} else {
					matched();
				}
			}
		});
	}
}
displayCard();

function matched() {
	console.log('you got a match');
	matchedCards.push(flippedCards[0], flippedCards[1]);
	for (let m = 0; m < cardsArray1.length; m++) {
		if (card[m].classList.contains('show')) {
			card[m].classList.add('match');
		}
	}
	flippedCards = [];
}

function unmatched() {
	console.log(flippedCards);
	console.log('it is not a match');
	setTimeout(function() {
		for (let j = 0; j < cardsArray1.length; j++) {
			if (!card[j].classList.contains('match')) {
				card[j].classList.remove('show', 'open');
				card[j].style.transform = cardFlip0;
			}
		}
		flippedCards = [];
	}, 1500);
}

//restart the game
function restartGame(restart) {
	restart = document.getElementById('restart');
	restart.addEventListener('click', function() {
		let cards = document.getElementById('card-deck');
		cards.innerHTML = ' ';
		shuffle(cardsArray1);
		createCards();
		displayCard();
	});
}
restartGame();
