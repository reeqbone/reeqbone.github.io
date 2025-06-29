// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  // Render the image on the page
  render($("#display"), image);

  // Set up button event handlers
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);

  // Add filter mode selector if not already present
  if ($("#filter-mode").length === 0) {
    $("<select id='filter-mode'></select>")
      .css({ margin: "10px", fontSize: "1.1em" })
      .append("<option value='classic'>Classic</option>")
      .append("<option value='vivid'>Vivid</option>")
      .append("<option value='cool'>Cool</option>")
      .append("<option value='invert'>Invert</option>")
      .append("<option value='party'>Party</option>")
      .insertBefore("#apply");
  }
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

/**
 * Reset the image to its original state and re-render.
 */
function resetAndRender() {
  reset();
  render($("#display"), image);
}

/**
 * Apply the selected filter mode and re-render the image.
 * This function only updates the DOM once for better performance.
 */
function applyAndRender() {
  // Choose filter mode
  let mode = $("#filter-mode").val() || "classic";

  // Apply different filter combos based on mode
  if (mode === "classic") {
    // Classic: gentle warm filter with a soft contrast boost
    applyFilterNoBackground(function(pixel) {
      pixel[RED] = keepInBounds(pixel[RED] + 30);    // Slightly warmer
      pixel[GREEN] = keepInBounds(pixel[GREEN] + 10);
      pixel[BLUE] = keepInBounds(pixel[BLUE] - 10);  // Slightly less blue
    });
    applyFilterNoBackground(softContrast);
  } else if (mode === "vivid") {
    applyFilterNoBackground(vividify);
    applyFilterNoBackground(increaseGreenByBlue);
    applyFilterNoBackground(boostContrast);
  } else if (mode === "cool") {
    applyFilterNoBackground(coolify);
    applyFilterNoBackground(decreaseRed);
    applyFilterNoBackground(decreaseBlue);
  } else if (mode === "invert") {
    applyFilterNoBackground(invert);
    applyFilterNoBackground(boostContrast);
  } else if (mode === "party") {
    applyFilterNoBackground(party);
    applyFilterNoBackground(boostContrast);
  }

  // Only render once after all filters are applied for less lag
  render($("#display"), image);
}

/**
 * Soft contrast filter: gently increases contrast for a more natural look.
 */
function softContrast(rgbArray) {
  for (let k = 0; k < 3; k++) {
    rgbArray[k] = rgbArray[k] < 128
      ? keepInBounds(rgbArray[k] * 0.85)
      : keepInBounds(rgbArray[k] * 1.12);
  }
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

/**
 * Applies a filter function to every pixel in the image.
 */
function applyFilter(filterFunction) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      let pixel = image[i][j];
      let pixelArray = rgbStringToArray(pixel);
      filterFunction(pixelArray);
      let updatedPixel = rgbArrayToString(pixelArray);
      image[i][j] = updatedPixel;
    }
  }
}

/**
 * Applies a filter function to every pixel except the background.
 */
function applyFilterNoBackground(filterFunction) {
  let backgroundColor = image[0][0];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] !== backgroundColor) {
        let pixel = image[i][j];
        let pixelArray = rgbStringToArray(pixel);
        filterFunction(pixelArray, i, j);
        let updatedPixel = rgbArrayToString(pixelArray);
        image[i][j] = updatedPixel;
      }
    }
  }
}

/**
 * Ensures a color value stays within 0-255.
 */
function keepInBounds(num) {
  return num < 0 ? 0 : num > 255 ? 255 : num;
}

// --- Classic Filters ---

// Sets the red channel to 200
function reddify(pixelArray) {
  pixelArray[RED] = 200;
}

// Decreases the blue channel by 50
function decreaseBlue(rgbArray) {
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] - 50);
}

// Increases the green channel by the value of blue
function increaseGreenByBlue(rgbArray) {
  rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + rgbArray[BLUE]);
}

// --- Stylish/Fun Filters ---

// Vivid: increases all channels for a pop-art look
function vividify(rgbArray) {
  rgbArray[RED] = keepInBounds(rgbArray[RED] + 80);
  rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + 80);
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] + 80);
}

// Coolify: adds blue/green tint, reduces red
function coolify(rgbArray) {
  rgbArray[RED] = keepInBounds(rgbArray[RED] - 40);
  rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + 40);
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] + 60);
}

// Invert: creates a negative image
function invert(rgbArray) {
  rgbArray[RED] = 255 - rgbArray[RED];
  rgbArray[GREEN] = 255 - rgbArray[GREEN];
  rgbArray[BLUE] = 255 - rgbArray[BLUE];
}

// Party: cycles colors for a rainbow effect based on position
function party(rgbArray, i, j) {
  let phase = (i + j) % 3;
  if (phase === 0) {
    rgbArray[RED] = keepInBounds(rgbArray[RED] + 100);
  } else if (phase === 1) {
    rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + 100);
  } else {
    rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] + 100);
  }
}

// Boosts contrast for a punchy look
function boostContrast(rgbArray) {
  for (let k = 0; k < 3; k++) {
    rgbArray[k] = rgbArray[k] < 128
      ? keepInBounds(rgbArray[k] * 0.7)
      : keepInBounds(rgbArray[k] * 1.3);
  }
}

// Decreases the red channel for a cooler look
function decreaseRed(rgbArray) {
  rgbArray[RED] = keepInBounds(rgbArray[RED] - 60);
}
