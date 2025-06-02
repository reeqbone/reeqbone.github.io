# 🧩 Data Shapes

Revisit the data and logic skills you learned in the first course — but this time, go deeper! In this project, you’ll work with real data using objects, variables, parameters, and loops to build more dynamic programs. Practice organizing, updating, and displaying information as you shape how your code behaves behind the scenes.

---

## What You'll Learn

- How to store and access data using objects
- How to pass data between functions, variables, and parameters
- How to modify objects by adding and updating properties
- How to use conditionals and loops to work with arrays of objects

**Table of Contents**

- [Overview](#overview)
- [Project Grading](#project-grading)
- [TODO 0: Understand the Program](#todo-0-understand-the-program)
- [TODO 1: Create More Data](#todo-1-create-more-data)
- [TODO 2: Add a New Property](#todo-2-add-a-new-property)
- [TODO 3: Help Display a Shape (Static)](#todo-3-help-display-a-shape-static)
- [TODO 4: Help Display a Shape (Good Behavior)](#todo-4-help-display-a-shape-good-behavior)
- [TODO 5: Help Display a Shape (Bad Behavior)](#todo-5-help-display-a-shape-bad-behavior)
- [🌟 Extra Challenge](#-extra-challenge)
- [📤 Submit Your Work](#-submit-your-work)

# **Overview**

In this project, you’ll work with objects, variables, and functions to create and display various shapes in different ways. You’ll explore how data moves between different structures and how objects can store and manipulate information. For an additional challenge, you can also add a bit of randomness to your program.

## Learning Objectives

- Practice accessing and modifying object data
- Strengthen your understanding of function parameters and return values
- Apply conditionals and loops to process arrays of objects
- Improve your ability to track and shape program behavior through data
- Reinforce connections to previous lessons by using familiar syntax in deeper ways

## Push Reminder

To push to GitHub, enter the following commands in bash:

git add -A
git commit -m "saving data shapes progress"
git push

markdown
Copy
Edit

## Project Grading

Each TODO has a point value. Complete all TODOs and follow instructions carefully to earn full credit.

- TODO 0 – 5 points
- TODO 1 – 15 points
- TODO 2 – 30 points
- TODO 3 – 10 points
- TODO 4 – 20 points
- TODO 5 – 20 points
- 🌟 Challenge – 15 points (bonus)

**NOTE:** The bonus challenge will not raise your score above 100, but attempting it will give you a better understanding of how data connects, as well as practice with randomization.

# **Lesson Steps**

## **TODO 0: Understand the Program**

🎯 **Goal:** Get familiar with how the program works before making any changes.

---

### **How the Program Works**

This program relies on an array of objects, where each object represents a shape. Each shape object includes:

- `shape`: The type of shape (square, triangle, or circle)
- `color`: The color of the shape
- `repeat`: The number of times the shape appears

Later, you'll add a **"good behavior"** to each shape, which will determine how it moves when displayed.

Now, **open your project with Live Server** to explore how it functions.

### **What You'll See in the Preview**

On the preview page, you’ll see:

- A box displaying shape information
- The current index of the shape being shown
- Five buttons:

  - **Prev:** Moves to the previous shape in the array and resets the display
  - **Next:** Moves to the next shape in the array and resets the display
  - **Display:** Shows a static image of the shape
  - **Display Good:** Displays the shape using its **good behavior**
  - **Display Bad:** Displays the shape doing everything _except_ its good behavior (with extra repetitions)

At this point, none of the **Display** buttons will work. You'll add this functionality yourself as you complete the TODOs.

---

### 📝 **Task: Add a Comment to Confirm Completion**

📌 To show that you’ve completed this step, **add the following comment on line 39 of `index.js`**:

```js
// TODO 0 complete
```

<br><br><br><br>

## **TODO 1: Create More Data**

🎯 **Goal:** Add a new shape object to the `dataShapes` array.

---

### **Step-by-Step Instructions**

1. **Create a new variable** called `shape` and assign it an object with the following properties:

   - key: `color`, value: `"blue"`
   - key: `shape`, value: `"circle"`
   - key: `repeat`, value: `3`

2. **Add this new object to the end of the `dataShapes` array.**

💡 **Hint:** What method do arrays use to add elements to their end?

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>🧱 Creating Objects:</strong> Objects are useful for representing aggregate data as a collection of key-value pairs. If you ever have a concept that requires multiple pieces of information to describe, that is a good place for an object!<br><br>
      <strong>📦 Pushing to Arrays:</strong> Many times, arrays need to be expanded as new data needs to be added. If you need to add to an array, the <code>.push()</code> method will add new items to the end of an array. This is a common way to grow a list of objects.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- **Open your project with Live Server** and click **Next** or **Prev** until you reach the last index number.

- If the highest index number is now **26 instead of 25**, then you have successfully added your new object!

<br><br><br><br>

## **TODO 2: Add a New Property**

🎯 **Goal:** Add a `goodBehavior` property to every object in the `dataShapes` array.

---

### **Step-by-Step Instructions**

1. **Create a loop** that iterates over the `dataShapes` array.

2. **Inside the loop, create a variable** called `currentShape` that stores the current object in the array.

3. **Check the `color` property of `currentShape` and assign a `goodBehavior` property based on its value:**
   - If the `color` is `"red"`, set `goodBehavior` to `"bounce"`.
   - If the `color` is `"blue"`, set `goodBehavior` to `"blink"`.
   - Otherwise, set `goodBehavior` to `"spin"`.

💡 **Hints:**

- How can you use **bracket notation** to access each object in the array while looping?
- How do you use **dot notation** to add a new property to an object?
- Since only one of these conditions will apply per object, should they all be `if` statements, or should some be `else if`?

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>🔁 Iterating Over Arrays:</strong> Use loops like <code>for</code> to go through each item in an array. This allows you to process entire collections of data with a few lines of code.<br><br>
      <strong>📦 Accessing Array Values:</strong> Array elements are accessed by index using <code>array[i]</code>. Think page numbers in a book.<br><br>
      <strong>🧱 Accessing Object Values:</strong> Use dot or bracket notation: <code>object.key</code> or <code>object["key"]</code>.<br><br>
      <strong>🧠 Conditional Statements:</strong> Conditional statements like <code>if</code> and <code>else</code> check conditions and make decisions in your code.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Open your project with Live Server and click **Next** or **Prev** to cycle through the shapes.
- Every shape should now display a `goodBehavior` property.
- The value of `goodBehavior` should be `"bounce"`, `"blink"`, or `"spin"`, depending on the shape’s color.

<br><br><br><br>

## **TODO 3: Help Display a Shape (Static)**

🎯 **Goal:** Enable the **Display** button so that clicking it shows a static shape.

---

### **Step-by-Step Instructions**

#### **3a: Create the `handleStatic` function**

1. **Create a function** called `handleStatic`. It should take a single parameter called `data`.

2. **Inside `handleStatic`, do the following:**
   - Call the function `setBackgroundWithObject`, passing `data` as the argument.
   - Set `animationDetails.displayType` to `1`.

#### **3b: Call the function in the correct place**

3. **Find where TODO 3b is located in your code.**
   - Call your `handleStatic` function here, passing in the current shape object.

💡 **Hint:**

- The `dataShapes` array holds all the shape objects. The variable `currentIndex` keeps track of which shape is currently selected. How can you use these together to get the correct object?

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>💡 Declaring Functions:</strong> Functions are useful any time we need to use code more than once. Define a function using <code>function name(parameters) { ... }</code> to call later.<br><br>
      <strong>📞 Calling Functions:</strong> Call a function by using its name followed by parentheses: <code>name()</code>.<br><br>
      <strong>🧱 Using Objects from Code Others Wrote:</strong> Sometimes you may need to use code or data provided by others, such as when you reference <code>animationDetails</code>, which came packaged with this project. Being able to incorporate work provided by others into your own is a valuable programming skill.
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Open your project with Live Server.
- Click the **Display** button when on **index 25**.
- You should see **four complete circles as a static image** on the screen.

<br><br><br><br>

## **TODO 4: Help Display a Shape (Good Behavior)**

🎯 **Goal:** Enable the **Display Good** button so that clicking it animates the shape based on its `"goodBehavior"`.

---

### **Step-by-Step Instructions**

#### **4a: Create the `handleGood` function**

1. **Create a function** called `handleGood`. It should take three parameters: `color`, `shape`, and `repeat`.

2. **Inside `handleGood`, do the following:**
   - Call the function `setBackgroundWithSimple`, passing `color`, `shape`, and `repeat` as arguments.
   - Set `animationDetails.displayType` to `2`.

#### **4b: Call the function in the correct place**

3. **Find where TODO 4b is located in your code.**

4. **Inside TODO 4b, do the following:**
   - Create a variable called `currentShape` and assign it the shape object at `dataShapes[currentIndex]`.
   - Call `handleGood`, passing in the `color`, `shape`, and `repeat` properties of `currentShape`.

💡 **Hint:**

- How do you retrieve a value from an object when you know its key?

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>🧱 Objects from Arrays:</strong> Arrays of objects are a common data structure in programs. Accessing the objects in an array is the same as accessing a number or string, as the program doesn't care about data types inside of an array.<br><br>
      <strong>📦 Passing Properties:</strong> Object properties can be passed as function arguments just like variables:  
      <code>doSomething(shape.size)</code>
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Open your project with Live Server.
- Click the **Display Good** button on different shapes.
- **Red shapes** should bounce, **green shapes** should spin, and **blue shapes** should blink in and out.

<br><br><br><br>

## **TODO 5: Help Display a Shape (Bad Behavior)**

🎯 **Goal:** Enable the **Display Bad** button so that clicking it animates the shape in every way _except_ its `"goodBehavior"`, with an increased number of repetitions.

---

### **Step-by-Step Instructions**

#### **5a: Create the `handleBad` function**

1. **Create a function** called `handleBad`. It should take two parameters: `data` and `repeat`.

2. **Inside `handleBad`, do the following:**
   - Increase `repeat` by `1`.
   - Call the function `setBackgroundWithMixed`, passing `data` and `repeat` as arguments.
   - Set `animationDetails.displayType` to `3`.

#### **5b: Call the function in the correct place**

3. **Find where TODO 5b is located in your code.**

4. **Inside TODO 5b, do the following:**
   - Create a variable called `currentShape` and assign it the shape object at `dataShapes[currentIndex]`.
   - Create a variable called `repeat` and assign it the value of `currentShape.repeat`.
   - Call `handleBad`, passing in `currentShape` and `repeat`.

💡 **Hint:**

- How can you retrieve an object's property when you know its key?

---

<table style="width: 80%; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top: 15px; background-color: #2c2c2c; border: 1px solid #444; border-radius: 8px; overflow: hidden;">
  <tr>
    <th style="text-align: left; padding: 10px; background-color: #444; color: #e2e2e2; border-bottom: 1px solid #666;">
      💡 Review Important Concepts
    </th>
  </tr>
  <tr>
    <td style="padding: 10px; color: #e2e2e2;">
      <strong>📦 Incrementing Data:</strong> You can increase a number with <code>++</code>, or <code>+=</code>, or by reassigning it like <code>value = value + 1</code>. 
      <strong> ⚠️ Incrementing Data Warning:</strong> Be careful using <code>++</code> on a variable that is used in a function call, as it will increase the value before or after the function is called depending on if you put the <code>++</code> in front of or behind the value. This can lead to hard to find errors.<br><br>
    </td>
  </tr>
</table>

---

<br>

### ✅ **Check Your Work!**

- Open your project with Live Server.
- Click the **Display Bad** button when on **index 26**.
- The shape should spin and bounce, and you should see **four rows of four blue circles** displayed.

<br><br><br><br>

## **🌟 Extra Challenge**

This challenge is optional and will not affect your grade. It’s a great way to practice your skills and add some fun to your project! Try it out if you finish early or want to extend your project.

---

### 🎲 Make `handleBad` Randomize the Display

Add a bit of randomness to your program by updating the `handleBad` function such that it will also change the `currentIndex` value and reset the display.

- Copy the `handleBad` function so that you now have two `handleBad` functions.
- Comment out one of the `handleBad` functions (this will prevent it from running while still letting you see your original code, which is important if you have difficulty with the challenge).
- Inside the new `handleBad` function, call `resetDisplay()` to reset the display. It is up to you to find the right place to put this.
- Right after `resetDisplay()`, assign a random whole number between `0` and `dataShapes.length - 1` to the `currentIndex` variable. You may need to google how to do this.

---

<br>

# 📤 Submit Your Work

🎯 **Goal:** Push your changes to GitHub and make your Data Shapes project go live.

---

### Step-by-Step Instructions

1. **Open the terminal in your codespace**

   - If the terminal isn’t visible, click the **Hamburger Menu > Terminal > New Terminal**.

2. **Enter the following commands one by one** in the terminal, pressing enter after each command to run it:

   ```bash
   git add .
   ```

   ```bash
   git commit -m "completed data shapes project"
   ```

   ```bash
   git push
   ```

3. **Wait a few minutes for the changes to go live at `your-username.github.io`.**

---

<br>

### ✅ **Check Your Work!**

- Visit the site `your-github-username.github.io` to see your website live on the internet. If it doesn’t appear immediately, wait a few minutes and try refreshing your page.
  - Make sure to replace the text `"your-github-username"` with your actual github username when entering the URL in your browser.
- Navigate to your Data Shapes link on your Portfolio page to ensure it is live on the web.
  - You might need to refresh your page for your changes to appear.

<br>
<hr>
<br>

### 🎉🎉🎉 Congratulations! You can now share your data-shapes project with others! 🎉🎉🎉
