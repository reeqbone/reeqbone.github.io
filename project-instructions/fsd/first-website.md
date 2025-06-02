# First Website

We're gonna go live on GitHub with your very own website!

**Table of Contents**

- [First Website](#first-website)
  - [Prerequisites](#prerequisites)
  - [Overview](#overview)
    - [Specs](#specs)
    - [Take Away](#take-away)
    - [Type of App](#type-of-app)
    - [The Big 3](#the-big-3)
    - [HTML in 3 Minutes](#html-in-3-minutes)
  - [Lesson Steps](#lesson-steps)
    - [Work Flow](#work-flow)
    - [TODO 1 : Update index.html](#todo-1--update-indexhtml)
    - [TODO 2 : Add a Title](#todo-2--add-a-title)
    - [TODO 3 : Create Sections for the Menu and Main Content](#todo-3--create-sections-for-the-menu-and-main-content)
    - [TODO 4 : Create Structure for our Content](#todo-4--create-structure-for-our-content)
    - [TODO 5 : Add Content](#todo-5--add-content)
    - [TODO 6 : Add More Content - Interests](#todo-6--add-more-content---interests)
    - [TODO 7 : Add an Image](#todo-7--add-an-image)
    - [TODO 8 : Navigation and Site Title](#todo-8--navigation-and-site-title)
    - [TODO 9 : Make it Pretty](#todo-9--make-it-pretty)
      - [CSS Selectors in a Nutshell](#css-selectors-in-a-nutshell)
      - [Selecting HTML Elements by ID, Class, or by Tag Type](#selecting-html-elements-by-id-class-or-by-tag-type)
    - [TODO 10 : Add in Attributes](#todo-10--add-in-attributes)
    - [TODO 11 : Customize CSS](#todo-11--customize-css)
    - [Extra Challenge](#extra-challenge)
    - [TODO 12 : Go Live](#todo-12--go-live)

## Prerequisites

- [Students will require a GitHub account](https://github.com/join) and will need to remember their GitHub username and password.

  GitHub is a place on the Internet where we can store code! It's a cool social coding platform, kind of like Facebook for coders.

- [Students will require a Gitpod account](https://gitpod.io) (or some other IDE)

  Gitpod is a place on the Internet where we can _work_ on code and create virtual workspaces for our coding projects. It is designed to work very closely with GitHub for easy usage.

<!-- * [Students will need to set up a Github repository and Gitpod workspace].  -->
<!-- Click here to find instructions to complete these steps](https://github.com/OperationSpark/fsd-setup) -->

## Overview

### Specs

- At the end of the lesson students will have built and designed their own website that is viewable on the web.
- The website will be hosted on GitHub under student's own account, and is something they can build upon on over time.
- The live website is hosted using a service called GitHub Pages: <a href="https://pages.github.com/" target="_blank">If you want to learn more about GitHub Pages, have a look here...</a>
- The website will be the student's own and will feature a short profile of the student.

### Take Away

- Basic HTML5, including HTML (content) and CSS (style).
- Basic web page navigation
- Using git and GitHub

### Type of App

We are building a website, to be viewed live on the web at your GitHub page, and it will be viewed in a web browser, like Chrome.

## The Big 3

There's really three parts at play in a webpage:

- HTML: Hypertext Markup Language - A set of tags to mark or section-off the structure and content of a webpage.
- CSS: Cascading Style Sheets - A syntax for specifying a set of rules that _style_ web pages. CSS is responsible for how a webpage looks!
- JavaScript: A programming language that allows web pages to respond to user input, to dynamically change the content or appearance of a webpage, or make request to load data into a webpage. Essentially, JavaScript is responsible for the _behaviour_ of a webpage.

### HTML in 3 Minutes

Very simply put, HTML is a set of text-tags that tell a web browser how to structure and identify the content of a web page. Developers _markup_ or _section off_ the structure and content of a webpage using HTML tags to _section off_ the parts of the page. Take a look at any webpage, and you'll see things like a header with some type of navigation, maybe a sidebar with more navigation options, and then headings, paragraph text, images and buttons. All of these _page elements_ are marked as such using HTML tags.

Before we start marking-up our webpage, here's a few things to note about HTML Tags:

Try to remember that most HTML tags have both an opening and closing tag. So, when you create a `<div>` tag, which stands for _document division_ (a way of sectioning off page content), you must also create its closing tag, like so:

```HTML
<div>
    <!-- All other tags and content in here belong to the <div></div> tag -->
</div>
```

Some HTML tags, like the `<img>` tag, do not require a closing tag, because they are not designed to hold content between the opening and closing tag. The image tag specifies the source of the image it should display using what's called a tag _attribute_, which is a property of the tag, not content of the tag. Check it out:

```HTML
<img src="path/to/my-image.jpg">
```

Notice, above, that the `src` attribute is located _inside_ the `<img>` tag.

Also note that HTML tags are hierarchical, and **need to be indented to illustrate their hierarchical relationship!** Tags can contain content, like text or images, but can also contain or _nest_ other tags. Have a look:

```HTML
<div id="content">
    <div id="sidebar">
        <!-- sidebar content goes here -->
    </div>
    <div id="main">
        <!-- main content goes here -->
    </div>
</div>
```

Above, you'll see this pattern often - notice that we have one `<div>` tag with an id attribute of `content`, and inside this tag, we have two other `<div>` tags, one for a sidebar and one for a main section of the page. The _content_ `<div>` is the parent of both the _sidebar_ and _main_ `<div>`, while _sidebar_ and _main_ are siblings. Notice the indentation - this is extremely important as it clearly and visually spells out these hierarchical relationship. Indentation and relationships of tags (and code blocks) are the things newcomers struggle with the most! Be vigilant here!

<br>
<br>
<br>
<br>
<br>

# Lesson Steps

> ### **Work Flow**
>
> _How to navigate thorough the lesson steps_
>
> > You'll be creating a whole web page from scratch, from creating the `index.html` file (_which you will do in Todo#1_), to writing all the `<html>` tags for your content, and adding style with CSS.
>
> > To complete the assignment, below you'll find numbered **TODO** lesson steps. While reading this lesson, whenever you come across a **TODO** step with a number/letter combo **(ex, 1a)**, you are expected to do this step, which may require you to create a file, or insert some HTML, CSS or JavaScript in the appropriate place. Make sure you have accomplished the tasks specified with each **ToDo** before moving on.
>
> Part of being a good developer is being able to follow instructions closely. Sometimes we may be showing you code examples to make a point, versus adding code (any additional details for reference, you will see displayed with a sideways triangle). Make sure you are adding/removing code _only_ if a specific step asks you to.

## **TODO 1 :** _Update index.html_

- **1a.** **FIND:** Locate the file tree on the left side of your workspace
- **1b.** **FIND:** Open up the `index.html` file. (See below)

    <img src="img/gitpod-open-file.png" style="max-height: 350px">

- **1c.** **CODE:** Add the following boilerplate code in your `index.html` file to get started:

  ```HTML
  <!DOCTYPE HTML>
  <html>
      <head>

      </head>

      <body>

      </body>
  </html>
  ```

  > <details>
  > <summary> 
  > Let's talk about the tags for a second:
  > </summary>
  >
  > If you're not familiar with the basic tags needed for the structure of >an HTML page, you'll want to memorize them. At least for now, every >HTML page contains the DOCTYPE, html, head and body tags.
  >
  > The `<!DOCTYPE HTML>` tag tells the browser you want to render the document using the most recent version of HTML. The opening and closing tags of `<html></html>` wrap our html page, but are in fact somewhat redundant.
  >
  > The next two tag sets make up the two sections of any well formed HTML page:
  >
  > The `<head></head>` tag represents metadata for a webpage, that is, information about the web page used by the browser, providing extra information about the webpage, but is not content. This is similar to the information on the outside of a postal envelope - the to and from address, the stamp, the processing stamp from the post office - information important to the delivery of the letter, but _nothing_ to do with the _content_ of the letter.
  >
  > Finally, every page has a `<body></body>` tag, and it is between the body tag that all visible content will be placed. That's right, all content you want to show to the user will be children of the `<body>`, so pay careful attention to ensure that when you're adding navigation, paragraphs and images tags, you're doing so within the `<body>` tag.
  >
  > </details>

<br>

We've made the structure of the site so now we need some content! Let's move on to giving your site a title!

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 2 :** _Add a Title_

- **2a.** **CODE:** Add your title `<title></title>` tag to where it belongs, between your `<head>` tags.

 <details> 
     <summary> Click to see what your code should look like after this step</summary>

  ```HTML
  <!DOCTYPE HTML>
  <html>
      <head>
        <title>Sheba's Amazing Website</title>
      </head>

      <body>

      </body>
  </html>
  ```
  </details>
  
#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 3 :** _Create Sections for the Menu and Main Content_

We're going to create `<div>` tags to group our content together. What is the div tag you may ask?

> <details> 
> <summary>  Click here to learn more about divs </summary>
>
> The `<div>` tag stand for _document division_, and they are special tags that help us divide or group together content on our web page. You can consider them sort of like containers, into which we group content, and those containers can be invisible or _styled_ with visible properties, like a background color, a border, etc.
>
> </details>
> <br>

**Before you code:** All of the tags used to mark our HTML content will reside _between_ the opening and closing of the `<body>` tag. So for rest of the HTML tags you create, _make sure_ you place them _between_ `<body>` and `</body>` like so:

> ```HTML
> <body>
>    <!-- Visible HTML elements GO HERE  -->
> </body>
> ```

<br>

- **3a.** **CODE:** Ok, onward with our code! Add a set of div tags within your body element.

  <details>
    <summary> What does this do? Click to expand</summary>
    <summary>
      So, to start grouping together our content in a meaningful way, inside the `<body>` tag, we created a new document division using the `<div>` tag. This is going to contain all the site content. You can see that we also put a comment above that div.
      
      DON'T FORGET to include the comment!** It might not have any effect on your code, but it will help you out by keeping sections of your code labeled for future reference and confirmation that you are adding content within the correct area.
      
      A comment is any bit of code that has no effect; it's only purpose is to make it easier for you and others to understand what is happening. In HTML, comments always take the form of `<!-- some message -->`.
    </summary>
  </details>

  <br>

- **3b.** **CODE:** Now, let's add our site navigation menu and the main content of our site. Inside the new div you created, add a set of opening and closing tags for `<nav>` and `<main>`.

  > **Hint: `<nav>` and `<main>`will both be nested sibling elements here!**

    <details> 
    <summary> Click to see what your code should look like after completing these steps </summary> 
    
    ```HTML
    <body>
        <!-- All content goes here -->
        <div> 
            <nav>
    
            </nav>
    
            <main>
    
            </main>
        </div>
    </body>
    ```
    </details>

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 4 :** _Create Structure for our Content_

- **4a.** **CODE:** Inside the `<main>` element you've already created, create two new nested `<div>` elements.

      - These will act as the two columns of our page - the sidebar and the main content, as noted by the comments we leave next to each. Once again, don't forget to include the comments!

    <details> 
    <summary> Click to see what your code should look like after completing these steps </summary> 
    
    ```HTML
      <main>
          <!-- Sidebar section -->
          <div>

          </div>

          <!-- Content section -->
          <div>

          </div>
      </main>
    ```
    </details>

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 5 :** _Add Content_

Ok, so far, we've sectioned off our webpage, now we need to add some content...

- **5a.** **CODE:** Add the following tags inside of the Content `<div>` element:

  - Create a `<h2> </h2>` element and put your name inside of it.
  - Below that make a `<p> </p>` element and inside it put your position or job title (such as "Student at XYZ High.")


#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 6 :** Add More Content - Interests

Inside of the Content `<div>` element, let's create a section where we can list your interests.

- **6a.** **CODE:** Below the closing `</p>` tag add the following:

  - The comment `<!-- Interests section -->`
  - Below the comment, create a `<div> </div>` element.
  - Inside the new `<div>` element, give the list a title with the `<h3>` tag and the text `Interests`.
  - Create an unordered list with the `<ul>` tag and three sets of `<li>` tags nested inside

   <details> 
   <summary> Click to see what your code should look like after completing these steps</summary>

    > In the end, your code should look like this (only with more specific interests, of course)!
    >
    > ```HTML
    >    <!-- Content Section-->
    >    <div>
    >        <h2></h2>
    >        <p></p>
    >        <!-- Interests section -->
    >        <div>
    >            <h3>Interests</h3>
    >            <ul>
    >                <li>Thing 1</li>
    >                <li>Thing 2</li>
    >                <li>Thing 3</li>
    >            </ul>
    >        </div>
    >    </div>
    > ```
</details>



Now, save your page and preview it.

> <details>
> <summary> How to preview your website </summary>
>
> To preview your page, right click on the `index.html` file and select "Open with Live Server" (See Below)
>
> <img src="img/gitpod-preview-html-file.png" style="max-height: 550px">
> </details>

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 7 :** _Add an Image_

- **7a.** **CODE:** Inside of the `<div>` tag below the `<!-- Sidebar section -->` comment, add an `<img>` tag.
  _More on image tags [here](http://www.w3schools.com/tags/tag_img.asp)._

- **7b.** **CODE:** Give your `<img>` tag a link to your chosen image

  > **To add an image:** We need to add the URL of an actual image with the **src** attribute. Find an image you would like on your page, you can find an image of yourself from Facebook, or anything else using a Google image search. Right-click on the image, and choose 'Copy Image URL.' Then, paste that URL into the **src** attribute.

   

Your full image tag should look this this:

```HTML
<!-- Sidebar section -->
<div>
<img src="https://github.com/OperationSpark/first-website-hs-beta/blob/master/img/hallebot.png?raw=true">
</div>
```



Save your code and refresh your preview. It should look something like this:

<img src="img/second-shot.png">

You should see the image now. If you don't, go back and double check that there are no
errors in your `<img>` tag.

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 8 :** _Navigation and Site Title_

Your site needs a title!

- **8a.** **CODE:** Inside of the `<nav>` add an `<h1> </h1>` element (as in, _header size 1_). Inside the opening and closing brackets, give your website a title.

     <details> 
     <summary> Click here to see what your code should look like after completing this step</summary>

  ```HTML
  <nav>
      <h1>Hallebot's Glorious Website</h1>
  </nav>
  ```

     </details>

Next, we're going to make a menu.

> 💡 Linking to other pages forms the foundation of the web. Early on, the web was nothing but a bunch of HTML pages linked to one another. That's still true today although there's a lot more going on as well. We're going to link to a portfolio page and create it in the next lesson.

- **8b.** **CODE:** Below your `<h1>` element, create an unordered list using the `<ul>` tag.

- **8c.** **CODE:** Inside your unordered list, create two `<li>` tags to contain your list items

- **8d.** **CODE:** Create a link inside of each list item using the `<a>` tag.

- **8e.** **CODE:** Give each menu item a name by inserting 'Home' and 'Portfolio' between the opening and closing tags.

<details> 
<summary> Click here to see what your code should look like after completing these steps</summary>

```HTML
<nav>
    <h1>Hallebot's Glorious Website</h1>
    <ul>
        <li>
          <a href="index.html"> Home </a>
        </li>
        <li>
          <a href="portfolio.html"> Portfolio </a>
        </li>
    </ul>
</nav>
```

</details>
<br>

Save and view your work. You now have some menu items! You should see your title inside of the navbar to the left. To the right, your Home/Portfolio links. The _Home_ link even works since it simply links to the page we are currently working on. The other link is for our portfolio page which we'll build out in the next lesson.

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 9 :** _Make it Pretty_

We now have a fairly plain website but it's a website! Let's add some style. Here's where CSS comes in!

- **9a.** There are several ways of adding CSS to a site. The way we'll do it in this project is by creating a CSS file to hold all of our styles, and we'll add a link to the CSS file within our HTML file.

  - **CODE:** Inside the `<head>` below the `<title>` tag, add a `<link>` tag with a `rel="stylesheet"` attribute and an `href="style.css"` attribute. NOTE: the link tag does not require a closing tag

    - <details> 
       <summary> Click here to see what your code should look like after completing this step</summary>

      ```HTML
      <head>
          <title>Witty title you added in step 2</title>
          <link rel="stylesheet" href="style.css">
      </head>
      ```

       </details>
       <br>

  - **FIND:** Open the  file named `style.css`. All of the CSS rules will go in this CSS file.

- **9b.** **CODE:** Copy the entire section below and place it inside the `style.css` file

> ```CSS
>    body {
>        background: rgb(125, 198, 205);
>        color: rgb(45, 45, 45);
>        padding: 10px;
>        font-family: arial;
>    }
>    #all-contents {
>      max-width: 800px;
>        margin: auto;
>    }
>
>    /* navigation menu */
>    nav {
>        background: rgb(239, 80, 41);
>       margin: 0 auto;
>        display: flex;
>        padding: 10px;
>    }
>    h1 {
>        display: flex;
>        align-items: center;
>        color: white;
>        flex: 1;
>        margin: 0;
>    }
>    #nav-ul {
>        list-style-image: none;
>    }
>    .nav-li {
>        display: inline-block;
>        padding: 0 10px;
>    }
>    a {
>        text-decoration: none;
>        color: #fff;
>    }
>
>    /* main container area beneath menu */
>    main {
>        background: rgb(245, 238, 219);
>        display: flex;
>    }
>    .sidebar {
>        margin-right: 25px;
>        padding: 10px;
>    }
>    .sidebar-img {
>        width: 200px;
>    }
>    .content {
>        flex: 1;
>        padding: 15px;
>    }
>
>    /* portfolio styles */
>    #interests {
>        border: 4px silver ridge;
>        padding: 8px;
>    }
>    h2, h3 {
>        margin: 0px;
>    }
>
> ```

**Ok, so what just happened?**

> We've pasted in a bunch of style rules into the `style.css` file, and that file is linked to the `index.html` file. You should now see that your page is now styled with some colors and some positioning if you're looking at it with Live Server. **However, not all of these rules will take effect yet.** Some reference classes and ids that have not yet been assigned. That is something for you to do in the next section.

> <details> 
> <summary> Click to learn more about working with CSS Selectors to customize your code</summary>
>
> CSS allows us to specify styling rules for our HTML elements. When we say _elements_, we're talking about all the HTML tags within a webpage. In best practice, we separate the content of an HTML document from the style or presentation of the content. This allows us to change appearence without modifying content, allows styles to be better managed across multiple pages, and creates a cleaner code base.
>
> In order to style HTML elements, we need a way to _select_ the elements.
>
> **Selecting HTML Elements by ID, Class, or by Tag Type**
>
> When we create HTML elements, we can assign them an id or a class. In our HTML so far, we've given one element an id of _all-contents_ and another a class of _sidebar_. We did this by using the id and class attributes of the `<div>`. For example:
>
> ```HTML
> <div id="all-contents">
>    <div class="sidebar"></div>
> </div>
> ```
>
> By more concretely describing HTML elements by id or class, we can then select those elements by their id or class, and style them the way we like, and for this reason, the rules we specify in CSS are called _selectors_. We can also select elements by their tag type, as in, `body`, `p`, `h1`, `nav`.
>
> Selectors and their styling rules tell the web browser which elements to select, and how to style them. In a moment, we are going to add some more style to our `<nav>` element, and by doing so using the `nav` selector, we are creating a style rule that will be applied to _all nav tags_ on our webpage.
>
> Selecting an element by id should only return one element, if your web page is well formed, so applying a style rule by id should only style one element on the page.
>
> Selecting an element by its tag type or by its class will style all tags of that type, or all tags of that class.
>
> Finally, in our CSS, we've also shown you two ways to specify selectors, the long form, which is more explicit, and the short form. This is the long form of for an id selector:
>
> ```CSS
> [id=all-contents] {
>    max-width: 800px;
>    margin: auto;
> }
> ```
>
> However, the same selector can be spelled using the number symbol `#`, for id, like this:
>
> ```CSS
> #all-contents {
>    max-width: 800px;
>    margin: auto;
> }
> ```
>
> The long form of sidebar class selector is:
>
> ```CSS
> [class=sidebar] {
>    margin-right: 25px;
>    padding: 10px;
> }
> ```
>
> The short form to specify a CSS selector by class is the dot `.`, as in:
>
> ```CSS
> .sidebar {
>    margin-right: 25px;
>    padding: 10px;
> }
> ```
>
> | Type  | Long form                    | Short form            |
> | ----- | ---------------------------- | --------------------- |
> | class | [class=all-contents] { ... } | .all-contents { ... } |
> | id    | [id=portfolio] { ... }       | #portfolio { ... }    |
>
> </details>
> <br>

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 10 :** _Add in Attributes_

Check it out! We have some style but not very much. We can fix that by adding in class and id attributes to several elements. All of these changes will be made back in the `index.html` file.

> <details>
> <summary> Wait a second, what is an attribute? </summary>
> Attributes are properties that tell us something more specialized about the tag, and you'll come to understand how these work as you work more with HTML. In particular, the `id` attribute allows us to _uniquely_ identify an HTML element in our webpage, while the `class` attribute allows us to group HTML elements together. Technically speaking, when giving an id to an element, this id _should be_ unique within the page - no two elements should share the same id in the same webpage, and this is an important distinction.

   </details>
   <br>

### **Part 1)** _The "all-contents" div_

**FIND:** Look for the first opening `div` tag on the page. It should be directly below the opening `body` tag and the comment `<!-- All content goes here -->`.

> <details>
> <summary>It will look like this code here</summary>
>
> ```HTML
> <body>
>    <!-- All content goes here -->
>    <div>
>        ...
>    </div>
> </body>
> ```
>
> </details>
> <br>

- **10a.** **CODE:** Add in an `id` attribute of `id="all-contents"` so that this div will be uniquely identified and so that the rule will apply to that div.

  **REMEMBER:** attributes go inside of opening tags!

  > <details>
  > <summary> The CSS selector connected to this attribute </summary>
  >
  > ```CSS
  > #all-contents {
  >    max-width: 800px;
  >    margin: auto;
  > }
  > ```
  >
  > </details>

Go ahead and save and view your changes! You'll see that `#all-contents` rule is now applied!

> <details>
> <summary> When you're done, your code should look like this: </summary>
>
> ```HTML
> <body>
>    <!-- All content goes here -->
>    <div id="all-contents">
>        ...
>    </div>
> </body>
> ```
>
> </details>
> <br>

### **Part 2)** _The nav section_

There are other CSS rules that currently don't do anything because they don't reference existing classes or ids. Two of these rules are the ones with selectors `#nav-ul` and `.nav-li`.

- **10b.** **FIND:** Find the `nav` section in your HTML and specifically the `<ul>` and `<li>` tags inside of it.

  > <details>
  > <summary> It should look like this:</summary>
  >
  > ```HTML
  >    <ul>
  >        <li>
  >          <a href="index.html"> Home </a>
  >        </li>
  >        <li>
  >          <a href="portfolio.html"> Portfolio </a>
  >      </li>
  >    </ul>
  > ```
  >
  > </details>

  - **CODE:** Add an id attribute of `id="nav-ul"` to the `<ul>` element (don't forget to put the attribute inside the opening tag)
  - **CODE:** Add class attributes of `class="nav-li"` to both of the `<li>` elements

Save and view the changes. You'll see that the CSS rules mentioned above now affect those elements!

### **Part 3)** _The sidebar_

Two more CSS rules that are currently unused are the ones with selectors `.sidebar` and `.sidebar-img`.

- **10c.** **FIND:** Find the `div` element directly below the comment `<!-- Sidebar section -->`

    <details>
      <summary> It should look like this: </summary>

  ```HTML
    <!-- Sidebar section -->
    <div>
        <img>
    </div>
  ```

    </details>

* **CODE:** Give the opening `<div>` tag a `class` attribute equal to `"sidebar"`.
* **CODE:** Inside the `<img>` tag, before the `src` attribute, give the image a `class` attribute of `"sidebar-img"`.

  > Save and view the changes!

### **Part 4)** _The content_

Finally, the content section needs another class and id attribute added to it.

- **10d.** **FIND:** Look for the `<div>` tag directly below the `<!-- Content section -->` comment.

  > <details>
  > <summary> It will look like this </summary>
  >
  > ```HTML
  > <!-- Content section -->
  > <div>
  >     <h2> ... </h2>
  >     <p> ... </p>
  >     <!-- Interests section -->
  >     <div>
  >         ...
  >     </div>
  > </div>
  > ```
  >
  > </details>

  - **CODE:** In the opening `<div>` tag directly below the `<!-- Content section -->` comment, give it a `class="content"` attribute
  - **CODE:** Finally, in the `<div>` element just below your `<!-- Interests section -->` comment, add in an `id` attribute set to `"interests"`

Save and preview one more time. You've now added in all of the class and id attributes you need!

#

<br>
<br>
<br>
<br>
<br>

#

## **TODO 11 :** _Customize CSS_

### **Part 1)** _Adding more margin_

- **11a.** **FIND:** Find the `nav` CSS selector in the `style.css` file.

  > <details>
  > <summary>It looks like this:</summary>
  >
  > ```CSS
  > nav {
  >        background: rgb(239, 80, 41);
  >        margin: 0 auto;
  >        display: flex;
  >        padding: 10px;
  >    }
  > ```
  >
  > </details>

- **CODE:** Under the style rule: `margin: 0 auto;` add `margin-bottom: 20px;`
- Save and view the changes. The menu now has some space underneath it!

### **Part 2)** _Customize colors_

- **11b.** **CODE:** Go through your CSS rules and change the `background` and `color` properties to use colors that you like. **Don't keep the default colors!** If you want, you can also try changing the border color surrounding your interests.

  - **Remember** that all colors can be represented as a combination of red, green, and blue numbers 0-255. You can either use rgb values or plug in color names directly. Feel free to check out w3schools for a list of available colors or to use Google's color picker (just search "color picker") to find colors that you like.

### **Extra Challenge**

- Google `border-radius` and add it to the `<nav>` element.
- Add a border around the image
- Add in any other borders you think might look good
- Feel free to play around with other bits of CSS if you want to further customize your website!

#

<br>
<br>
<br>
<br>
<br>

#


## **TODO 12 :** _Go Live_

Let's put our site on the Internet so that anyone can look at it!

With <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>, once you push your changes from your workspace up to your GitHub repository, your page will be live on the Internet.

To do so, you'll need to enter the following git commands into your bash terminal. In the bottom window you should by default have a bash terminal open with a line that looks similar to

```bash
gitpod /workspace/dkogler.github.io $
```

If you do not see this, then you can open a new bash terminal by clicking the Hamburger Menu at the top left of your gitpod workspace, then click `Terminal`, and then `New Terminal`.

Once you're in your bash terminal, enter the following commands, pressing ENTER after each one:

> `git add .`
>
> `git commit -m 'add index.html and css files'`
>
> `git push`

Give it a couple minutes and you should be able to view the additions to your website live on the web at `username.github.io` (Where `username` is your own GitHub username.)

Congratulations! You are LIVE ON THE INTERNET!
