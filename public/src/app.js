  window.addEventListener('load', function(){



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
    "Being bad at something is the first step at being good at something.",
    "I talk to myself because I like talking to intellegent people."
]

const dracula = [
    "There are bugs in my skin and i need to get them out.",
    "The bugs are back." 
]

let score = 0;
const scoreElement = this.document.getElementById('score');


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
    let linesCleared = 0;
    for (let row = playfield.length - 1; row >= 0; ) {
      if (playfield[row].every(cell => !!cell)) {
        linesCleared++;
  
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

    if (linesCleared > 0){
      score+= linesCleared * 100;
      scoreElement.innerHTML = "Score: " + score;
    }
  
    tetromino = nextTetromino;
    nextTetromino = getNextTetromino();
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

    const player_name = prompt("Game Over! Enter your namr:");
    if(player_name){
      fetch("http://192.168.0.228:3000/score",{
        method: "POST",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({ player_name, score }),
      })
      .then(res => res,json())
      .then(data => {
        if (data.success){
          console.log("Score submitted!");
        }
        else{
          console.error("Error submitting score:", data.error);
        }
      })
      .catch(err => console.error("Request failed:", err));
    }
    score = 0; 
  }
  
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  const nextCanvas = document.getElementById('next');
  const nextCtx = nextCanvas.getContext('2d');
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
  let tetromino = null;
  let nextTetromino = getNextTetromino();
  tetromino = getNextTetromino();

  let rAF = null;  // keep track of the animation frame so we can cancel it
  let gameOver = false;
  

async function loadHighScores() {
  const res = await fetch("http://192.168.0.228:3000/scores");
  const scores = await res.json(); 

  const list = document.getElementById("highscores");
  list.innerHTML = "";

  scores.forEach(({ player_name, score }, i) =>{
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${player_name} - ${score}`;
    list.appendChild(li);
  });
  
}


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

    function drawNextTetromino(){
      nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

      const matrix = nextTetromino.matrix;
      const color = colors[nextTetromino.name];

      nextCtx.fillStyle = color; 

      const offsetX = Math.floor((nextCanvas.width / grid - matrix[0].length) / 2);
      const offsetY = Math.floor((nextCanvas.height / grid - matrix.length) / 2);

      for (let row = 0; row < matrix.length; row++){
        for (let col = 0; col < matrix[row].length; col++){
          if(matrix[row][col]){
            nextCtx.fillRect(
              (offsetX + col) * grid,
              (offsetY + row) * grid,
              grid - 1,
              grid - 1
            );
          }
        }
      }
    }

    drawNextTetromino();
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
  var i = document.getElementById('storeFront')
  var ii = document.getElementById('gameBoard')
  var iii = document.getElementById('nextPiece')
  var iv = document.getElementById('scoreBoard')
  if(!gameVisible){
    i.style.display = "grid";
    ii.style.display = "none";
    iii.style.display = "none";
    iv.style.display = "none";
  } else {
    i.style.display = "none";
    ii.style.display = "grid";
    iii.style.display = "grid";
    iv.style.display = "grid";

    tetris();
  }

  gameVisible = !gameVisible;
}




document.getElementById("startTeterisButton").onclick = hideStuff;
//headLiner();
showTime();
hideStuff();



});