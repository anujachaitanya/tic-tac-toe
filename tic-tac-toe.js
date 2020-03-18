const BOARD_ID = 'board';

class GameMaster {
  constructor() {
    this.players = { 0: [], 1: [] };
    this.turn = 0;
    this.winningCombination = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['1', '4', '7'],
      ['1', '5', '9'],
      ['3', '5', '7'],
      ['3', '6', '9'],
      ['2', '5', '8']
    ];
  }

  changeTurn() {
    this.turn = Math.abs(this.turn - 1);
  }

  get mark() {
    const marks = ['X', 'O'];
    return marks[this.turn];
  }

  makeMove(position) {
    this.players[this.turn].push(position);
  }

  hasWon() {
    const hasWon = this.winningCombination.some(combination =>
      combination.every(position => this.players[this.turn].includes(position))
    );
    return hasWon;
  }

  hasDraw() {
    const occupiedPlaces = this.players[0].length + this.players[1].length;
    return occupiedPlaces == 9;
  }

  getWinner() {
    return this.turn;
  }
}

const removeListeners = function() {
  const cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach(cell => (cell.onclick = null));
};

const announceWin = function(player) {
  const playerName = 1 + +player;
  const winningText = document.createElement('h1');
  winningText.innerText = `player${playerName} has won`;
  document.body.appendChild(winningText);
  removeListeners();
};

const announceDraw = function() {
  const draw = document.createElement('h1');
  draw.innerText = `Draw`;
  document.body.appendChild(draw);
  removeListeners();
};

const onClick = (cell, master) => {
  cell.innerText = master.mark;
  master.makeMove(cell.id);
  if (master.hasWon()) {
    const winner = master.getWinner();
    announceWin(winner);
  }
  if (master.hasDraw()) {
    announceDraw();
  }
  master.changeTurn();
  cell.onclick = null;
};

const createCell = function(id) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = id;
  return cell;
};

const addListeners = function(master) {
  const cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach(
    cell => (cell.onclick = onClick.bind(null, cell, master))
  );
};

const getBoard = () => document.getElementById(BOARD_ID);

const createBoard = function() {
  const board = getBoard();
  for (let id = 1; id <= 9; id++) {
    const cell = createCell(id);
    board.appendChild(cell);
  }
};

const main = function() {
  createBoard();
  const master = new GameMaster();
  addListeners(master);
};
