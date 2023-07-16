var cards = [];
var flippedCards = [];
var matches = 0;
var attempts = 0;
var level = "easy";

function createCards(level) {
  var symbols = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'];
  var totalCards;

  if (level === "easy") {
    totalCards = 8;
  } else if (level === "medium") {
    totalCards = 12;
  } else if (level === "hard") {
    totalCards = 16;
  }

  for (var i = 0; i < totalCards; i++) {
    var symbol = symbols[Math.floor(i / 2)];
    cards.push(symbol);
  }

  shuffleCards();
}

function shuffleCards() {
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}

function startGame() {
  cards = [];
  flippedCards = [];
  matches = 0;
  attempts = 0;

  var board = document.querySelector('.cards');
  board.innerHTML = '';

  level = prompt("Digite o nível de dificuldade: easy, medium ou hard");

  createCards(level);

  var startButton = document.getElementById('startButton');
  startButton.style.display = 'none';

  for (var i = 0; i < cards.length; i++) {
    var card = document.createElement('div');
    card.classList.add('card');

    var frontFace = document.createElement('div');
    frontFace.classList.add('front-face');

    var backFace = document.createElement('div');
    backFace.classList.add('back-face');
    backFace.style.backgroundImage = `url('${cards[i]}.jpg')`;

    card.appendChild(frontFace);
    card.appendChild(backFace);
    card.setAttribute('data-card', cards[i]);
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  }
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      attempts++;

      if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        flippedCards = [];
        matches++;

        if (matches === cards.length / 2) {
          var startButton = document.getElementById('startButton');
          startButton.style.display = 'inline-block';
          startButton.innerHTML = 'Reiniciar';
          startButton.onclick = function() {
            startGame();
          }

          alert('Parabéns, você concluiu o jogo em ' + attempts + ' tentativas!');
        }
      } else {
        setTimeout(function() {
          flippedCards[0].classList.remove('flipped');
          flippedCards[1].classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }
}
