/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// TODO 4a: Create the snake, apple and score variables

var snake = {};
var apple = {};
var score = 0;

// Chaser Snake Variables
var chaserSnake = {};

// Game Variables

// Constant Variables
var ROWS = 30;
var COLUMNS = 30;
var BROWS = 19; // Apple cannot appear to close to sides or top
var BCOLUMNS = 29; // Apple cannot appear to close to sides or top
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  // W, A, S, D keys for WASD controls
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

// Pause the Game
var isPaused = false;

var APPLE_MARGIN = 1; // Apple cannot appear within 2 squares of any edge

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);

// start the game
init();

function init() {
  // TODO 4c-2: initialize the snake
  // initialize the snake's body as an empty Array
  snake.body = [];

  // make the first snakeSquare and set it as the head
  makeSnakeSquare(10, 10); // Places snake at the center of the board
  snake.head = snake.body[0];

  // Initialize chaser snake - starts at a corner
  initializeChaserSnake();

  // TODO 4b-2: initialize the apple
  makeApple(); // Randomly places apple

  // TODO 5a: Initialize the interval
  // start update interval
  // Set initial interval time
  
  snake.intervalTime = 115; // Anytime an apple is eaten, the game increases in speed // Functional,ity is found in Extras section
  updateInterval = setInterval(update, snake.intervalTime);//16.6 = 60fps //33.333333333333336 = 30 fps // 100 = 10 fps
  requestAnimationFrame(render);

}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// CHASER SNAKE FUNCTIONS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Initialize the chaser snake with starting position and properties
function initializeChaserSnake() {
  chaserSnake.body = [];
  chaserSnake.moveCounter = 0; // To control movement speed (chaser moves every few ticks)
  chaserSnake.strategy = "hunt"; // Start with hunt, will randomize later
  chaserSnake.lastPlayerPos = { row: snake.head.row, column: snake.head.column };
  chaserSnake.growPending = 0; // Track pending growth

  // Start chaser in a corner opposite to where player might be
  var startRow = ROWS - 3;
  var startColumn = COLUMNS - 3;

  // Create initial chaser snake body (3 segments)
  makeChaserSquare(startRow, startColumn);
  makeChaserSquare(startRow, startColumn - 1);
  makeChaserSquare(startRow, startColumn - 2);

  chaserSnake.head = chaserSnake.body[0];
  chaserSnake.tail = chaserSnake.body[chaserSnake.body.length - 1];
}

// Create a single chaser snake segment and add it to the chaser's body
function makeChaserSquare(row, column) {
  var chaserSquare = {};

  chaserSquare.element = $("<div>").addClass("chaser-snake").appendTo(board);
  chaserSquare.row = row;
  chaserSquare.column = column;

  repositionSquare(chaserSquare);

  // Mark the head visually
  if (chaserSnake.body.length === 0) {
    chaserSquare.element.attr("id", "chaser-head");
  }

  chaserSnake.body.push(chaserSquare);
  chaserSnake.tail = chaserSquare;
}

// Update chaser snake's position and strategy every few game ticks
function updateChaserSnake() {
  chaserSnake.moveCounter++;
  if (typeof chaserSnake.speed === "undefined") chaserSnake.speed = 1.8;
  if (chaserSnake.moveCounter < chaserSnake.speed) return;
  chaserSnake.moveCounter = 0;

  // Occasionally change AI strategy for unpredictability (more often)
  // Switch strategy less often (5%) and prioritize "hunt" when far away
if (Math.random() < 0.05) {
  var distanceToPlayer = Math.abs(chaserSnake.head.row - snake.head.row) + Math.abs(chaserSnake.head.column - snake.head.column);

  if (distanceToPlayer > 12) {
    chaserSnake.strategy = "hunt"; // Just chase when player is far
  } else {
    var strategies = ["hunt", "intercept", "ambush"];
    chaserSnake.strategy = strategies[Math.floor(Math.random() * strategies.length)];
  }
}


  // Decide next move based on current strategy
  var nextMove = calculateChaserMove();
  moveChaserSnake(nextMove);
}

// Decide the next move for the chaser snake based on its strategy
function calculateChaserMove() {
  var headRow = chaserSnake.head.row;
  var headCol = chaserSnake.head.column;
  var playerRow = snake.head.row;
  var playerCol = snake.head.column;

  // All possible moves (including diagonals for smarter AI)
  var possibleMoves = [
    { row: headRow - 1, column: headCol, direction: "up" },
    { row: headRow + 1, column: headCol, direction: "down" },
    { row: headRow, column: headCol - 1, direction: "left" },
    { row: headRow, column: headCol + 1, direction: "right" },
    // Diagonal moves for more intelligent movement
    { row: headRow - 1, column: headCol - 1, direction: "up-left" },
    { row: headRow - 1, column: headCol + 1, direction: "up-right" },
    { row: headRow + 1, column: headCol - 1, direction: "down-left" },
    { row: headRow + 1, column: headCol + 1, direction: "down-right" }
  ];

  // Filter out moves that would hit a wall or collide with a snake
  possibleMoves = possibleMoves.filter(function(move) {
    return isValidChaserMove(move.row, move.column);
  });

  if (possibleMoves.length === 0) {
    // If no valid moves, try to find any available space (emergency)
    return findEmergencyMove();

    // If it didn’t actually move (got stuck), force emergency move
  if (chaserSnake.head.row === chaserSnake.body[1].row && chaserSnake.head.column === chaserSnake.body[1].column) {
    console.log("Chaser stuck! Forcing emergency move.");
        var emergencyMove = findEmergencyMove();
          if (emergencyMove) {
    moveChaserSnake(emergencyMove);
  }
}

  }

  var bestMove;

  // Choose move based on current AI strategy
  switch (chaserSnake.strategy) {
    case "hunt":
      bestMove = huntPlayer(possibleMoves, playerRow, playerCol);
      break;
    case "intercept":
      bestMove = interceptPlayer(possibleMoves, playerRow, playerCol);
      break;
    case "ambush":
      bestMove = ambushPlayer(possibleMoves, playerRow, playerCol);
      break;
    default:
      // Fallback: random move
      bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  // Make the AI more challenging: if multiple moves are equally good, prefer the one that gets closer to the player's head direction
  if (bestMove && Math.random() < 0.4) {
    var playerDir = snake.head.direction;
    var dirMap = {
      "up":    { row: -1, column: 0 },
      "down":  { row: 1, column: 0 },
      "left":  { row: 0, column: -1 },
      "right": { row: 0, column: 1 }
    };
    if (dirMap[playerDir]) {
      var targetRow = playerRow + dirMap[playerDir].row;
      var targetCol = playerCol + dirMap[playerDir].column;
      var closerMoves = possibleMoves.filter(function(move) {
        return move.row === targetRow && move.column === targetCol;
      });
      if (closerMoves.length > 0) {
        bestMove = closerMoves[0];
      }
    }
  }

  return bestMove || possibleMoves[0];
}

// "Hunt" strategy: move directly toward the player's current position
function huntPlayer(moves, playerRow, playerCol) {
  var bestMove = moves[0];
  var minDistance = Infinity;

  moves.forEach(function(move) {
    // Manhattan distance
    var distance = Math.abs(move.row - playerRow) + Math.abs(move.column - playerCol);
    // Prefer moves that are not diagonal for more direct pursuit
  if (distance < minDistance || 
    (distance === minDistance && !move.direction.includes("-"))) {
      minDistance = distance;
      bestMove = move;
    }
  });

  return bestMove;
}

// "Intercept" strategy: try to predict where the player will be and move there
function interceptPlayer(moves, playerRow, playerCol) {
  var predictedPlayerPos = predictPlayerPosition();

  var bestMove = moves[0];
  var minDistance = Infinity;

  moves.forEach(function(move) {
    var distance = Math.abs(move.row - predictedPlayerPos.row) +
                   Math.abs(move.column - predictedPlayerPos.column);
    if (distance < minDistance) {
      minDistance = distance;
      bestMove = move;
    }
  });

  return bestMove;
}

// "Ambush" strategy: try to cut off the player's escape routes
function ambushPlayer(moves, playerRow, playerCol) {
  var bestMove = moves[0];
  var maxStrategicValue = -1;

  moves.forEach(function(move) {
    var strategicValue = calculateStrategicValue(move, playerRow, playerCol);
    if (strategicValue > maxStrategicValue) {
      maxStrategicValue = strategicValue;
      bestMove = move;
    }
  });

  return bestMove;
}

// Predict where the player will be in a few moves based on their direction
function predictPlayerPosition() {
  var currentDir = snake.head.direction || "right";
  var nextRow = snake.head.row;
  var nextCol = snake.head.column;

  // Predict 3 moves ahead for more aggressive interception
  var steps = 3;
  for (var i = 0; i < steps; i++) {
    switch (currentDir) {
      case "left": nextCol--; break;
      case "right": nextCol++; break;
      case "up": nextRow--; break;
      case "down": nextRow++; break;
    }
  }

  return { row: nextRow, column: nextCol };
}

// Assign a "strategic value" to a move for the ambush strategy
function calculateStrategicValue(move, playerRow, playerCol) {
  var value = 0;

  // Prefer positions not too close or too far from player
  var distance = Math.abs(move.row - playerRow) + Math.abs(move.column - playerCol);
  if (distance >= 2 && distance <= 5) {
    value += 12;
  }

  // Bonus for positions near walls (harder for player to escape)
  if (move.row <= 1 || move.row >= ROWS - 2) value += 2;
  if (move.column <= 1 || move.column >= COLUMNS - 2) value += 2;


  // Bonus for positions that could cut off player's path to apple
  var playerToApple = Math.abs(playerRow - apple.row) + Math.abs(playerCol - apple.column);
  var moveToApple = Math.abs(move.row - apple.row) + Math.abs(move.column - apple.column);
  if (moveToApple < playerToApple) value += 10;

  return value;
}

// Check if a move is valid (not hitting wall or colliding with snakes)
function isValidChaserMove(row, column) {
  // Check walls
  if (row < 0 || row >= ROWS || column < 0 || column >= COLUMNS) {
    return false;
  }

  // Check collision with chaser's own body
  for (var i = 0; i < chaserSnake.body.length; i++) {
    if (chaserSnake.body[i].row === row && chaserSnake.body[i].column === column) {
      return false;
    }
  }

  // Check collision with player snake body (but allow collision with head for killing)
  for (var j = 1; j < snake.body.length; j++) {
    if (snake.body[j].row === row && snake.body[j].column === column) {
      return false;
    }
  }

  return true;
}

// If no normal moves are possible, try any adjacent space (emergency)
function findEmergencyMove() {
  var headRow = chaserSnake.head.row;
  var headCol = chaserSnake.head.column;

  // Try all adjacent positions
  for (var dr = -1; dr <= 1; dr++) {
    for (var dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      var newRow = headRow + dr;
      var newCol = headCol + dc;

      if (isValidChaserMove(newRow, newCol)) {
        return { row: newRow, column: newCol, direction: "emergency" };
      }
    }
  }

  return null; // No valid moves found
}

// Move the chaser snake's body and head to the next position
function moveChaserSnake(nextMove) {
  if (!nextMove) return;

  // Grow if pending
  if (chaserSnake.growPending > 0) {
    // Add new segment at tail's previous position
    var tail = chaserSnake.tail;
    makeChaserSquare(tail.row, tail.column);
    chaserSnake.growPending--;
  }

  // Move body parts (from tail to head)
  for (var i = chaserSnake.body.length - 1; i > 0; i--) {
    var chaserSquare = chaserSnake.body[i];
    var nextChaserSquare = chaserSnake.body[i - 1];

    chaserSquare.row = nextChaserSquare.row;
    chaserSquare.column = nextChaserSquare.column;
    repositionSquare(chaserSquare);
  }

  // Move head to the new position
  chaserSnake.head.row = nextMove.row;
  chaserSnake.head.column = nextMove.column;
  repositionSquare(chaserSnake.head);
}

// Check if the player's head has collided with any part of the chaser snake
function hasCollidedWithChaser() {
  // Defensive: If chaserSnake.body is undefined or empty, no collision
  if (!chaserSnake.body || chaserSnake.body.length === 0) return false;
  for (var i = 0; i < chaserSnake.body.length; i++) {
    if (
      snake.head.row === chaserSnake.body[i].row &&
      snake.head.column === chaserSnake.body[i].column
    ) {
      return true;
    }
  }
  return false;
}

// --- GROW CHASER EVERY 2 APPLES ---

// Wrap the original handleAppleCollision to grow chaser every 2 apples
var rbHandleAppleCollisionChaser = handleAppleCollision;
handleAppleCollision = function() {
  rbHandleAppleCollisionChaser();
  if (score > 0 && score % 5 === 0) {
    chaserSnake.growPending++;
  }
};

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
  if (isPaused) return;

  // TODO 5b: Fill in the update function's code block
  moveSnake();
  updateChaserSnake(); // Update chaser snake

  if (hasHitWall() || hasCollidedWithSnake() || hasCollidedWithChaser()) {
    endGame();
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}


function checkForNewDirection(event) {
  // Only allow direction changes if the new direction is perpendicular or not directly opposite to the current direction
  var dir = snake.head.direction;

  // Arrow keys
  if (activeKey === KEY.LEFT && dir !== "right") snake.head.direction = "left";
  else if (activeKey === KEY.RIGHT && dir !== "left") snake.head.direction = "right";
  else if (activeKey === KEY.UP && dir !== "down") snake.head.direction = "up";
  else if (activeKey === KEY.DOWN && dir !== "up") snake.head.direction = "down";
  // WASD keys
  else if (activeKey === KEY.A && dir !== "right") snake.head.direction = "left";
  else if (activeKey === KEY.D && dir !== "left") snake.head.direction = "right";
  else if (activeKey === KEY.W && dir !== "down") snake.head.direction = "up";
  else if (activeKey === KEY.S && dir !== "up") snake.head.direction = "down";
}

function moveSnake() {
  /* 
  TODO 11: Move each part of the snake's body such that it's body follows the head.
  
  HINT: To complete this TODO we must figure out the next direction, row, and 
  column for each snakeSquare in the snake's body. The parts of the snake are 
  stored in the Array snake.body and each part knows knows its current 
  column/row properties. 
  
  */
 for (var i = snake.body.length - 1; i > 0; i--) {
    var snakeSquare = snake.body[i];

    var nextSnakeSquare = snake.body[i - 1];
    var nextRow = nextSnakeSquare.row;
    var nextColumn = nextSnakeSquare.column;
    var nextDirection = nextSnakeSquare.direction;

    snakeSquare.direction = nextDirection;
    snakeSquare.row = nextRow;
    snakeSquare.column = nextColumn;
    repositionSquare(snakeSquare);
 }


  //Before moving the head, check for a new direction from the keyboard input
  checkForNewDirection();

  /* 
  TODO 7: determine the next row and column for the snake's head
  
  HINT: The snake's head will need to move forward 1 square based on the value
  of snake.head.direction which may be one of "left", "right", "up", or "down"
  */

  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  }
  else if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  }
  else if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1;
  }
  else if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1;
  }
  repositionSquare(snake.head);
}


function hasHitWall() {
  /* 
  TODO 8: Should return true if the snake's head has collided with the four walls of the
  board, false otherwise.
  
  HINT: What will the row and column of the snake's head be if this were the case?
  */

  // Return true if the snake head has moved beyond the left wall

  // debugger;
  if (snake.head.column < 0) {
    return true;
  }

  // Return true if the snake head has moved beyond the right wall
  if (snake.head.column >= COLUMNS) {
    return true;
  }

  // Return true if the snake head has moved above the top wall
  if (snake.head.row < 0) {
    return true;
  }

  // Return true if the snake head has moved below the bottom wall
  if (snake.head.row >= ROWS) {
    return true;
  }

  // If none of the above conditions are met, the snake has not hit a wall
  return false;
}

function hasCollidedWithApple() {
  /* 
  TODO 9: Should return true if the snake's head has collided with the apple, 
  false otherwise
  
  HINT: Both the apple and the snake's head are aware of their own row and column
  */
  if (snake.head.row === apple.row && snake.head.column === apple.column) {
    return true;
  }

  return false;
}
 

function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);
  increaseChaserSpeedIfNeeded();

  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();

  /* 
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
  
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right. 
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */
  var row = 0;
  var column = 0;

  // code to determine the row and column of the snakeSquare to add to the snake
  if (snake.tail.direction === "left") {
    row = snake.tail.row; // if the tail is moving left, the next square will be to the right
    column = snake.tail.column + 1; // so we add 1 to the column
  } else if (snake.tail.direction === "right") {
    row = snake.tail.row; // if the tail is moving right, the next square will be to the left
    column = snake.tail.column - 1; // so we subtract 1 from the column
  } else if (snake.tail.direction === "up") {
    row = snake.tail.row + 1; // if the tail is moving up, the next square will be below it
    column = snake.tail.column; // so we keep the column the same
  } else if (snake.tail.direction === "down") {
    row = snake.tail.row - 1; // if the tail is moving down, the next square will be above it
    column = snake.tail.column; // so we keep the column the same
  }
  // make a new snakeSquare at the determined row and column
  // and add it to the snake's body
  // makeSnakeSquare(row, column) will create a new snakeSquare and add it to the snake's body
  // and position it on the screen
  // This will also set the new tail to the new snakeSquare
  // so the snake will grow by one square

  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
for(var i = 1; i < snake.body.length; i++) {
    if (snake.body[0].row === snake.body[i].row && snake.body[0].column === snake.body[i].column) {
      return true;
      endGame();
    }
  }

  
  /* 
  TODO 12: Should return true if the snake's head has collided with any part of the
  snake's body.
  
  HINT: Each part of the snake's body is stored in the snake.body Array. The
  head and each part of the snake's body also knows its own row and column.
  
  */


  return false;
}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);

  // clear board of all elements
  board.empty();

  // Remove chaser snake DOM elements and reset chaser state
  if (chaserSnake.body) {
    chaserSnake.body.forEach(function(part) {
      if (part.element) part.element.remove();
    });
    chaserSnake.body = [];
    chaserSnake.head = null;
    chaserSnake.tail = null;
    chaserSnake.moveCounter = 0;
    chaserSnake.growPending = 0;
    chaserSnake.tick = 0;
    chaserSnake.speed = 1.8; // <-- Reset chaser speed to default on game over
  }

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 1000 ms
  setTimeout(init, 1000);

  console.log("endGame");
  updateDeathCountDisplay();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  // TODO 4b-1: Fill in the makeApple() code block
  // make the apple jQuery Object and append it to the board
  apple.element = $("<div>").addClass("apple").appendTo(board);

  // get a random available row/column on the board
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  // position the apple on the screen
  repositionSquare(apple);
}

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {
  // TODO 4c-1: Fill in this function's code block
    // initialize a new snakeSquare Object
  var snakeSquare = {};

  // make the snakeSquare.element Object and append it to the board
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);

  // initialize the row and column properties on the snakeSquare Object
  snakeSquare.row = row;
  snakeSquare.column = column;

  // set the position of the snake on the screen
  repositionSquare(snakeSquare);

  // if this is the head, add the snake-head id
  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  // add snakeSquare to the end of the body Array and set it as the new tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}



function handleKeyDown(event) {
  activeKey = event.which;
  // Toggle pause with "P" (key code 80)
  if (activeKey === 80) {
    togglePause();
    return; // Don't process movement if pausing
  }
 // console.log(activeKey);
}
    
/* Given a gameSquare (which may be a snakeSquare or the apple), position
 * the gameSquare on the screen.
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}

/* Returns a (row,column) Object that is not occupied by another game component
 */

function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};

  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * (COLUMNS - 2 * APPLE_MARGIN)) + APPLE_MARGIN;
    randomPosition.row = Math.floor(Math.random() * (ROWS - 2 * APPLE_MARGIN)) + APPLE_MARGIN;
    spaceIsAvailable = true;

    // Check if position is occupied by the player snake
    for (var i = 0; i < snake.body.length; i++) {
      if (snake.body[i].row === randomPosition.row && snake.body[i].column === randomPosition.column) {
        spaceIsAvailable = false;
      }
    }

    // Check if position is occupied by the chaser snake (defensive)
    if (chaserSnake.body && chaserSnake.body.length > 0) {
      for (var j = 0; j < chaserSnake.body.length; j++) {
        if (chaserSnake.body[j].row === randomPosition.row && chaserSnake.body[j].column === randomPosition.column) {
          spaceIsAvailable = false;
        }
      }
    }
  }

  return randomPosition;
}

function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}

/*
  _____                 _                      
 |  __ \               | |                     
 | |__) |___  ___  __ _| |__   ___  _ __   ___ 
 |  _  // _ \/ _ \/ _` | '_ \ / _ \| '_ \ / _ \
 | | \ \  __/  __/ (_| | |_) | (_) | | | |  __/
 |_|  \_\___|\___|\__, |_.__/ \___/|_| |_|\___|
                     | |                       
                     |_|   () Extras  ()
*/

// Variable to keep track of deaths (wall hits or self collisions)
var deathCount = 0; // use a number to count deaths

// Display death count on the page
var deathCountElement = $("#deathCount"); // Grabs the html element with the ID deathCount using jQuery.

// Function that updates the text on the screen that will display how much times player has died
function updateDeathCountDisplay() {
  if (deathCountElement.length) {
    deathCountElement.text("Deaths: " + deathCount); // 460m checks if deathCountElement exists if it does it updates the text inside the element to show the number of deaths.
  }  // Above coment is done through jQuery
}

// Wrap the original endGame to count deaths
var rbEndGame = endGame;  // stores endGame() function within a new variable called rbEndGame. 
// I edit the code for endGame so its logged inside a console anytime a border is reached, rbEndGame will get all this data and store it in the deathCount variable.
endGame = function() { // replacing the original endGame function, but still keeps its original code and data. Acts as a backup for storing data
  deathCount++;
  updateDeathCountDisplay();
  rbEndGame();
};

///////////////
// Increase game speed each time apple is aten
 
// Lines 472 - 476 has same idea as lines 460 - 465, but this time it is used to increase the game speed each time an apple is eaten.
var rbHandleAppleCollision = handleAppleCollision; // stores handleAppleCollision() function within a new variable called rbHandleAppleCollision.
handleAppleCollision = function() { // replacing the original handleAppleCollision function, but still keeps its original code and data. Acts as a backup for storing data
  rbHandleAppleCollision(); // Calls the original handleAppleCollision function to keep its functionality
  increaseGameSpeed(); // Calls the increaseGameSpeed function to increase the game speed each time an apple is eaten
 // console.log("Apple eaten! Speed increased!"); // Debugging purposes to see if the speed is increasing
};


function increaseGameSpeed() {
  // Decrease interval time by 3 ms, but don't go below a minimum of 30fps (33ms)
  snake.intervalTime =  (snake.intervalTime - 3); // makes sure that a boundry is set so the game does not go too fast
  clearInterval(updateInterval); // Clear the existing interval and updates the game with a new one
  updateInterval = setInterval(update, snake.intervalTime); // Set a new interval with the updated speed
  console.log("Game speed has increased! New interval time: " + snake.intervalTime + "ms"); //debugging purposes to see if the speed is increasing 

   // Boundry Condtional:
  if (snake.intervalTime < 33){
    alert("You have won the game!") // Game is running at unreasonable speed, so the game is over
    endGame();
  }
  /*
  else if (score >= 27) { // It takes about 26 apples to win the game (winning game is reaching 35mms speed)
    alert("Who the HELL ate all MY APPLES!?!"); //Game is running at unreasonable speed, so the game is over
    endGame();
  }
    */
  else if (snake.intervalTime >= 33) { 
    // do nothing, the game is still running at a reasonable speed
  }
}

// Pause Function
function togglePause() {
  isPaused = !isPaused;

  if (isPaused) {
    clearInterval(updateInterval);
    if (!$("#pause-message").length) {
      $("<div id='pause-message'>Paused</div>")
        .css({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "2em",
          background: "rgba(0,0,0,0.7)",
          padding: "10px 20px",
          borderRadius: "10px",
          zIndex: 1000
        })
        .appendTo("body");
    }
  } else {
    $("#pause-message").remove();
    updateInterval = setInterval(update, snake.intervalTime);
    requestAnimationFrame(render); // Restart visuals on unpause
  }
}

// Makes game look smoother

function render() {
  if (isPaused) {
    requestAnimationFrame(render);
    return;
  }

  // Reposition all player snake squares
  snake.body.forEach(repositionSquare);

  // Reposition chaser snake squares (defensive)
  if (chaserSnake.body && chaserSnake.body.length > 0) {
    chaserSnake.body.forEach(repositionSquare);
  }

  // Reposition the apple
  if (apple && apple.element) {
    repositionSquare(apple);
  }

  // Loop to next animation frame
  requestAnimationFrame(render);
}

function increaseChaserSpeedIfNeeded() {
  // Only increase speed every 3 apples (score is a multiple of 3, but not zero)
  if (score > 0 && score % 3 === 0) {
    // Lower moveCounter threshold to make chaser move more often (faster)
    if (typeof chaserSnake.speed === "undefined") {
      chaserSnake.speed = 1.8; // default starting value from your code
    }
    chaserSnake.speed = Math.max(0.2, chaserSnake.speed - 0.3); // Decrease threshold, min 0.2 for sanity
  }
}