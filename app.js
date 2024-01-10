let currentRow = 0;
let divLetters = '';
const maxRows = 6;
const maxCols = 5;
const wordList = ['apple', 'baker', 'cater', 'gamer', 'stone', 'match'];
let guesses = wordList[Math.floor(Math.random() * wordList.length) + 1];
console.log(guesses);
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
  } else if (e.key === 'Enter') {
    divLetters.length < 5 ? info('word is too short', 1000) : checkWord();
  }
}

function info(Text, duration) {
  const main = document.getElementById('main');
  const info = document.createElement('div');
  info.classList.add('alert');
  info.classList.add('fade-in');
  const p = document.createElement('p');
  info.appendChild(p);
  p.innerText = Text;
  main.appendChild(info);

  setTimeout(() => {
    info.remove();
  }, duration);
}

function updateLetters(letter) {
  if (divLetters.length < maxCols) {
    divLetters += letter;
    updateTiles(divLetters);
  }
}

function updateTiles(letters) {
  const rowDiv = document.querySelectorAll('.row')[currentRow];
  const columns = rowDiv.querySelectorAll('.row-letter');

  letters.split('').forEach((letter, index) => {
    columns[index].innerText = letter;
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

function checkWord() {
  !wordList.includes(divLetters)
    ? info('not in word list', 2500)
    : submitEvent();
}

function submitEvent() {
  const rowDiv = document.querySelectorAll('.row')[currentRow];
  for (let i = 0; i < divLetters.length; i++) {
    const tileEl = rowDiv.querySelector('#tile-' + i);
    revealTile(tileEl, i);
  }
  rowCount();
}

const revealTile = (tileEl, tileIndex) => {
  const getWord = guesses;
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
  }, (tileNum * 200) / 2);
  guesses === divLetters ? info('you win', 1000) : console.log('trying');
  // currentRow === 6 ? info('you loose', 4000) : console.log(currentRow);
}

function rowCount() {
  currentRow = (currentRow + 1) % maxRows;
  gameRow.setAttribute('data-id', currentRow + 1);
  divLetters = '';
}

document.addEventListener('keydown', userInput);
createGrid(maxRows, maxCols);
