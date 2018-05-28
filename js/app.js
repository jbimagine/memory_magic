//All of the global variables
let cardsArray0,
	cardsArray1,
	fa,
	card,
	cardDeck,
	theCards,
	matchedCards,
	flippedCards,
	stars,
	timerElem,
	timer,
	modalWinContainer,
	movesClass,
	count,
	modalRestartBtn,
	cardFlip180,
	cardFlip0;

cardFlip180 = 'rotateY(180deg)';
cardFlip0 = 'rotateY(0deg)';
fa = 'fa ';
card = document.getElementsByClassName('card');
deck = document.querySelector('.deck');
cardDeck = document.getElementById('card-deck');
stars = document.querySelector('stars');
timerElem = document.getElementById('timer');
modalWinContainer = document.getElementById('modal-win-container');
timerWin = document.getElementById('timerWin');
movesClass = document.getElementsByClassName('moves');
modalRestartBtn = document.getElementById('modal-restart-btn');
count = 0;
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
function movesCounter() {
	count++;
	for (let i = 0; i < movesClass.length; i++) {
		movesClass[i].innerHTML = count;
	}
}

/********************************************************************************************** */

//Timer function
function setTimer() {
	timer = setInterval(countTimer, 1000);

	let totalSeconds = 0;

	function countTimer() {
		++totalSeconds;
		let hour = Math.floor(totalSeconds / 3600);
		let minute = Math.floor((totalSeconds - hour * 3600) / 60);
		let seconds = totalSeconds - (hour * 3600 + minute * 60);

		timerElem.innerHTML = hour + ':' + minute + ':' + seconds;
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
			if (!card[i].classList.contains('show', 'open')) {
				flippedCards.push(cardsArray1[i]);
				if (flippedCards.length <= 2) {
					card[i].classList.add('show', 'open');
					card[i].style.transform = cardFlip180;
				}

				if (flippedCards.length == 2) {
					movesCounter();
					if (flippedCards[1] !== flippedCards[0]) {
						unmatched();
					} else {
						matched();
					}
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
	console.log(matchedCards);
	for (let m = 0; m < cardsArray1.length; m++) {
		if (card[m].classList.contains('show', 'open')) {
			card[m].classList.add('match');
		}
	}
	//displays the win modal if all the cards are shown
	if (matchedCards.length === 16) {
		modalWinContainer.style.display = 'flex';
		timerWin.innerHTML = timerElem.innerHTML;
		console.log('You won the game!!');
		clearInterval(timer);
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
	}, 1000);
}

/********************************************************************************************** */

//restart the game
function restartGame(restart) {
	restart = document.getElementById('restart');
	restart.addEventListener('click', function() {
		restartModal();
	});
}
restartGame();

function restartModal() {
	cardDeck.innerHTML = ' ';

	//reset the moves
	count = 0;
	for (let i = 0; i < movesClass.length; i++) {
		movesClass[i].innerHTML = '';
	}

	//reset timer
	timerElem.innerHTML = '';
	clearInterval(timer);

	shuffle(cardsArray1);
	createCards();
	displayCard();
}

function restartWin() {
	modalRestartBtn.addEventListener('click', function() {
		modalWinContainer.style.display = 'none';
		restartModal();
	});
}
restartWin();
