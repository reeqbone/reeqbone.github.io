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

  // TODO 4b-2: initialize the apple
  makeApple(); // Randomly places apple

  // TODO 5a: Initialize the interval
  // start update interval
  // Set initial interval time
  snake.intervalTime = 115; // Anytime an apple is eaten, the game increases in speed // Functional,ity is found in Extras section
  updateInterval = setInterval(update, snake.intervalTime); //16.6 = 60fps //33.333333333333336 = 30 fps // 100 = 10 fps
}


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

  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}


function checkForNewDirection(event) {
  /* 
  TODO 6b: Update snake.head.direction based on the value of activeKey.
  
  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */

  // I simplfy this using logical condtionals. Did it as a test to test my skills.
  if (activeKey === KEY.LEFT || activeKey === KEY.RIGHT || activeKey === KEY.UP || activeKey === KEY.DOWN) {
    snake.head.direction = 
      activeKey === KEY.LEFT ? "left" :
      activeKey === KEY.RIGHT ? "right" :
      activeKey === KEY.UP ? "up" :
      activeKey === KEY.DOWN ? "down":
    snake.head.direction; // keep the current direction if no valid key is pressed
  }
  
  // Second Conditonal for WASD CONTROLs
  if (activeKey === KEY.A || activeKey === KEY.D || activeKey === KEY.W || activeKey === KEY.S) {
    snake.head.direction = 
      activeKey === KEY.A ? "left" :
      activeKey === KEY.D ? "right" :
      activeKey === KEY.W ? "up" :
      activeKey === KEY.S ? "down":
    snake.head.direction; // keep the current direction if no valid key is pressed
  }

  // FILL IN THE REST

 // console.log(snake.head.direction);     // uncomment me!
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

  // clear board of all elements`
  board.empty();

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 1000 ms
  setTimeout(init, 1000);

  console.log("endGame"); // this is for later, my function will check logs to see if endGame is there, if it is, death count is updated by 1
  updateDeathCountDisplay()// alert to notify the user that the game has ended and will restart

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

  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    /*
    TODO 13: After generating the random position determine if that position is
    not occupied by a snakeSquare in the snake's body. If it is then set 
    spaceIsAvailable to false so that a new position is generated.
    */
   for(var i = 0; i < snake.body.length; i++) {
    if (snake.body[i].row === randomPosition.row && snake.body[i] === randomPosition.column) {
      spaceIsAvailable = false;
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
var deathCount = []; // use a number to count deaths

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

// Add this function anywhere in your file:
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
  }
}

