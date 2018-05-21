/*
 * Create a list that holds all of your cards
 */
let cardsArray0, cardsArray1, fa, card, cardDeck;

card = document.getElementsByClassName('card');
deck = document.querySelector('.deck');
cardDeck = document.getElementById('card-deck');

fa = 'fa ';

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

//Function that controls the flipping of the cards.  Else statement is there only for testing purposes

function displayCard() {
	this.classList.toggle('open');
	this.classList.toggle('show');
}

function flipsCard() {
	let selectedCard = '';
	let matchedCards = [];
	let flippedCards = [];

	cardDeck.addEventListener('click', function(evt) {
		cardTarget = evt.target;
		if (cardTarget && cardTarget.nodeName === 'LI' && flippedCards.length < 2) {
			cardTarget.classList.add('open', 'show');
			cardTarget.style.transform = 'rotateY(180deg)';
			selectedCard = cardTarget.children[0].classList[1];
			flippedCards.push(selectedCard);
			console.log(flippedCards);
		}
		if (flippedCards[0] === flippedCards[1]) {
			matchedCards.push(flippedCards[0], flippedCards[1]);
			macthed();
		} else {
			unmatched();
		}
	});
}

function matched() {}

function unmatched() {}

//Dynamically creates the html cards
function deckOfCards(card) {
	let cardStr;
	let iconPic;
	let cards = '';
	for (let card of cardsArray1) {
		cards += `<li class='card'><i class ='${fa + card}'></i></li>`;
	}
	deck.innerHTML = cards;
	//add in the flipcard function
	flipsCard();
}
deckOfCards();

//restart the game
function restartGame(restart) {
	restart = document.getElementById('restart');
	restart.addEventListener('click', function() {
		let cards = document.getElementById('card-deck');
		cards.innerHTML = ' ';
		shuffle(cardsArray1);
		deckOfCards();
	});
}
restartGame();
