# Image Filtering

Use higher order functions to apply filters to images.

## Table of Contents

- [Overview](#overview)
  - [Learning Objectives](#learning-objectives)
  - [Requirements and Grading](#requirements-and-grading)
- [Lesson Steps](#lesson-steps)
  - [Before You Code: Study Existing Code](#before-you-code-study-existing-code)
  - [Work Flow: How to Navigate Through the Lesson Steps](#work-flow-how-to-navigate-through-the-lesson-steps)
- [TODO 0: Preview Your Site with Live Server](#todo-0-preview-your-site-with-live-server)
- [TODO 1: Create the applyFilter Function (Part 1)](#todo-1-create-the-applyfilter-function-part-1)
- [TODO 2: Convert Each Pixel from a String to an Array and Back](#todo-2-convert-each-pixel-from-a-string-to-an-array-and-back)
- [TODO 3: Modify the Red Value in the Pixel](#todo-3-modify-the-red-value-in-the-pixel)
- [TODO 4: Create the reddify Function](#todo-4-create-the-reddify-function)
- [TODO 5: Use applyFilter with the reddify Function](#todo-5-use-applyfilter-with-the-reddify-function)
- [TODO 6: Create and Test the keepInBounds Function](#todo-6-create-and-test-the-keepinbounds-function)
- [TODO 7: Create and Test the decreaseBlue Filter Function](#todo-7-create-and-test-the-decreaseblue-filter-function)
- [TODO 8: Create and Test the increaseGreenByBlue Filter Function](#todo-8-create-and-test-the-increasegreenbyblue-filter-function)
- [TODO 9: Create the applyFilterNoBackground Function](#todo-9-create-the-applyfilternobackground-function)
- [TODO 10: Use All Your Filter Functions](#todo-10-use-all-your-filter-functions)
- [Extra Challenges](#extra-challenges)
  - [Challenge 1: Create Your Own Filter Function](#challenge-1-create-your-own-filter-function)
  - [Challenge 2: Invert Filter](#challenge-2-invert-filter)
  - [Challenge 3: Smudge Filter](#challenge-3-smudge-filter)
  - [Super Challenge: Blur Filter](#super-challenge-blur-filter)
- [Submit Your Work](#final-step-go-live)

# Overview

<img src="img/before.png"> ==> <img src="img/after.png">

In this project you will be building a simple program that applies filters to images. You will also be creating multiple filters!

## Learning Objectives

- Practice working with multidimensional arrays
- Practice working with nested for loops
- Practice using higher order functions

## **Requirements and Grading**

| Requirement                                         | Description                                                                  | Points  |
| --------------------------------------------------- | ---------------------------------------------------------------------------- | ------- |
| **Follow coding best practices**                    | Clear formatting, meaningful variable names, proper indentation, and cleanup | 15      |
| **Create 3 filter functions**                       | Implement `reddify`, `decreaseBlue`, and `increaseGreenByBlue`               | 15      |
| **Write and test `keepInBounds`**                   | Properly clamp values between 0–255 and verify behavior with test output     | 10      |
| **Use `applyFilter` and `applyFilterNoBackground`** | Call both functions multiple times using your filters                        | 20      |
| **Implement `applyFilter` correctly**               | Uses `filterFunction` parameter and loops through the full image             | 20      |
| **Implement `applyFilterNoBackground` correctly**   | Skips background pixels while applying the filter                            | 20      |
|                                                     | **Total**                                                                    | **100** |

# Lesson Steps

## Before You Code: Study Existing Code

Before you begin working, you should look at the `image.js` file to see what has already been provided for you. Study each of the variables and functions and read their comments to understand what they do.

Once you have looked over the `image.js` file and are comfortable with it, move on to the rest of the project below. All code for this project will be written in the `index.js` file.

## **Work Flow: How to Navigate Through the Lesson Steps**

🎯 **Goal:** Learn how to follow the steps in this lesson to build and customize your game one step at a time.

---

### Step-by-Step Work Flow

1. 📂 **Open your Image Filtering project's `image.js` and `index.js` files** in your codespace to get started.

   - 🔍 Locate the file tree (the list of files and folders) in the left panel of your codespace.
   - Click the `asd-projects` folder 📂 in your file tree to expand the list of projects.
   - Click on the `image-filtering` folder 📂 located within the `asd-projects` folder.
   - Click on the `image.js` file located within the `image-filtering` folder 📂. **_This file contains some code that will help you complete the steps. You'll want to read and understand this file before doing any coding._**
   - Right click on the `index.js` file located within the `image-filtering` folder 📂 and click "Open to the Side". **_Coding for all steps will be done in this file._**

2. **Follow the instructions carefully** for each TODO:

   - Pay attention to where new code should be added.
   - Only code inside the designated areas
     - Make sure all code is added below the `YOUR CODE BELOW HERE` comment.

3. 🖥️ **Preview your game regularly using Live Server** to see how your changes affect the game level.

4. **Important Note**: _None of the code provided in these instructions should be copied and pasted into your project_.
   - All code snippets are examples meant to guide you in writing your own code and provide a general description of what changes happen throughout the program.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Key Reminders
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      - 📖 Read each step closely before adding any code.<br>
      - 🖥️ Preview frequently to make sure your game is structured the way you would like it.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- **After each TODO**, double-check your code to ensure it matches the examples.
- If you encounter issues, **preview your site** using Live Server to troubleshoot.

---

## Note on Console Logs for Testing

Throughout the lesson steps, you may see instructions to use `console.log()` statements to test your code and check variable values. **These logs are for your own testing and debugging only.**

> **Once you have verified that your code is working as expected, you can and should delete (or at the very least comment out) any `console.log()` statements you added for testing.**

This helps keep your code clean and professional!

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 0: Preview Your Site with Live Server**

🎯 **Goal:** Preview your image filtering project in the browser to see how it looks and behaves as you make changes.

---

### Step-by-Step Instructions

There are two ways to open your project with **Live Server**:

#### **Option 1: Right-Click Method**

1. 📂 **Find the `index.html` file** in the file tree on the left side of your codespace.
2. **Right-click on `index.html`** and select **“Open with Live Server.”**

#### **Option 2: Go Live Button in the Bottom Panel**

1. **Look at the bottom-right corner** of your codespace.
2. **Click the “Go Live” button** to launch Live Server.

<br>

### ✅ **Check Your Work!**

- **After launching Live Server**, your browser should open a new tab with your site.
- By default, Live Server will always load your home page. To view your image filtering project:
  - Click the link to your Portfolio page to access your project links.
  - Then navigate to your Image Filtering project by clicking the Image Filtering link.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 1: Create the `applyFilter` Function (Part 1)**

🎯 **Goal:** Define the `applyFilter` function and set up a nested loop to access every pixel in the `image` array.

---

### Step-by-Step Instructions

1. **Create the `applyFilter` Function**

   - 🔍 In `index.js`, create a new function called `applyFilter`.
   - For now, **do not** add any parameters to the function.

2. **Call `applyFilter` When the Page Loads**

   - 🔍 Scroll to the top of your file and find the `"document ready"` section.
   - Add a call to `applyFilter()` inside this block so the function runs as soon as the page is ready.

3. **Add a Nested Loop Inside the Function**
   - Inside `applyFilter`, create a **nested `for` loop** to loop through every row and column of the `image` array:
     - The **outer loop** should loop through each row in the image.
     - The **inner loop** should loop through each pixel within that row.
   - ✅ Use different variable names for each loop counter (e.g., `row` and `col` or `i` and `j`).
   - ✅ Your loops should give you access to every pixel in the 2D `image` array.
   - 🧪 **Test It!**: Inside your inner loop, use:
     ```javascript
     console.log(image[i][j]);
     ```
     to confirm that your loop is correctly accessing every pixel. You should see values like `"rgb(150, 150, 150)"` and `"rgb(50, 200, 50)"` in the console.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>2D Arrays</strong>: The `image` variable stores a 2D array. This means each element in the outer array is a row, and each element in that row is a pixel.<br><br>
      <strong>Looping Through 2D Arrays</strong>: You’ll need two loops — one for the rows and one for the columns — to access every pixel in the image.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- You should have a function named `applyFilter` in your code.
- That function should run automatically when the page loads (look for the `$(document).ready()` section).
- Inside `applyFilter`, you should have a **nested `for` loop** that accesses each pixel in the `image` array using `image[i][j]`.
- 🧪 **Use this test**: Add `console.log(image[i][j]);` inside your inner loop.

  - If your loop is working, you should see a list of RGB strings (like `"rgb(150, 150, 150)"`) in the browser's console.
  - If you see an error or nothing at all, double-check your loop setup and that you're calling `applyFilter()` when the page loads.

- You will not see changes to the image yet — that comes in TODO 2.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 2: Convert Each Pixel from a String to an Array and Back**

🎯 **Goal:** Convert each pixel in the image from a string to an array and back again using helper functions — no changes to the pixel values yet.

In this TODO, you'll be using the `rgbStringToArray` and `rgbArrayToString` functions to convert pixel values. These functions will do some conversion of strings to arrays and back again. Use the table below to help understand what the data looks like at each step.

---

### Step-by-Step Instructions

1. **Store the Pixel in a Variable**

   - Inside your inner loop, create a variable named `pixel`.
   - It should store the current value from the `image` array at the given row and column.

2. **Convert the Pixel to an Array**

   - Create a variable named `pixelArray`.
   - It should store the result of calling the `rgbStringToArray` function.
   - Pass the `pixel` variable as the argument when calling the function.

3. **Add a Placeholder Comment**

   - Just below your `pixelArray` line, add a comment in your code like this:
     ```javascript
     // This is where I’ll modify the color values later
     ```
   - This will serve as a reminder for where you'll change the RGB values in an upcoming TODO.

4. **Convert the Array Back to a String**

   - Create a variable named `updatedPixel`.
   - It should store the result of calling the `rgbArrayToString` function with `pixelArray` as the argument.

5. **Overwrite the Original Pixel in the Image**
   - Set the value at `image[i][j]` to be the `updatedPixel`.
   - This will overwrite the old pixel value with the one you just converted back to a string.

---

### 🧠 Tip: Use Logs to Understand the Code

This step involves multiple data transformations. If you’re unsure what’s happening at each stage, **log your variables** or use the `debugger` statement to inspect values.

- Add logs like these to see the full picture:

  ```javascript
  console.log("pixel:", pixel);
  console.log("pixelArray:", pixelArray);
  console.log("updatedPixel:", updatedPixel);
  ```

- You can also pause the code in the browser by using:

  ```javascript
  debugger;
  ```

- 💬 **Reflective Commenting Tip**: After you check the console, leave a comment above each key line:
  ```javascript
  // pixel looks like "rgb(150, 150, 150)"
  // pixelArray looks like [150, 150, 150]
  ```

---

<br>

### ✅ **Check Your Work!**

- You should not be changing the RGB values yet — just converting and reconverting each pixel.
- **You should have a good understanding of how the pixel data looks at each step.**
- ✅ The image should appear unchanged when you press the "Apply Filter" button — that's a good sign!

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 3: Modify the Red Value in the Pixel**

🎯 **Goal:** Change the red value in each pixel’s color data by updating the `pixelArray`.

---

### Step-by-Step Instructions

1. **Use the `RED` Constant to Target the Red Value**

   - Inside your nested loop, just below the comment from the last step, update the red channel value of the `pixelArray`.
   - Set the value at the red index to something bright, like `200`.

2. **Don’t Touch Anything Else Yet!**
   - Leave the green and blue values unchanged for now — we'll experiment with those in future steps.

---

### 🎨 RGB Index Preview

These constants are already declared in `image.js` and help you access specific color channels:

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      🎯 Constant Definitions
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <code>const RED = 0;</code><br>
      <code>const GREEN = 1;</code><br>
      <code>const BLUE = 2;</code><br><br>
      These make your code easier to read by clearly identifying which value you're modifying in the array.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- After refreshing, your image should now have a **red tint** — this means the red value in each pixel is being increased.
- Confirm that you only changed the red value (`pixelArray[RED] = ...`) and left green and blue alone.
- If nothing changes, make sure you’re modifying the `pixelArray` **before** converting it back to a string.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 4: Create the `reddify` Function**

🎯 **Goal:** Write a function named `reddify` that increases the red value in a pixel array.

---

### Step-by-Step Instructions

1. **Define a Function Called `reddify`**

   - The function should accept one parameter: a pixel array (like `[150, 150, 150]`).
   - Inside the function, use the `RED` constant to increase the red value to something brighter (like 200).
   - This function should directly modify the array — there’s no need to return it.

2. 🧪 **Optional Test (Highly Recommended!)**
   - Below your function, paste the following code to test that it works as expected:
     ```javascript
     var testArray = [100, 100, 100];
     reddify(testArray);
     console.log(testArray); // Should show [200, 100, 100]
     ```
   - This is a great way to confirm that your function is correctly modifying the array.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>Array Mutation</strong>: Arrays are reference types in JavaScript. When you modify a value inside the array, the change is permanent — there's no need to return the array.<br><br>
      <strong>Test Code</strong>: Running your function on a test array and logging the result is a great way to confirm correctness before using it in your program.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- You should have a function named `reddify` that accepts a pixel array and directly changes its red value.
- If you used the test code, your console should show `[200, 100, 100]`.
- Your function should **not** return anything.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 5: Use `applyFilter` with the `reddify` Function**

🎯 **Goal:** Modify your `applyFilter` function so that it accepts a filter function as a parameter and applies it to every pixel.

---

### Step-by-Step Instructions

1. **Update `applyFilter` to Accept a Parameter**

   - Give your `applyFilter` function a single parameter called `filterFunction`.
   - This parameter will store whatever filter function you pass in, like `reddify`.

2. **Call `applyFilter` and Pass in `reddify`**

   - Up where you call `applyFilter`, pass in `reddify` as the argument.
   - ✅ Important: You are not calling the function — just passing it in — so write `applyFilter(reddify);`, not `applyFilter(reddify());`.

3. **Use the `filterFunction` Inside the Loop**
   - Find the line in `applyFilter` where you previously modified the pixel array (e.g., increased red).
   - Replace that line with a call to `filterFunction`, passing in the pixel array:
     ```javascript
     filterFunction(pixelArray);
     ```
   - This will apply whatever filter was passed in to each pixel in the image.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>Function as Argument</strong>: In JavaScript, you can pass a function into another function as a variable. Here, <code>filterFunction</code> is just a placeholder name that stores the function you pass in.<br><br>
      <strong>Do Not Call It Too Soon!</strong>: When passing a function as an argument, you must leave off the parentheses. <code>applyFilter(reddify)</code> is correct; <code>applyFilter(reddify())</code> runs it too early.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Your `applyFilter` function should now accept one parameter: `filterFunction`.
- The `reddify` function should be passed into `applyFilter` when you call it.
- Inside your loop, you should now call `filterFunction(pixelArray);` instead of hardcoding any changes to the array.
- When you reload the page, the red tint should still appear — but now the code is modular and reusable.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 6: Create and Test the `keepInBounds` Function**

🎯 **Goal:** Write a function named `keepInBounds` that limits a number between 0 and 255.

---

### Step-by-Step Instructions

1. **Create a Function Called `keepInBounds`**

   - The function should accept a single number as a parameter.
   - If the number is less than `0`, return `0`.
   - If the number is greater than `255`, return `255`.
   - Otherwise, return the number as-is.

2. 🧪 **Test It with Console Logs**
   - Below the function, try logging a few values to check your logic:
     ```javascript
     console.log(keepInBounds(-20)); // should print 0
     console.log(keepInBounds(300)); // should print 255
     console.log(keepInBounds(125)); // should print 125
     ```

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>Pixel values must stay in range:</strong> Red, green, and blue values can only be between <code>0</code> and <code>255</code>. This function helps keep values safe before converting them back to strings.<br><br>
      <strong>Return Early:</strong> You can use simple conditional logic like <code>if / else</code> to return early depending on the number.
    </td>

  </tr>
</table>

---

### 🌟 Bonus Challenge: Use a Ternary Instead!

Can you rewrite your `keepInBounds` function using a **nested ternary expression** instead of `if`/`else`?

A ternary statement looks like:

```javascript
condition ? valueIfTrue : valueIfFalse;
```

Here’s a partial example:

```javascript
return num > 255 ? 255 : num;
```

Can you nest that logic to handle all three cases? This is a fun and readable way to write short logic-based functions.

---

<br>

### ✅ **Check Your Work!**

- Your `keepInBounds` function should:
  - Return `0` if the input is less than 0
  - Return `255` if the input is greater than 255
  - Otherwise return the input
- Your console logs should show:  
  `0`, `255`, and `125`
- ✅ Bonus complete? If so, your function should use a single return statement with ternary logic!

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 7: Create and Test the `decreaseBlue` Filter Function**

🎯 **Goal:** Write a filter function named `decreaseBlue` that subtracts 50 from the blue value of a pixel.

---

### Step-by-Step Instructions

1. **Create a Function Named `decreaseBlue`**

   - This function should accept a pixel array.
   - Use the `BLUE` constant to subtract 50 from the blue value.
   - Pass the new blue value into your `keepInBounds` function to prevent it from dropping below 0.
   - Store the result back in the pixel array.

2. ✅ **Test by Plugging It into `applyFilter`**
   - Replace your `applyFilter(reddify)` call with:
     ```javascript
     applyFilter(decreaseBlue);
     ```
   - Reload your page to confirm that the image appears **less blue**.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>Mutate the array directly:</strong> Just like <code>reddify</code>, this function should update the pixel array without returning it.<br><br>
      <strong>Clamp the value:</strong> Always use <code>keepInBounds</code> to ensure the blue value stays within 0–255.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Your function should subtract 50 from the blue value of each pixel.
- You should see a noticeable reduction in blue when previewing the image.
- If you accidentally removed blue entirely or broke something, double-check your use of `keepInBounds`.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 8: Create and Test the `increaseGreenByBlue` Filter Function**

🎯 **Goal:** Write a filter function that increases the green value based on the current blue value.

---

### Step-by-Step Instructions

1. **Create a Function Named `increaseGreenByBlue`**

   - The function should accept a pixel array.
   - Use the `GREEN` and `BLUE` constants to read values from the array.
   - Add the current blue value to the green value.
   - Pass the new green value through `keepInBounds`.
   - Store the result back in the pixel array at the green index.

2. ✅ **Test by Plugging It into `applyFilter`**
   - Temporarily replace your filter function call with:
     ```javascript
     applyFilter(increaseGreenByBlue);
     ```
   - Reload your page to check for a noticeable green shift.

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>Relative color filtering:</strong> Instead of setting a color to a fixed number, you’re increasing one channel based on the value of another.<br><br>
      <strong>Clamp with care:</strong> Use <code>keepInBounds</code> again to ensure your new green value doesn’t exceed 255.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- The image should appear greener in areas with more blue.
- You should be using both the green and blue values from the pixel array.
- Be sure to update the pixel in place — no need to return anything.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 9: Create the `applyFilterNoBackground` Function**

🎯 **Goal:** Write a new function that applies a filter to every pixel **except** those matching the background color (the top-left pixel).

---

### Step-by-Step Instructions

1. **Create a New Function Named `applyFilterNoBackground`**

   - This function should accept one parameter: `filterFunction`.

2. **Get the Background Color**

   - Store the color of the pixel in the top-left corner of the image:
     ```javascript
     var backgroundColor = image[0][0];
     ```

3. **Loop Through the Image**

   - Use nested loops (like in `applyFilter`) to access every pixel in the image.

4. **Skip Pixels That Match the Background**

   - Inside your inner loop, before modifying a pixel:
     - Use an `if` statement to check if `image[i][j]` is **not equal** to `backgroundColor`.
     - Only apply the filter if the pixel is different.
     - Use strict inequality: `!==`

5. **Apply the Filter to Non-Background Pixels**
   - For pixels that aren’t the background:
     - Use `rgbStringToArray()` to convert the pixel to an array
     - Pass the pixel array to `filterFunction()` to apply the transformation
     - Convert the updated array back to a string using `rgbArrayToString()`
     - Overwrite the original pixel in the image

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>📸 Excluding the background:</strong> The background is defined as the color in the top-left pixel: <code>image[0][0]</code>.<br><br>
      <strong>🟪 Skipping pixels:</strong> Use an <code>if</code> statement to only run the filter when <code>image[i][j] !== backgroundColor</code>. This avoids changing parts of the image that match the background.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Your function should skip any pixels that match the top-left corner color.
- All other pixels should have the filter applied using the same logic as `applyFilter`.
- Try temporarily using a filter like `decreaseBlue` and run:
  ```javascript
  applyFilterNoBackground(decreaseBlue);
  ```
  You should see the background stay the same, while the rest of the image changes.

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## **TODO 10: Use All Your Filter Functions**

🎯 **Goal:** Call both `applyFilter` and `applyFilterNoBackground` with the filter functions you’ve created.

---

### Step-by-Step Instructions

1. **Use Each Filter Function at Least Once**

   - You should call `applyFilter()` at least twice
   - You should call `applyFilterNoBackground()` at least twice
   - Each of your three filter functions (`reddify`, `decreaseBlue`, `increaseGreenByBlue`) should be used as an argument in at least one of those calls

2. **Choose Your Filter Order Creatively**
   - You can combine the filter functions in any order — try different combinations and reload the page to see what happens!
   - Example:
     ```javascript
     applyFilter(reddify);
     applyFilterNoBackground(decreaseBlue);
     applyFilter(increaseGreenByBlue);
     applyFilterNoBackground(reddify);
     ```

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>Function Reuse:</strong> Now that your filters are modular, you can reuse and combine them in different ways to create custom effects.<br><br>
      <strong>applyFilter vs applyFilterNoBackground:</strong> One applies to every pixel. The other skips pixels that match the background color (top-left pixel).
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Did you call `applyFilter` at least twice?
- Did you call `applyFilterNoBackground` at least twice?
- Did each filter function (`reddify`, `decreaseBlue`, `increaseGreenByBlue`) get used at least once?
- When you reload the page, your image should look significantly altered!

<!-- 4 line breaks between TODOs -->

<br><br><br><br>

## 🧪 Extra Challenges

🎉 You've completed the core project — great work! Now it’s time to stretch your creativity and coding muscles. Below are some **optional extra challenges** you can take on if you want to build your own filters, simulate real-world effects, or push deeper into image manipulation.

These challenges are meant to be experimental — don’t worry if they don’t work perfectly on your first try!

---

### 🎨 Challenge 1: Create Your Own Filter Function

Can you create a brand new filter? Think about filters you’ve seen in apps like Instagram or TikTok. Can you recreate a filter that feels warmer, darker, grayscale, or something else?

Some ideas to try:

- A **purple tint** filter that increases red and blue
- A **vintage filter** that lowers contrast and boosts red/green
- A **grayscale filter** that averages all 3 RGB values

Once you've built your filter function:

- Test it by using it with `applyFilter()` or `applyFilterNoBackground()`
- Name your function clearly and reuse `keepInBounds()` where needed

---

### 🌓 Challenge 2: Invert Filter

Create a filter that **inverts** the color of each pixel.

💡 Inversion means subtracting each color channel from `255`:

```javascript
pixelArray[RED] = 255 - pixelArray[RED];
```

Once you do this for each color channel, your image should look like a color negative!

---

### 🖌️ Challenge 3: Smudge Filter

The smudge filter softens the edges of your image by blending pixels with nearby pixels.

You can base your logic off the smudge filter shown in the previous version of this project — or invent your own version that mixes nearby color values to smooth out rough edges.

Hint: You’ll need to look at neighboring pixels (like `image[i+1][j]`) and average color values.

---

### 🧠 Super Challenge: Blur Filter

This one is tough, but rewarding!

The **blur** effect works like smudge but needs to calculate the **average color** of surrounding pixels and apply that average to the current pixel.

However, there's a twist:

> In a real blur filter, you can't modify pixels as you loop — because each pixel’s new value depends on the _original_ image.

💡 To do this correctly:

- Create a second 2D array to store the blurred version of the image
- Use nested loops to calculate the average RGB values of a pixel’s neighbors
- Store that result in the new array
- After finishing all calculations, copy the new array back to `image`

---

### 💬 Tips While Experimenting

- Use `console.log()` generously to check pixel values during testing
- Use `debugger` to pause and inspect data in Chrome DevTools
- Add comments describing what your new filter is supposed to do — even if it’s not working yet!

## **Final Step: Go Live**

🎯 **Goal:** Push your changes to GitHub and make your image filtering project go live.

---

### Step-by-Step Instructions

1. **Open the terminal in your codespace**

   - If the terminal isn’t visible, click the **Hamburger Menu > Terminal > New Terminal**.

2. **Enter the following commands one by one** in the terminal, pressing enter after each command to run it:

   ```bash
   git add .
   git commit -m "completed image filtering project"
   git push
   ```

3. **Wait a few minutes for the changes to go live at your-username.github.io.**

---

<br>

### ✅ **Check Your Work!**

- Visit the site `your-github-username.github.io` to see your website live on the internet. If it doesn’t appear immediately, wait a few minutes and try refreshing your page.
  - Make sure to replace the text `"your-github-username"` with your actual github username when entering the URL in your browser.
- Navigate to your Image Filtering link from your Portfolio page to ensure it is live on the web.
  - You might need to refresh your page for your changes to appear.

<br>
<hr>
<br>

### 🎉🎉🎉 Congratulations! You can now share your image filtering project with others! 🎉🎉🎉
