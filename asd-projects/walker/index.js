/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 
  // Constant Variables
  const FRAME_RATE = 120;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  // Will start using let instead of var throughout new code.

  let walker = {
    x: 0, // x position of the walker
    y: 0, // y position of the walker   
    speedY: 0, // vertical speed of the walker
    speedX: 0, // horizontal speed of the walker
    width: $("#walker").width(), // width of the walker
    height: $("#walker").height(), // height of the walker
  }

  // Pretty much copy from Snake Project
  const KEY = {
    UP: 38, // up arrow key
    DOWN: 40, // down arrow key
    LEFT: 37, // left arrow key
    RIGHT: 39, // right arrow key
     W: 87, // W key
     S: 83, // S key
     A: 65, // A key
     D: 68, // D key
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  // $(document).on("keyup", handleKeyUp);
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);
  $("#walker").on("click", rbColor); // when the walker is clicked, change its color

  // $(document).on("click", handleClick);


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleKeyDown(event) {
  console.log(event.which);
    // if the key is the up arrow or W key, move the walker up
    if (event.which === KEY.UP || event.which === KEY.W) {
      walker.speedY = -6; // move up
      console.log("up");
    }
    // if the key is the down arrow or S key, move the walker down
    else if (event.which === KEY.DOWN || event.which === KEY.S) {
      walker.speedY = 6; // move down
      console.log("down");
    }
    // if the key is the left arrow or A key, move the walker left
    else if (event.which === KEY.LEFT || event.which === KEY.A) {
      walker.speedX = -6; // move left
      console.log("left");
    }
    // if the key is the right arrow or D key, move the walker right
    else if (event.which === KEY.RIGHT || event.which === KEY.D) {
      walker.speedX = 6; // move right
      console.log("right");
    }
  }
  function handleKeyUp(event) {
    console.log(event.which);
    // if the key is the up arrow or W key, stop moving the walker up
    if (event.which === KEY.UP || event.which === KEY.W) {
      walker.speedY = 0; // stop moving up
      console.log("stop up");
    }
    // if the key is the down arrow or S key, stop moving the walker down
    else if (event.which === KEY.DOWN || event.which === KEY.S) {
      walker.speedY = 0; // stop moving down
      console.log("stop down");
    }
    // if the key is the left arrow or A key, stop moving the walker left
    else if (event.which === KEY.LEFT || event.which === KEY.A) {
      walker.speedX = 0; // stop moving left
      console.log("stop left");
    }
    // if the key is the right arrow or D key, stop moving the walker right
    else if (event.which === KEY.RIGHT || event.which === KEY.D) {
      walker.speedX = 0; // stop moving right
      console.log("stop right");
    }
}

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem();
    repositionGameItem();
    wallCollision();
  }
  
  /* 
  Called in response to events.
  */
  


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    // update the position of the walker on the screen
    walker.x += walker.speedX; // update horizontal position
    walker.y += walker.speedY; // update vertical position
  }

 function redrawGameItem(){
    $("#walker").css("left", walker.x + "px");
    $("#walker").css("top", walker.y + "px");
 }

 function wallCollision() {
  
  let hitWall = false;

  if (walker.x < 0) {
    walker.x = 0;
    hitWall = true;
  }
  if (walker.x > $("#board").width() - walker.width) {
    walker.x = $("#board").width() - walker.width;
    hitWall = true;
  }
  if (walker.y < 0) {
    walker.y = 0;
    hitWall = true;
  }
  if (walker.y > $("#board").height() - walker.height) {
    walker.y = $("#board").height() - walker.height;
    hitWall = true;
  }

  if (hitWall === true) {
    rbColor();
  }
}


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
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

// Rewrote some the var random color code from project instructions to fit a different use for me
function rbColor() {
  // Pick a random color from a simple list
  const colors = ["#ea6962", "#7daea3", "#a9b665", "#FADA5E", "#9955bb", ":#e3a84e"];
  let rbRandoColors = colors.length  * Math.random() | 0; // get a random index from 0 to colors.length - 1
  $("#walker").css("background-color", colors[rbRandoColors]);
}


  // Create a second walker that follows the first walker
  let rbfollower = {
    x: walker.x - 40,
    y: walker.y - 40,
    width: $("#walker").width(),
    height: $("#walker").height(),
    color: "#e18e96"
  };

  // Add follower element to the board

  // Update newFrame to move and redraw the follower
  const rbNewFrame = newFrame;
  function newFrame() {
    // Move follower towards previous position of walker
    const rbfollowSpeed = 0.05;
    rbfollower.x += (walker.x - rbfollower.x) * rbfollowSpeed;
    rbfollower.y += (walker.y - rbfollower.y) * rbfollowSpeed;

    // Redraw follower
    $("#follower").css({
      left: rbfollower.x + "px",
      top: rbfollower.y + "px"
    });

    // Continue normal game logic
    redrawGameItem();
    repositionGameItem();
    wallCollision();
  }
  
}
