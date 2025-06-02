# Your Portfolio Page

Show off your peacock feathers as you begin to spread your wings and take flight into the world software development. Okay, peacocks can't fly, but you get the point - your portfolio will give you a place to work and show off your coding projects!

**Table of Contents**

- [Your Portfolio Page](#your-portfolio-page)
  - [Prerequisites](#prerequisites)
  - [Overview](#overview)
    - [Specs](#specs)
    - [Take Away](#take-away)
    - [Work Flow](#work-flow)
    - [Type of App](#type-of-app)
  - [Intro to CSS](#intro-to-css)
    - [Padding](#padding)
    - [Margins](#margins)
    - [Classes and IDs](#classes-and-ids)
  - [Setup](#setup)
  - [Lesson Steps](#lesson-steps)
    - [TODO 1 : Create Portfolio Page](#todo-1--create-portfolio-page)
    - [TODO 2 : Add a Title](#todo-2--add-a-title)
    - [TODO 3 : Add Navigation](#todo-3--add-navigation)
      - [The Skinny on Anchor Tags](#the-skinny-on-anchor-tags)
      - [Relative vs Absolute File Paths](#relative-vs-absolute-file-paths)
    - [TODO 4 : Create the Main Content](#todo-4--create-the-main-content)
    - [Checking Your Work](#checking-your-work)
    - [TODO 5 : Link Your Future Projects](#todo-5--link-your-future-projects)
    - [TODO 6: Part 1, Add CSS](#todo-6-part-1--add-css)
    - [TODO 6: Part 2, Style the Portfolio](#todo-6-part-2--style-the-portfolio)
    - [Extra Challenge](#extra-challenge)
    - [TODO 7 : Go Live](#todo-7--go-live)

## Prerequisites

- Students will require a GitHub account and will need to remember their GitHub username and password.
- Students will require a Gitpod account - they will login to Gitpod using their GitHub credentials.
- Students should have completed the <a href="https://github.com/OperationSpark/first-website-hs-beta/blob/master/README.md" target="_blank">First Website lesson.</a>

## Overview

### Specs

- At the end of the lesson, will have a portfolio page added to their website. The portfolio page will list all of the projects we'll complete in our studies, and help begin a decent resume of your coding skills! In this lesson, we also delve a bit deeper into Cascading Style Sheets (CSS) and hyperlinks.

### Take Away

- Building a web page from scratch
- Basics of Cascading Style Sheets (CSS)
- Basic web page navigation through hyperlinks, aka anchor tags
- Relative vs absolute file paths
- Using git and GitHub

### Type of App

We are building a website, to be viewed live on the web at your GitHub page, and it will be viewed in a web browser, like Chrome.

### **Intro to CSS**

  <details>
  <summary> Click to expand to read more </summary>

Cascading Style Sheets, or CSS, is what give websites style. Without CSS, the internet would be a very bland place.

Facebook with CSS:

  <img src="https://github.com/OperationSpark/teacher-training-curriculum/raw/master/img/facebook-with-css.png">

Facebook without CSS:

<img src="https://github.com/OperationSpark/teacher-training-curriculum/raw/master/img/facebook-without-css.png">

Here are just a few things you can do with CSS:

- Choose colors of everything on the page like the background, font, or main menu.
- Set the size of any element such as font size, width of the entire site, or an image
- Create borders or drop shadows around whole sites, images, and menus
- Change the state of items when hovering over them

To make CSS work you select an HTML element and assign various properties to it.

One of the first things you might want to do on any site, if you're not satisfied with white, is to change the background color.

```CSS
body {
  background-color: blue;
}
```

Here, we're selecting the body element, which encompasses the entire page, and setting the background color to blue. The word, `body` is a **selector** and the `background-color` is a style **property**. Look over the formatting in the above CSS.

We have:

- The selector
- A curly bracket
- The property
- A colon
- The value of the property
- A semicolon
- A curly bracket

The spacing and indenting matter a lot for legibility! You and your fellow developers will appreciate well formatted HTML, CSS, and JavaScript because it will make it extremely easy to understand your intentions. Pay close attention to indentation when coding!

Let's talk about a few more common CSS properties, that is, ways in which we can alter an element's appearance.

### Padding

**Padding** is the amount space around content that is inside of an element. You can set padding on all four sides of an element.

Here's an example of padding around a div:

```CSS
div {
  padding-top: 20px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 0;
}
```

Remember that the `div` is the **selector** and there are four **properties** which apply to padding.

### Margins

A **margin** is the amount of space outside of an element. You can set it on all four side like padding.

### Classes and IDs

By more concretely describing HTML elements by assigning an id or class, we can select those elements uniquely by their id or grouped by their class. You will often want to apply styling to only certain HTML elements rather than all of them. In the above code examples we're selecting the `<div>` elements. The CSS styling you applied will change the look of all of the `<div>` elements across the site. To give an element a class or id we can add an attribute to their HTML tag:

```HTML
<div class="myClass">
  <!-- div content goes here -->
</div>

<div id="myId">
  <!-- div content goes here -->
</div>
```

class selectors in CSS are created with a period and the class name:

```CSS
.myClass {
  background-color: blue;
}
```

id selectors in CSS are created with a hashtag and the id name:

```CSS
#myId {
  background-color: red;
}
```

Now, only the first `<div>` with `class="myClass"` will have a blue background. Meanwhile only the `<div>` with `id="myId"` will have a red background. Ok, let's move on to create our portfolio!

</details>
<br>

## Setup

Open the workspace where you were working on your website from the 'first website' lesson.

> <details> 
> <summary> Work Flow: How to navigate thorough the lesson steps </summary>
>
> > You'll be creating a whole web page from scratch, from creating the `index.html` file (_which you will do in Todo#1_), to writing all the `<html>` tags for your content, and adding style with CSS.
>
> > To complete the assignment, below you'll find numbered **TODO** lesson steps. While reading this lesson, whenever you come across a **TODO** step with a number/letter combo **(ex, 1a)**, you are expected to do this step, which may require you to create a file, or insert some HTML, CSS or JavaScript in the appropriate place. Make sure you have accomplished the tasks specified with each **ToDo** before moving on.
>
> Part of being a good developer is being able to follow instructions closely. Sometimes we may be showing you code examples to make a point, versus adding code (any additional details for reference, you will see displayed with a sideways triangle). Make sure you are adding/removing code _only_ if a specific step asks you to.

</details>
<br>

#

<br>
<br>
<br>
<br>
<br>

#

## Lesson Steps

### **TODO 1 :** _Create Portfolio Page_

We're going to build the page from scratch:

**FIND:**

- **1a)** Locate the file system pane in Gitpod (your file tree).

**CODE:**

- **1b)** Double-click on the `portfolio.html` file to open it in the text editor. Within this file, create the boilerplate HTML by adding the following HTML tags (notice that you did something similar with your first website project):

  ```HTML
  <!DOCTYPE HTML>
  <html>
      <head>
      </head>

      <body>
        <div id="all-contents">

        </div>
      </body>
  </html>
  ```

Great, save the `portfolio.html` file.

#

<br>
<br>
<br>
<br>
<br>

#

### **TODO 2 :** _Add a Title_

**CODE:**

- **2a)** Add a title tag within the `<head>` tag of the portfolio.html page. Use the same title you used on your `index.html` page:
   <details>
   <summary> Your code should look similar to this </summary>

  ```HTML
      <head>
          <title>Sheba's Amazing Website</title>
      </head>
  ```

   </details>

#

<br>
<br>
<br>
<br>
<br>

#

### **TODO 3 :** _Add Navigation_

**FIND:**

- **3a)** Find the `<div>` with the "all-contents" attribute

**CODE:**

- **3b)** Within the `<div id="all-contents">` tag, insert the following structure to create our navigation:

  ```HTML
      <div id="all-contents">
          <nav>
              <h1>Sheba's Glorious Website</h1>
              <ul id="nav-ul">
                 <li class="nav-li">
                 <a class="nav-a" href="index.html">Home</a>
               </li>
               <li class="nav-li">
                 <a class="nav-a" href="portfolio.html">Portfolio</a>
               </li>
           </ul>
       </nav>
   </div>
  ```

  - Here, we've added the same navigation on our home page, `index.html`. It's common to have the same navigation options across an entire website, so the user can get to wherever from wherever! Inside our `<nav>`, we have an unordered list, (`<ul>`), with 2 list items (`<li>`). This list items contain anchor tags (`<a>`).

  #### **_The Skinny on Anchor Tags_**

    <details>
    <summary> Click here to learn more </summary>
    Anchor tags are the original hypertext - they allow us to link one web page to another web page, and also making things on a web page, _clickable_.

  The text between the start and end of the tag, like the HERE in `<a>HERE</a>`, represents what the user will see on the web page as _clickable_. In our nav, our anchor links use the text `Home` and `Portfolio`, so that's what will be displayed to the user in the nav bar. But links can wrap images or `<div>` tags or other HTML elements, making them _clickable_.

  The first part of the `<a>` tag requires the `href` attribute. `href` stands for hypertext reference, and this value is the URL or file path to the page or file we want the browser to load when a user _clicks_ on our link. The file paths `index.html` and `portfolio.html` are _relative_ paths, that is, they are relative in location to the file in which they occur, in this case, the `portfolio.html` file. Paths that include the full hard-drive location or an Internet domain are considered _absolute_ paths, as in, the fully qualified address of the file.

  Here's an example of an absolute URL:

       https://github.com/OperationSpark/portfolio-hs-beta/blob/master/README.md

  Or, on your computer, an absolute file path from the root directory of the file system:

       /home/ubuntu/workspace/README.md

  > #### Relative vs Absolute File Paths
  >
  > One way to think of relative vs absolute paths is to describe _where_ the person sitting next to you is _located_.
  >
  > - Relative: "She's right next to me"
  > - Absolute: "She's in the Universe, in the Milky Way galaxy, on planet Earth, in the north west hemisphere, in North America, in the United States, in Louisiana, in New Orleans, in the CBD, in some office building, on the 17th floor, in room 1701, sitting at the desk number 1".
  >
  > Because we are able to relatively describe the location of the files to which we're linking in our website, we don't have to spell out their absolute path, and this is better for portability. If we were to use absolute paths, but then move our website to another part of the file system or to another computer, the absolute paths would change, and our links would break.
  >
  > In the example of describing _where_ the person sitting next to you is _located_, if you both move to another room, the relative description stays the same (right next to me), but the absolute description does not (we have to account for the fact that we're in a different room, at different desks, etc)!

   </details>

#

<br>
<br>
<br>
<br>
<br>

#

### **TODO 4 :** _Create the Main Content_

Now we want to create a place where our work throughout the course will be displayed.

**FIND:**

- **4a)** Locate where the `<nav></nav>` section is.

**CODE:**

- **4b)** Create a pair of `<main>` tags underneath the `<nav></nav>` section.
- **4c)** Nested within the `<main>` tags create a `<div>` with `class="content"`
- **4d)** Add an `<h1>` header and title this section `Portfolio`
- **4e)** Lastly, add an unordered lists `<ul>` with `id="portfolio"`

   <details>
   <summary> Your code will look like this </summary>

  ```HTML
          <nav>
              <!-- Nav stuff here...-->
          </nav>
          <main>
              <div class="content">
                  <h1>Portfolio</h1>
                  <ul id="portfolio">

                  </ul>
              </div>
          </main>
  ```

   </details>

So, we created an unordered list with an `id` of `portfolio`. This will allow us to access the portfolio `<ul>` to style it, which we are doing with a CSS selector. Right now there are no items in the list, so we'll take care of that next. First, however, you might want to check and make sure everything looks good so far.

- To check the status of your portfolio, right-click your `portfolio.html` file and select 'Open with Live Server' to view the changes.

#

<br>
<br>
<br>
<br>
<br>

#

### **TODO 5 :** _Link Your Future Projects_

Okay, now it's time to add in the links to your future projects.

**FIND:**

- **5a)** Find the `ul` element in your code with the `id="portfolio"`:

   <details>
   <summary> Pssst....it will look something like this</summary>

  ```HTML
  <ul id="portfolio">

  </ul>
  ```

   </details>

You'll now want to put in the list items, each of which contains an anchor tag. We'll give you the first three, but if you want to add any more projects, you'll have to come back and add them in yourself.

**CODE:**

- **5b)** Add the following HTML inside your `<ul>` element.

  ```HTML
      <li><a href="projects/platformer/">Platformer : A cannon - dodging, collectible - grabbing adventure game for Halleb0t</a></li>
      <li><a href="projects/bouncing-box/">Bouncing Box : A project that gives you a taste of game development on the web </a></li>
      <li><a href="projects/circularity/">Circularity : A motion poem using random number generation and velocity applied to circle shapes...</a></li>
  ```

Now, save and check to make sure those links appear!

#

<br>
<br>
<br>
<br>
<br>

#

### **TODO 6** _Part 1 : Add CSS_

Let's add some style!

**FIND:**

- **6a)** Locate your `<head>` tag

**CODE:**

- **6b)** Inside the `<head>` below the `<title>` tag, add a `<link>` tag with a `rel="stylesheet"` attribute and an `href="style.css"` attribute. This will apply all of the same CSS rules from your home page to your portfolio page, so all colors and other styles will be synced between both pages. Any time you make changes to the `style.css` file, the style will be updated on both pages.

### **TODO 6** _Part 2 : Style the portfolio_

There are a couple id and class attributes in your `portfolio.html` file that are not found in your `index.html` file, so we'll have to add in some new CSS rules to our `style.css` file.

**FIND:**

- **6c)** Go ahead and open your `style.css` file.

**CODE:**

- **6c)** Now add some styling that is unique to portfolio. The CSS rules below contain composite rules, which we haven't covered in class, so feel free to simply paste this at the very bottom of the `style.css` file:

  ```CSS
           /* portfolio styles */
           .content h1 {
               color: black;
           }

           #portfolio {
               list-style-type: none;
               padding-left: 0;
           }

           #portfolio li {
               background: #fff;
               padding: 10px;
               border-radius: 10px;
               margin-bottom: 10px;
           }

           #portfolio li:hover {
               background: #eee;
           }

           #portfolio a {
               text-decoration: none;
               color: #454545;
           }
  ```

### **Extra Challenge**

Here's some other things to try:

- Google 'border radius' and add it to the nav selector to give the `<nav>` element rounded corners
- Add a border around the image
- Change the color of the background
- Add a favicon to your `index.html` and `portfolio.html` files
- Make website <a href="https://www.w3schools.com/css/css_rwd_mediaqueries.asp">mobile responsive</a>.

<br>

**Note**: If you have preexisting style tags in your `index.html` file, you put the link to your `style.css` file with your responsive style rules at the bottom of the `<head>` tag.

Here's some CSS to get you started on making your website mobile responsive

```CSS
            /* responsive web design */
            @media screen and (min-width: 120px) and (max-width: 1080px) {
              main {
                height: 100ch;
                zoom: 1.5;
                display: grid;
              }

              h1 {
                font-size: 44px;
              }

              h2 {
                font-size: 42px;
              }

              h3 {
                font-size: 36px;
              }

              #all-contents {
                height: 100ch;
                margin: none;
              }

              a {
                font-size: 42px;
              }

              .sidebar {
                margin-right: 0px;
                justify-content: center;
                align-items: center;
              }

              .sidebar-img {
                width: 100%;
              }

              p,
              li {
                font-size: 24px;
              }

              .content {
                align-content: center;
                justify-content: center;
              }
          }
```

#

<br>
<br>
<br>
<br>
<br>

#

### **TODO 7 :** _Go Live_

With GitHub Pages, once you push your changes from your workspace up to your GitHub repository, your page will be live on the Internet.

To do so, you'll need to enter the following git commands into your bash terminal. Select the bash terminal in the Console View - the bottom window pane in Gitpod.

Enter the following commands, pressing ENTER after each one:

`git add .`

`git commit -m 'add portfolio.html file'`

`git push`

Give it a couple minutes and you should be able to view the additions to your website live on the web at `username.github.io` (Where `username` is your own GitHub username.)

You now have a portfolio on the Internet, whoot!
