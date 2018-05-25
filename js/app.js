//All of the global variables
let cardsArray0, cardsArray1, fa, card, cardDeck, theCards, matchedCards, flippedCards, stars;

let cardFlip180 = 'rotateY(180deg)';
let cardFlip0 = 'rotateY(0deg)';

fa = 'fa ';

card = document.getElementsByClassName('card');
deck = document.querySelector('.deck');
cardDeck = document.getElementById('card-deck');
stars = document.querySelector('stars');
matchedCards = [];
flippedCards = [];

//Create the cards
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

//Dynamically create the duplicated cards
cardsArray1 = cardsArray0.concat(cardsArray0);

/********************************************************************************************** */

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

/********************************************************************************************** */

//Move counter
function movesCounter(moves) {
	moves = 0;
	moves++;
}
movesCounter();

/********************************************************************************************** */

//Timer function
function setTimer() {
	let timer = setInterval(countTimer, 1000);

	let totalSeconds = 0;

	function countTimer() {
		++totalSeconds;
		let hour = Math.floor(totalSeconds / 3600);
		let minute = Math.floor((totalSeconds - hour * 3600) / 60);
		let seconds = totalSeconds - (hour * 3600 + minute * 60);

		document.getElementById('timer').innerHTML = hour + ':' + minute + ':' + seconds;
	}
}

/********************************************************************************************** */

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

/********************************************************************************************** */

//Displays the show and open html.  Also a container for the match and unmatch functions
function displayCard() {
	let start = true;

	for (let i = 0; i < cardsArray1.length; i++) {
		card[i].addEventListener('click', function() {
			if (start) {
				setTimer();
			}
			start = false;
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

/********************************************************************************************** */

//matched cards function
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

/********************************************************************************************** */

//unmatched cards function
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

/********************************************************************************************** */

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
