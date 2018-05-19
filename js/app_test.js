//a safe place to keep all of my unwanted code for testing

/*
 * Create a list that holds all of your cards
 */
let cardsArray;

cardsArray = [
	'fa fa-diamond',
	'fa fa-diamond',
	'fa fa-paper-plane-o',
	'fa fa-paper-plane-o',
	'fa fa-anchor',
	'fa fa-anchor',
	'fa fa-bolt',
	'fa fa-bolt',
	'fa fa-cube',
	'fa fa-cube',
	'fa fa-leaf',
	'fa fa-leaf',
	'fa fa-bomb',
	'fa fa-bomb',
	'fa fa-bicycle',
	'fa fa-bicycle'
];

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

//shuffle the cards when the reset button is clicked

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

/* let getCard = (card) => {
	card = document.getElementsByClassName('card');

	for (let i = 0; i < card.length; i++) {
		card[i].addEventListener('click', () => {
			card[i].classList.add('show', 'open');
		});
	}
}; */

//Function that controls the flipping of the cards.  Else statement is there only for testing purposes
const flipCard = (card, theClasses) => {
	card = document.getElementsByClassName('card');
	theClasses = document.querySelectorAll('.deck .card');

	for (let i = 0; i < card.length; i++) {
		card[i].addEventListener('click', () => {
			if (!theClasses[i].classList.contains('show')) {
				card[i].style.transform = 'rotateY(180deg)';
				card[i].classList.add('show', 'open');
			} else {
				card[i].style.transform = 'rotateY(0deg)';
				card[i].classList.remove('show', 'open');
			}
		});
	}
};

//create the card icons
const cardIcons = (iconPic) => {
	iconPic = document.createElement('i');
	iconPic.setAttribute('class', shuffle(cardsArray));
	return iconPic;
};

//Dynamically creates the html cards
const deckOfCards = (card, cardDeck) => {
	let cardStr;
	for (let i = 0; i < cardsArray.length; i++) {
		cardDeck = document.querySelector('.deck');
		card = document.createElement('li');
		//card.setAttribute('class', 'card');
		cardStr = 'card';
		card.classList.add(cardStr);
		cardDeck.appendChild(card);
		card.appendChild(cardIcons());
	}
	//add in the flipcard function
	flipCard();
};
deckOfCards();

const restartGame = (restartGame) => {
	restartGame = document.getElementById('restart-game');
	restartGame.addEventListener('click', () => {
		shuffle(cardsArray);
	});
};
restartGame();
