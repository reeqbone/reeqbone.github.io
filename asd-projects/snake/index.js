//  Set Score Debug Feature
function setScoreDebug(newScore) {
  // Clamp to 0-20 only, and show error if above 20
  newScore = parseInt(newScore);
  if (isNaN(newScore) || newScore < 0) newScore = 0;
  if (newScore > 20) {
    alert("Score cannot be set above 20!");
    return;
  }
  score = newScore;
  scoreElement.text("Score: " + score);

  //  Snake body management 
  // Remove all but the head
  if (snake.body && snake.body.length > 1) {
    for (let i = snake.body.length - 1; i > 0; i--) {
      if (snake.body[i].element) snake.body[i].element.remove();
    }
    snake.body = [snake.body[0]];
    snake.tail = snake.body[0];
  }
  // Grow or shrink snake to match score and handle >=21 logic
  let growMode = score < 21;
  let segments = growMode ? score : 1; // If score >=21, only head remains
  for (let i = 1; i <= segments; i++) {
    let row = snake.tail.row, column = snake.tail.column;
    if (snake.tail.direction === "left") column += 1;
    else if (snake.tail.direction === "right") column -= 1;
    else if (snake.tail.direction === "up") row += 1;
    else if (snake.tail.direction === "down") row -= 1;
    makeSnakeSquare(row, column);
  }

  // --- Chaser body management ---
  if (chaserSnake.body && chaserSnake.body.length > 1) {
    for (let i = chaserSnake.body.length - 1; i > 0; i--) {
      if (chaserSnake.body[i].element) chaserSnake.body[i].element.remove();
    }
    chaserSnake.body = [chaserSnake.body[0]];
    chaserSnake.tail = chaserSnake.body[0];
  }
  // Always ensure chaserSnake.growPending is reset
  chaserSnake.growPending = 0;
  // if (score >= 21) {
  //   // Only head remains for chaser, do NOT add any segments
  //   // Also ensure tail is set to head
  //   chaserSnake.tail = chaserSnake.body[0];
  // } else {
  //   // Regular chaser growth (every 2 apples)
  //   let chaserSegments = Math.floor(score / 2);
  //   for (let i = 1; i <= chaserSegments; i++) {
  //     let row = chaserSnake.tail.row, column = chaserSnake.tail.column;
  //     if (chaserSnake.tail.direction === "left") column += 1;
  //     else if (chaserSnake.tail.direction === "right") column -= 1;
  //     else if (chaserSnake.tail.direction === "up") row += 1;
  //     else if (chaserSnake.tail.direction === "down") row -= 1;
  //     makeChaserSquare(row, column);
  //   }
  // }
  // Always grow chaser at multiples of 2
  let chaserSegments = Math.floor(score / 2);
  for (let i = 1; i <= chaserSegments; i++) {
    let row = chaserSnake.tail.row, column = chaserSnake.tail.column;
    if (chaserSnake.tail.direction === "left") column += 1;
    else if (chaserSnake.tail.direction === "right") column -= 1;
    else if (chaserSnake.tail.direction === "up") row += 1;
    else if (chaserSnake.tail.direction === "down") row -= 1;
    makeChaserSquare(row, column);
  }

  // Update speed as if apples were eaten
  snake.intervalTime = 115;
  for (let i = 0; i < score; i++) {
    increaseGameSpeed();
  }
}

// Keyboard shortcut: Shift+S to set score
$('body').off('keydown.setScore').on('keydown.setScore', function(event) {
  if (event.shiftKey && event.key.toLowerCase() === 's') {
    let val = prompt('Set score to:', score);
    if (val !== null && !isNaN(parseInt(val))) {
      setScoreDebug(parseInt(val));
    }
  }
});
/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let gameRunning = false;

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
  // Add info UI if not already present
  if (!document.getElementById("gameInfo")) {
    const infoBox = document.createElement("div");
    infoBox.id = "gameInfo";
    ["speedDisplay", "strategyDisplay", "chaserSpeedDisplay"].forEach(id => {
      const div = document.createElement("div");
      div.id = id;
      div.className = "info-box";
      infoBox.appendChild(div);
    });
    document.body.appendChild(infoBox);
  }

  // Clear previous game if any
  clearInterval(updateInterval);
  $(".snake-square, .chaser-square, .apple").remove(); // clean up all squares
  isPaused = false;
  score = 0;
  // TODO 4c-2: initialize the snake
  // initialize the snake's body as an empty Array
  snake.body = [];

  // make the first snakeSquare and set it as the head
  makeSnakeSquare(10, 10); // Places snake at the center of the board
  snake.head = snake.body[0];

  chaserSnake = {};  // Reset chaser snake state
  // Initialize chaser snake - starts at a corner
  initializeChaserSnake();

  // TODO 4b-2: initialize the apple
  makeApple(); // Randomly places apple

  // TODO 5a: Initialize the interval
  // start update interval
  // Set initial interval time
  
  snake.intervalTime = 115; // Anytime an apple is eaten, the game increases in speed // Functional,ity is found in Extras section
  clearInterval(updateInterval);
    updateInterval = setInterval(update, snake.intervalTime);//16.6 = 60fps //33.333333333333336 = 30 fps // 100 = 10 fps
  requestAnimationFrame(render);

}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// CHASER SNAKE FUNCTIONS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Initialize the chaser snake with starting position and properties
function initializeChaserSnake() {
  // Track last move for stuck detection
  chaserSnake.lastMoveTime = Date.now();
  chaserSnake.lastHeadRow = null;
  chaserSnake.lastHeadCol = null;
  chaserSnake.lastDistanceToPlayer = null;
  chaserSnake.lastMoveDirection = null;
  chaserSnake.repeatMoveCounter = 0;
  chaserSnake.lastStrategy = null;
  chaserSnake.strategyChangeCounter = 0;

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

  var distanceToPlayer = Math.abs(chaserSnake.head.row - snake.head.row) + Math.abs(chaserSnake.head.column - snake.head.column);

  // Apple Hunt logic is exclusive: if in Apple Hunt or Standby, ignore all other strategy logic
  if (chaserSnake.strategy === "Apple Hunt" || chaserSnake.strategy === "Apple Hunt Standby") {
    // If in Apple Hunt Standby, check if time is up
    if (chaserSnake.strategy === "Apple Hunt Standby") {
      if (Date.now() - chaserSnake.appleHuntWaitStart > 5500) {
        chaserSnake.strategy = null;
        chaserSnake.appleHuntWaitStart = null;
        chaserSnake.appleHuntCooldown = true;
        setTimeout(function() { chaserSnake.appleHuntCooldown = false; }, 45000); // 45 seconds cooldown
      }
    }
    var nextMove = calculateChaserMove();
    moveChaserSnake(nextMove);
    return;
  }

  // Only run normal chaser logic if not in Apple Hunt or Standby
  if (chaserSnake.moveCounter % 2 === 0) {
    if (distanceToPlayer > 10) {
      chaserSnake.strategy = "hunt";
    } else if (distanceToPlayer > 5) {
      chaserSnake.strategy = "intercept";
    } else {
      chaserSnake.strategy = "ambush";
    }

    if (Math.random() < 0.4) { // Increase randomness
      var options = ["hunt", "intercept", "ambush"];
      var newStrategy = options[Math.floor(Math.random() * options.length)];
      if (newStrategy !== chaserSnake.strategy) {
        chaserSnake.strategy = newStrategy;
      }
    }
  }

  if (chaserSnake.lastStrategy !== chaserSnake.strategy) {
    chaserSnake.lastStrategy = chaserSnake.strategy;
    chaserSnake.strategyChangeCounter++;
  }

  // Apple Hunt strategy: only after score 21 and with 20% chance, and only if not on cooldown
  if (score >= 21 && !chaserSnake.appleHuntCooldown && Math.random() < 0.20) {
    chaserSnake.strategy = "Apple Hunt";
  }
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
    // console.log("Chaser stuck! Forcing emergency move.");
        var emergencyMove = findEmergencyMove();
          if (emergencyMove) {
    moveChaserSnake(emergencyMove);
  }
}

  }

  var bestMove;
  // Helper: prefer moves that actually change position
  function preferMovingMove(moves) {
    return moves.filter(function(move) {
      return move.row !== chaserSnake.head.row || move.column !== chaserSnake.head.column;
    });
  }

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
    case "Apple Hunt":
      // Go for the apple: pick move that minimizes distance to apple
      var minAppleDist = Infinity;
      possibleMoves.forEach(function(move) {
        var dist = Math.abs(move.row - apple.row) + Math.abs(move.column - apple.column);
        if (dist < minAppleDist) {
          minAppleDist = dist;
          bestMove = move;
        }
      });
      // If chaser reaches apple, switch to wait mode
      if (bestMove && bestMove.row === apple.row && bestMove.column === apple.column) {
        chaserSnake.strategy = "Apple Hunt Standby";
        chaserSnake.appleHuntWaitStart = Date.now();
      }
      break;
    case "Apple Hunt Standby":
      // If player is adjacent to apple, chaser should try to intercept/attack the player
      var playerNearApple = (Math.abs(playerRow - apple.row) <= 1 && Math.abs(playerCol - apple.column) <= 1);
      if (playerNearApple) {
        // Move toward the player (attack/guard apple)
        bestMove = huntPlayer(possibleMoves, playerRow, playerCol);
      } else {
        // Just guard the apple: pick any adjacent square around apple (not on top of apple)
        var adjMoves = possibleMoves.filter(function(move) {
          var dr = Math.abs(move.row - apple.row);
          var dc = Math.abs(move.column - apple.column);
          return (dr <= 1 && dc <= 1) && !(move.row === apple.row && move.column === apple.column);
        });
        if (adjMoves.length > 0) {
          bestMove = adjMoves[Math.floor(Math.random() * adjMoves.length)];
        } else {
          // As last resort, pick any move
          bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }
      }
      break;
    default:
      // Fallback: random move
      bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  // Make the AI more challenging: if multiple moves are equally good, prefer the one that gets closer to the player's head direction
  if (bestMove && Math.random() < 0.9) {
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
// FINAL CHECK: If player is adjacent, override strategy and kill
    var dx = Math.abs(headRow - playerRow);
    var dy = Math.abs(headCol - playerCol);
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
      var killerMove = possibleMoves.find(function(move) {
        return move.row === playerRow && move.column === playerCol;
      });
      if (killerMove) {
        return killerMove;
      }
    }

    if (!bestMove && possibleMoves.length > 0) {
      bestMove = huntPlayer(possibleMoves, playerRow, playerCol); // fallback to hunt
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
  var steps = 4;
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
  var distance = Math.abs(move.row - playerRow) + Math.abs(move.column - playerCol);
  if (distance >= 1 && distance <= 6) value += 20;
  if (move.row <= 1 || move.row >= ROWS - 2) value += 2;
  if (move.column <= 1 || move.column >= COLUMNS - 2) value += 2;

  var playerToApple = Math.abs(playerRow - apple.row) + Math.abs(playerCol - apple.column);
  var moveToApple = Math.abs(move.row - apple.row) + Math.abs(move.column - apple.column);
  if (moveToApple < playerToApple) value += 15;

  if (Math.abs(move.row - playerRow) <= 1 && Math.abs(move.column - playerCol) <= 1) {
    value += 10;
    
  }

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

  if (chaserSnake.lastMoveDirection === nextMove.direction) {
  chaserSnake.repeatMoveCounter++;
  } else {
  chaserSnake.repeatMoveCounter = 0;
  }
  chaserSnake.lastMoveDirection = nextMove.direction;

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

// --- GROW CHASER EVERY X APPLES ---

// Wrap the original handleAppleCollision to grow chaser every 3 apples (3, 6, 9, ...)
var rbHandleAppleCollisionChaser = handleAppleCollision;
handleAppleCollision = function() {
  rbHandleAppleCollisionChaser();
  if (score > 0 && score % 2 === 0) {
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
  // Update UI info
  const speedEl = document.getElementById("speedDisplay");
  const chaserSpeedEl = document.getElementById("chaserSpeedDisplay");
  const stratEl = document.getElementById("strategyDisplay");
  if (speedEl) speedEl.textContent = "Snake speed: " + snake.intervalTime + "ms";
  if (stratEl) stratEl.textContent = "Chaser strategy: " + (chaserSnake.strategy || "default");
  if (chaserSpeedEl) chaserSpeedEl.textContent = "Chaser speed: " + (typeof chaserSnake.speed === "number" ? chaserSnake.speed.toFixed(2) : "-") + " ticks";
  if (isPaused) return;

  // Move snakes
  moveSnake();
  updateChaserSnake();

  // Only process one event per tick, in priority order:
  // 1. Wall/self/chaser collision (game over)
  // 2. Apple collision (only if not game over)
  if (hasHitWall() || hasCollidedWithSnake() || hasCollidedWithChaser()) {
    endGame();
    return; // Prevent further processing this tick
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

  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();

  // --- Snake body management ---
  // if (score >= 21) {
  //   // If snake is longer than 1, remove tail instead of growing
  //   if (snake.body.length > 1) {
  //     let tail = snake.body.pop();
  //     if (tail.element) tail.element.remove();
  //     snake.tail = snake.body[snake.body.length - 1];
  //   } else {
  //     // If only head remains, start growing again as normal
  //     addSnakeSegmentAtTail();
  //   }
  // } else {
  //   // Regular growth before score 21
  //   addSnakeSegmentAtTail();
  // }
  // Always grow
  addSnakeSegmentAtTail();

  // --- Chaser body management ---
  // if (score >= 21) {
  //   // Remove chaser tail if longer than 1
  //   if (chaserSnake.body && chaserSnake.body.length > 1) {
  //     let tail = chaserSnake.body.pop();
  //     if (tail.element) tail.element.remove();
  //     chaserSnake.tail = chaserSnake.body[chaserSnake.body.length - 1];
  //   } else {
  //     // If only head remains, start growing again as normal
  //     chaserSnake.growPending++;
  //   }
  // }
}

// Helper to add a segment at the snake's tail (same logic as before)
function addSnakeSegmentAtTail() {
  var row = 0;
  var column = 0;
  if (snake.tail.direction === "left") {
    row = snake.tail.row;
    column = snake.tail.column + 1;
  } else if (snake.tail.direction === "right") {
    row = snake.tail.row;
    column = snake.tail.column - 1;
  } else if (snake.tail.direction === "up") {
    row = snake.tail.row + 1;
    column = snake.tail.column;
  } else if (snake.tail.direction === "down") {
    row = snake.tail.row - 1;
    column = snake.tail.column;
  }
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
  clearInterval(updateInterval);
  updateInterval = null;
  isPaused = true;
  clearInterval(updateInterval);
  board.empty();
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
    chaserSnake.speed = 1.8; // Reset speed
    chaserSnake.lastMoveDirection = null;
    chaserSnake.lastStrategy = null;
    chaserSnake.strategyChangeCounter = 0;
    chaserSnake.repeatMoveCounter = 0;
  }
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;
  setTimeout(init, 1000);
  gameRunning = false
 // console.log("endGame");
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
  if (activeKey === 80) {
    togglePause();
    return;
  }

  // Only allow direction changes when game is not paused
  if (!isPaused) {
    checkForNewDirection();
  }
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
  var attempts = 0;
  var maxAttempts = 1000;
  while (!spaceIsAvailable && attempts < maxAttempts) {
    randomPosition.column = Math.floor(Math.random() * (COLUMNS - 2 * APPLE_MARGIN)) + APPLE_MARGIN;
    randomPosition.row = Math.floor(Math.random() * (ROWS - 2 * APPLE_MARGIN)) + APPLE_MARGIN;
    spaceIsAvailable = true;
    for (var i = 0; i < snake.body.length; i++) {
      if (snake.body[i].row === randomPosition.row && snake.body[i].column === randomPosition.column) {
        spaceIsAvailable = false;
      }
    }
    if (chaserSnake.body && chaserSnake.body.length > 0) {
      for (var j = 0; j < chaserSnake.body.length; j++) {
        if (chaserSnake.body[j].row === randomPosition.row && chaserSnake.body[j].column === randomPosition.column) {
          spaceIsAvailable = false;
        }
      }
    }
    attempts++;
  }
  if (attempts >= maxAttempts) {
    // fallback: just return (0,0)
    return { row: 0, column: 0 };
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
  gameRunning = false;
  isPaused = false;
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
  // Decrease interval time by 3 ms, but don't go below a minimum of 58ms (endless mode)
  // if (snake.intervalTime === 79 || score === 11) {
  //   snake.intervalTime -= 5;
  // }
  if (snake.intervalTime > 88) {
    snake.intervalTime -= 3;
  } else if (snake.intervalTime > 63) {
    snake.intervalTime -= 5;
  }

  // Lock minimum speed to 58ms (or 63ms if you want it a bit easier)
  if (snake.intervalTime < 63) {
    snake.intervalTime = 63;
  }

  // Chaser should always be a bit slower than the player, but still a challenge
  // Chaser speed is a delay threshold: lower = faster
  // We'll set chaserSnake.speed so that it moves every X ticks (e.g., 1.1x to 1.4x slower than player)
  // The lower the value, the faster the chaser moves (1 = every tick, 2 = every other tick)
  // We want chaserSnake.speed to decrease as snake gets faster, but never be less than 1.1
  // and never more than 2.2 (tunable for balance)
  var minChaserSpeed = 1.02; // fastest (chaser moves almost every tick)
  var maxChaserSpeed = 1.8; // slowest (chaser moves every 2.2 ticks)
  var minInterval = 63; // fastest snake
  var maxInterval = 115; // slowest snake
  var t = (snake.intervalTime - minInterval) / (maxInterval - minInterval);
  // t=0 when snake is fastest, t=1 when slowest
  chaserSnake.speed = minChaserSpeed + (maxChaserSpeed - minChaserSpeed) * t;
  if (chaserSnake.speed < minChaserSpeed) chaserSnake.speed = minChaserSpeed;
  if (chaserSnake.speed > maxChaserSpeed) chaserSnake.speed = maxChaserSpeed;

  clearInterval(updateInterval);
  updateInterval = setInterval(update, snake.intervalTime);
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
    // Always clear before setting a new interval to avoid stacking intervals
    clearInterval(updateInterval);
    clearInterval(updateInterval);
    updateInterval = setInterval(update, snake.intervalTime);
    // Unpausing should also allow the game to respond to key events again
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

/// No Longer need, Speed handle through increaseGameSpeed
// function increaseChaserSpeedIfNeeded() {
//   // Only increase speed every 3 apples (score is a multiple of 3, but not zero)
//   if (score > 0 && score % 4 === 0) {
//     // Lower speed value so chaser moves more frequently (speed is a delay threshold)
//     if (typeof chaserSnake.speed !== "number" || isNaN(chaserSnake.speed)) {
//       chaserSnake.speed = 1.8; // default starting value 
//     }
//     // Decrease speed, but never go below a minimum threshold (e.g., 0.2)
//     chaserSnake.speed = Math.max(0.2, chaserSnake.speed - 0.35);
//   }
// }

function predictPlayerPosition() {
  var currentDir = snake.head.direction || "right";
  var nextRow = snake.head.row;
  var nextCol = snake.head.column;
  var steps = 3;

  for (var i = 0; i < steps; i++) {
    switch (currentDir) {
      case "left":  if (nextCol > 0) nextCol--; break;
      case "right": if (nextCol < COLUMNS - 1) nextCol++; break;
      case "up":    if (nextRow > 0) nextRow--; break;
      case "down":  if (nextRow < ROWS - 1) nextRow++; break;
    }
  }

  return { row: nextRow, column: nextCol };
}

function smartChaserMove() {
  if (!playerSnake.head || !chaserSnake.head) return;

  let target = { row: playerSnake.head.row, column: playerSnake.head.column };

  // Predict the player's next tile
  let velocity = playerSnake.velocity;
  target.row += velocity.row;
  target.column += velocity.column;

  // Simple scoring: pick the adjacent move that minimizes distance to predicted target
  const directions = [
    { row: -1, column: 0 },
    { row: 1, column: 0 },
    { row: 0, column: -1 },
    { row: 0, column: 1 },
  ];

  let bestMove = null;
  let minDistance = Infinity;

  for (let dir of directions) {
    let nextRow = chaserSnake.head.row + dir.row;
    let nextCol = chaserSnake.head.column + dir.column;

    // Skip out-of-bounds or self-collision
    if (nextRow < 0 || nextRow >= 32 || nextCol < 0 || nextCol >= 32) continue;

    let dist = Math.abs(nextRow - target.row) + Math.abs(nextCol - target.column);
    if (dist < minDistance) {
      minDistance = dist;
      bestMove = dir;
    }
  }

  if (bestMove) {
    chaserSnake.velocity = bestMove;
    moveChaserSnake(bestMove);
  }
}