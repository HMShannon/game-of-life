
const board = document.getElementById('board');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

let gameOn = false;
let squares = [];

function randomSeed() {
	squares = [];
	for (let i = 1; i <= 50; i++) {
    let column = [];
    for (let k = 1; k <= 50; k++) {
      let value;
      if (Math.random() >= 0.65) {
        value = true;
      } else {
        value = false;
      }
      column.push(value);
    }
    squares.push(column);
  }
}

randomSeed();

function generateTiles() {
	let tileHTML = '';

  squares.forEach((column, x) => {
    column.forEach((current, y) => {
      tileHTML += `<div class="tile ${current}" id="${x} ${y}"></div>`;
    });
  });

  board.innerHTML = tileHTML;

  let tiles = document.querySelectorAll('.tile');

  tiles.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      let x = parseInt(e.target.id.split(' ')[0]);
      let y = parseInt(e.target.id.split(' ')[1]);
      e.target.classList.toggle('true');
      squares[x][y] = !squares[x][y];
    });
  });
}

generateTiles();



function generation() {

	let newSquares = [];
  for (let i = 0; i < 50; i++) {
  	newSquares.push([]);
  }
  newSquares.map((column, index) => column = squares[index].slice());

	squares.forEach((column, x) => {
  	column.forEach((current, y) => {
    	let neighbors = [];
      for (let i = x-1; i <= x+1; i++) {
      	if (i < 0 || i > 49) {
        	continue;
        }
      	for (let j = y-1; j <= y+1; j++) {
        	if (j < 0 || j > 49) {
          	continue;
          }
        	if (i == x && j == y) {
          	continue;
          }
          neighbors.push(squares[i][j]);
        }
      }

      let newCurrent = current;
      let liveNeighbors = neighbors.filter((neighbor) => neighbor == true);

      if (liveNeighbors.length < 2) {
      	newCurrent = false;
      } else if (current === true && liveNeighbors.length > 3) {
      	newCurrent = false;
      } else if (current === true && liveNeighbors.length > 1 && liveNeighbors.length < 4) {
      	newCurrent = true;
      } else if (current == false && liveNeighbors.length == 3) {
      	newCurrent = true;
      }
      newSquares[x][y] = newCurrent;
    });
  });
  squares = newSquares;
  generateTiles();
}

let running;

startButton.addEventListener('click', () => {
	if (!gameOn) {
  	gameOn = true;
  	startButton.textContent = 'Pause';
    running = setInterval(generation, 200);
  } else {
  	gameOn = false;
    startButton.textContent = 'Start';
    clearInterval(running);
    running = '';
  }
});

resetButton.addEventListener('click', () => {
	clearInterval(running);
  startButton.textContent = 'Start';
  running = '';
  gameOn = false;
	randomSeed();
  generateTiles();
});
