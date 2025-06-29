const board = document.getElementById("gameBoard");
const turnDisplay = document.getElementById("turnPlayer");
const redScoreSpan = document.getElementById("redScore");
const blueScoreSpan = document.getElementById("blueScore");
let turn = "red";
let redScore = 0;
let blueScore = 0;
let nodes = [];
let edges = [];
function addNode(x, y, layer) {
    let node = document.createElement("div");
    node.classList.add("node");
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.dataset.owner = "";
    node.dataset.layer = layer;
    node.addEventListener("click", () => clickNode(node));
    board.appendChild(node);
    nodes.push(node);
    return node;
}
function addEdge(x, y, length, angle, weight) {
    let line = document.createElement("div");
    line.classList.add("line");
    line.style.left = `${x}px`;
    line.style.top = `${y}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    board.appendChild(line);
    let w = document.createElement("div");
    w.classList.add("weight");
    w.style.left = `${x + length/2}px`;
    w.style.top = `${y - 10}px`;
    w.innerText = weight;
    board.appendChild(w);
    edges.push({nodes: [], weight, line});
}
function setupBoard() {
    let outer = [
        addNode(300, 100, "outer"),
        addNode(400, 170, "outer"),
        addNode(370, 290, "outer"),
        addNode(230, 290, "outer"),
        addNode(200, 170, "outer"),
        addNode(300, 100, "outer"),
    ];
    addEdge(300,100,100,30,1);
    addEdge(390,150,100,90,2);
    addEdge(390,260,140,150,3);
    addEdge(250,300,140,210,1);
    addEdge(160,230,100,270,2);
    addEdge(200,140,100,330,1);
    let middle = [
        addNode(300,150,"middle"),
        addNode(350,190,"middle"),
        addNode(330,240,"middle"),
        addNode(270,240,"middle"),
        addNode(250,190,"middle"),
        addNode(300,150,"middle"),
    ];
    addEdge(300,150,50,30,6);
    addEdge(340,170,50,90,5);
    addEdge(320,230,70,150,4);
    addEdge(280,240,70,210,1);
    addEdge(240,200,50,270,1);
    addEdge(260,160,50,330,1);
    let inner = [
        addNode(300,190,"inner"),
        addNode(330,210,"inner"),
        addNode(315,230,"inner"),
        addNode(285,230,"inner"),
        addNode(270,210,"inner"),
        addNode(300,190,"inner"),
    ];
    addEdge(300,190,30,30,8);
    addEdge(320,200,30,90,9);
    addEdge(310,225,40,150,8);
    addEdge(290,230,40,210,9);
    addEdge(260,215,30,270,8);
    addEdge(280,195,30,330,8);
}
function clickNode(node) {
    if (!node.dataset.owner) {
        node.classList.add(turn);
        node.dataset.owner = turn;
        updateScore(node);
        turn = turn === "red" ? "blue" : "red";
        turnDisplay.textContent = turn.charAt(0).toUpperCase()+turn.slice(1);
    }
}
function updateScore(node) {
    let weight = node.dataset.layer === "outer" ? 1 :
                 node.dataset.layer === "middle" ? 5 : 8;
    if (node.dataset.owner === "red") redScore += weight;
    else blueScore += weight;
    redScoreSpan.textContent = redScore;
    blueScoreSpan.textContent = blueScore;
}
function resetGame() {
    board.innerHTML = "";
    nodes = [];
    edges = [];
    redScore = 0;
    blueScore = 0;
    turn = "red";
    redScoreSpan.textContent = redScore;
    blueScoreSpan.textContent = blueScore;
    turnDisplay.textContent = "Red";
    setupBoard();
}
setupBoard();