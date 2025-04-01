const bounce = document.createElement("div")
bounce.style.position = "absolute"
bounce.style.width = "100px"
bounce.style.height = "100px"
bounce.style.zIndex = -1;
document.body.appendChild(bounce)
let gameVisible = false;
let style = 'norm';

bounce.style.backgroundColor = "black"

const colors =  ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
const colorsB =["#f94144", "#f'ArrowLeft'22c", "#f8961e","#f9c74f", "#90be6d", "#43aa8b", "#577590"]
const motifs = [
    "It's a marathon, not a sprint.",
    "We are not individuals experiencing the universe, but the universe experiencing individuality .",
    //"If anybody makes it in the family, it'll be you.",
    "Live up to your potential.",
    "Make it a great day or not, the choice is yours.",
    "If you're not first, you're last.",
    "Hall of fame, or hall of shame. Always find a way to be remembered.",
    "Be your biggest cheerleader.",
    "A wise mans life is based around f*** you.",
    "Ball is life.",
    "F*** it, we ball.",
    "F*** it, we live.",
    "Top 10, not 10.",
    "Thug that s*** out.",
    "Life hard but we go harder.",
    "Don't forget to smile.",
    "Don't Over Think ----.",
    "Sometimes worse is better.",
    "Most people don't even like themselves, don't worry about if they like you or not.",
    "Being bad at something is the first step at being good at something."
]

const dracula = [
    "There are bugs in my skin and i need to get them out.",
    "The bugs are back." 
]




bounceCount = null
bounceGoal = 10
count = 0
colorIndex = 0
colorIndexB = 0
x=50
y=50
xvel=1
yvel=1
currentTimer = null;

function headLiner(){
   const headLineElement =  document.getElementById('headLine')
   if(headLineElement){
    headLineElement.innerHTML = motifs[count]
   }
   else{
    console.error("Element with id 'headLine' not found.")
   }
}

setInterval(showTime, 1000);
function showTime(){
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";


    if(hour >= 12){
        if(hour > 12) hour -=12;
        am_pm = "PM";
    }
    else if(hour == 0){
        hr = 12;
        am_pm = "AM";

    }

    hour =
        hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = 
    hour +
    ":" +
    min +
    ":" +
    sec +
    am_pm;

    document.getElementById("clock").innerHTML = currentTime;
}


function startBounce(style){
    if(currentTimer){
       clearInterval(currentTimer)
       currentTimer = null;
    }
    currentTimer = setInterval(()=>{
        if(style === 'norm'){
            normBounceLogic();
        }
        else if (style === 'reverse'){
            reverseBounceLogic();
        }
    }, 1500/60)

}



function normBounceLogic(){
    bounceOccured = false

    x+=xvel*5
    y+=yvel*5

    if(x<0){
        x = 0
        xvel = 1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
    }
    else if(x>window.innerWidth - bounce.offsetWidth) {
        x = window.innerWidth - bounce.offsetWidth
        xvel = -1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
        }
    if(y<0){
        y = 0
        yvel = 1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
    }
    else if(y>window.innerHeight - bounce.offsetHeight) {
        y = window.innerHeight - bounce.offsetHeight
        yvel = -1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
    }

    if(bounceOccured){
        bounceCount = bounceCount + 1
        if (bounceCount >= bounceGoal){
            bounceCount = 0
            if(window.location.pathname === "/index.html"){
              count = (count + 1) % motifs.length
              headLiner()
            }
        }
    }

    
    bounce.style.left = x+"px"
    bounce.style.top = y+"px"

}
    
function reverseBounceLogic(){
    bounceOccured = false

    x+=xvel*5
    y+=yvel*5
    
    if(x<0){
    xvel = 1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }
    else if(x>window.innerWidth - bounce.offsetWidth) {
    x = window.innerWidth - bounce.offsetWidth
    xvel = -1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }
    if(y<0){
    yvel = 1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }
    else if(y>window.innerHeight - bounce.offsetHeight) {
    y = window.innerHeight - bounce.offsetHeight
    yvel = -1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }

    if(bounceOccured){
      bounceCount = bounceCount + 1
      if (bounceCount >= bounceGoal){
          bounceCount = 0
          if(window.location.pathname === "/index.html"){
            count = (count + 1) % motifs.length
            headLiner()
          }
      }
  }


    bounce.style.left = x+"px"    
    bounce.style.top = y+"px" 
    

}   


function normBounce(){
    bounce.style.backgroundColor = "black"
    document.body.style.backgroundColor = "pink"
    startBounce('norm')
}

function reverseBounce(){
    document.body.style.backgroundColor = "black"
    bounce.style.backgroundColor = "white"
    startBounce('reverse')
}

function tetris(){
    // https://tetris.fandom.com/wiki/Tetris_Guideline

// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // generate a new tetromino sequence
  // @see https://tetris.fandom.com/wiki/Random_Generator
  function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  
    while (sequence.length) {
      const rand = getRandomInt(0, sequence.length - 1);
      const name = sequence.splice(rand, 1)[0];
      tetrominoSequence.push(name);
    }
  }
  
  // get the next tetromino in the sequence
  function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
      generateSequence();
    }
  
    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];
  
    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
  
    // I starts on row 21 (-1), all others start on row 22 (-2)
    const row = name === 'I' ? -1 : -2;
  
    return {
      name: name,      // name of the piece (L, O, etc.)
      matrix: matrix,  // the current rotation matrix
      row: row,        // current row (starts offscreen)
      col: col         // current col
    };
  }
  
  // rotate an NxN matrix 90deg
  // @see https://codereview.stackexchange.com/a/186834
  function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
      row.map((val, j) => matrix[N - j][i])
    );
  
    return result;
  }
  
  // check to see if the new matrix/row/col is valid
  function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] && (
            // outside the game bounds
            cellCol + col < 0 ||
            cellCol + col >= playfield[0].length ||
            cellRow + row >= playfield.length ||
            // collides with another piece
            playfield[cellRow + row][cellCol + col])
          ) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  // place the tetromino on the playfield
  function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
  
          // game over if piece has any part offscreen
          if (tetromino.row + row < 0) {
            return showGameOver();
          }
  
          playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
        }
      }
    }
  
    // check for line clears starting from the bottom and working our way up
    for (let row = playfield.length - 1; row >= 0; ) {
      if (playfield[row].every(cell => !!cell)) {
  
        // drop every row above this one
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < playfield[r].length; c++) {
            playfield[r][c] = playfield[r-1][c];
          }
        }
      }
      else {
        row--;
      }
    }
  
    tetromino = getNextTetromino();
  }
  
  // show the game over screen
  function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;
  
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
  }
  
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  const grid = 32;
  const tetrominoSequence = [];
  
  // keep track of what is in every cell of the game using a 2d array
  // tetris playfield is 10x20, with a few rows offscreen
  const playfield = [];
  
  // populate the empty state
  for (let row = -2; row < 20; row++) {
    playfield[row] = [];
  
    for (let col = 0; col < 10; col++) {
      playfield[row][col] = 0;
    }
  }
  
  // how to draw each tetromino
  // @see https://tetris.fandom.com/wiki/SRS
  const tetrominos = {
    'I': [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    'J': [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    'L': [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    'O': [
      [1,1],
      [1,1],
    ],
    'S': [
      [0,1,1],
      [1,1,0],
      [0,0,0],
    ],
    'Z': [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    'T': [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  };
  
  // color of each tetromino
  const colors = {
    'I': '#84e3c8',
    'O': '#a8e6cf',
    'T': '#dcedc1',
    'S': '#ffd3b6',
    'Z': '#ffaaa5',
    'J': '#ff8b94',
    'L': '#ff7480'
  };
  
  let count = 0;
  let tetromino = getNextTetromino();
  let rAF = null;  // keep track of the animation frame so we can cancel it
  let gameOver = false;
  
  // game loop
  function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
  
    // draw the playfield
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (playfield[row][col]) {
          const name = playfield[row][col];
          context.fillStyle = colors[name];
  
          // drawing 1 px smaller than the grid creates a grid effect
          context.fillRect(col * grid, row * grid, grid-1, grid-1);
        }
      }
    }
  
    // draw the active tetromino
    if (tetromino) {
  
      // tetromino falls every 35 frames
      if (++count > 35) {
        tetromino.row++;
        count = 0;
  
        // place piece if it runs into anything
        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
          tetromino.row--;
          placeTetromino();
        }
      }
  
      context.fillStyle = colors[tetromino.name];
  
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
  
            // drawing 1 px smaller than the grid creates a grid effect
            context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
          }
        }
      }
    }
  }

  // stops the page scroll problem 
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      e.preventDefault();
    }
  });
  
  // listen to keyboard events to move the active tetromino
  document.addEventListener('keydown', function(e) {
    if (gameOver) return;
  
    // left and right arrow keys (move)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const col = e.key === 'ArrowLeft'
        ? tetromino.col - 1
        : tetromino.col + 1;
  
      if (isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
      }
    }
  
    // up arrow key (rotate)
    if (e.key === 'ArrowUp') {
      const matrix = rotate(tetromino.matrix);
      if (isValidMove(matrix, tetromino.row, tetromino.col)) {
        tetromino.matrix = matrix;
      }
    }
  
    // down arrow key (drop)
    if(e.key === "ArrowDown") {
      const row = tetromino.row + 1;
  
      if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;
  
        placeTetromino();
        return;
      }
  
      tetromino.row = row;
    }
  });
  
  // start the game
  rAF = requestAnimationFrame(loop);
}

function hideStuff(){
  var i = document.getElementById("clock");
  var ii = document.getElementById("headLine");
  var iii = document.getElementById("game")
  if(gameVisible){
    i.style.display = "flex";
    ii.style.display = "flex";
    iii.style.display = "none";
  } else {
    i.style.display = "none";
    ii.style.display = "none";
    iii.style.display = "flex";

    tetris();
  }

  gameVisible = !gameVisible;
}

function toggleSidebar(){
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');
}

document.getElementById("switchButton").onclick = function(){
  if(style === 'norm'){
    startBounce('reverse')
    style = 'reverse'
  }
  else{
    startBounce('norm')
    style = 'norm'
  }
}

document.getElementById("startTeterisButton").onclick = hideStuff;

window.onload = function(){
  document.getElementById("game").style.display = "none";
  headLiner();
  normBounce();
  showTime();
}