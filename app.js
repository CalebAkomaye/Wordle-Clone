let currentRow = 0;
let divLetters = '';
const maxRows = 6;
const maxCols = 5;
let guesses = ['apple', 'baker', 'cater', 'gamer', 'stone'];

const gameRow = document.getElementById('game');

function createGrid(columns, rows) {
  for (let i = 0; i < columns; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < rows; j++) {
      const column = document.createElement('div');
      column.classList.add('row-letter');
      column.setAttribute('id', 'tile-' + j);

      row.appendChild(column);
    }
    gameRow.appendChild(row);
  }
}

function userInput(e) {
  const inputLetter = e.key.toLowerCase();
  const letters = /[a-z]/;

  if (letters.test(inputLetter) && inputLetter.length === 1) {
    updateLetters(inputLetter);
  } else if (e.key === 'Backspace') {
    delLetter();
  } else if (e.key === 'Enter' && divLetters.length >= 4) {
    submitEvent();
  }
}

function updateLetters(letter) {
  divLetters += letter;
  const lettersToDisplay = divLetters.slice(0, 5);
  updateTiles(lettersToDisplay);
}

function updateTiles(letters) {
  const rowDiv = document.querySelectorAll('.row')[currentRow];
  const columns = rowDiv.querySelectorAll('.row-letter');

  letters.split('').forEach((letter, index) => {
    columns[index].innerText = letter.slice(0, 5);
    columns[index].classList.add('popIn');
  });
}

function delLetter() {
  divLetters = divLetters.slice(0, -1);
  delFromTile();
}

function delFromTile() {
  const rowDiv = document.querySelectorAll('.row')[currentRow];
  const columns = rowDiv.querySelectorAll('.row-letter');

  columns[divLetters.length].innerText = null;
  columns[divLetters.length].classList.remove('popIn');
}

function submitEvent() {
  const rowDiv = document.querySelectorAll('.row')[currentRow];
  for (let i = 0; i < divLetters.length; i++) {
    const tileEl = rowDiv.querySelector('#tile-' + i);
    revealTile(tileEl, i);
  }
}

const revealTile = (tileEl, tileIndex) => {
  const getWord = guesses[0];
  const guessedLetter = divLetters.charAt(tileIndex);
  const wordLetter = getWord.charAt(tileIndex);

  if (wordLetter === guessedLetter) {
    applyClassAndAnimate(tileEl, 'success', tileIndex);
  } else if (getWord.includes(guessedLetter)) {
    applyClassAndAnimate(tileEl, 'present', tileIndex);
  } else {
    applyClassAndAnimate(tileEl, 'absent', tileIndex);
  }
};

const applyClassAndAnimate = (element, className, tileNum) => {
  flipTile(element, className, tileNum);
};

function flipTile(element, className, tileNum) {
  setTimeout(() => {
    element.classList.add('flip', className);
    rowCount();
  }, (tileNum * 200) / 2);
}

function rowCount() {
  currentRow++;
  gameRow.setAttribute('data-id', currentRow);
  divLetters = divLetters.slice(5);
  if (currentRow === 5) {
    currentRow = 1;
  }
}

document.addEventListener('keydown', userInput);
createGrid(maxRows, maxCols);
