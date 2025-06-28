const boardElement = document.getElementById('board');
const scoreRedElement = document.getElementById('scoreRed');
const scoreBlueElement = document.getElementById('scoreBlue');
const timerRedElement = document.getElementById('timerRed');
const timerBlueElement = document.getElementById('timerBlue');

let currentPlayer = 'red';
let boardNodes = [];
let edges = [];
let scores = { red: 0, blue: 0 };
let timers = { red: 60, blue: 60 };
let interval = null;

// Initialize game
function createBoard() {
    boardElement.innerHTML = '';
    boardNodes = [];
    edges = [];

    for (let i = 0; i < 18; i++) {
        const node = {
            id: i,
            player: null,
            element: document.createElement('div')
        };
        node.element.classList.add('node');
        node.element.addEventListener('click', () => handleNodeClick(node));
        boardElement.appendChild(node.element);
        boardNodes.push(node);
    }

    edges = [
        { from: 0, to: 1, weight: 1 }, { from: 1, to: 2, weight: 1 },
        { from: 2, to: 3, weight: 1 }, { from: 3, to: 4, weight: 1 },
        { from: 4, to: 5, weight: 1 }, { from: 5, to: 0, weight: 1 },
        { from: 6, to: 7, weight: 2 }, { from: 7, to: 8, weight: 2 },
        { from: 8, to: 9, weight: 2 }, { from: 9, to:10, weight: 2 },
        { from:10, to:11, weight: 2 }, { from:11, to: 6, weight: 2 },
        { from:12, to:13, weight: 3 }, { from:13, to:14, weight: 3 },
        { from:14, to:15, weight: 3 }, { from:15, to:16, weight: 3 },
        { from:16, to:17, weight: 3 }, { from:17, to:12, weight: 3 }
    ];
}

function handleNodeClick(node) {
    if (!node.player) {
        node.player = currentPlayer;
        node.element.classList.add(currentPlayer);
        updateScores();
        switchTurn();
    }
}

function updateScores() {
    scores.red = 0;
    scores.blue = 0;

    edges.forEach(edge => {
        const from = boardNodes[edge.from];
        const to = boardNodes[edge.to];
        if (from.player && from.player === to.player) {
            scores[from.player] += edge.weight;
        }
    });

    scoreRedElement.textContent = scores.red;
    scoreBlueElement.textContent = scores.blue;
}

function switchTurn() {
    clearInterval(interval);
    currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
    startTimer();
}

function startTimer() {
    interval = setInterval(() => {
        timers[currentPlayer]--;
        updateTimers();
        if (timers[currentPlayer] <= 0) {
            clearInterval(interval);
            alert(`${currentPlayer.toUpperCase()} ran out of time!`);
        }
    }, 1000);
}

function updateTimers() {
    timerRedElement.textContent = timers.red;
    timerBlueElement.textContent = timers.blue;
}

function pauseGame() {
    clearInterval(interval);
}

function resumeGame() {
    startTimer();
}

function resetGame() {
    clearInterval(interval);
    timers = { red: 60, blue: 60 };
    scores = { red: 0, blue: 0 };
    updateTimers();
    createBoard();
    startTimer();
}

createBoard();
startTimer();