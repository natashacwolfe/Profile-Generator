# Profile-Generator

![Profile](/assets/images/desktop.png)

## General Info

A GitHub user profile generator. The user is promted to answer two questions, GitHub username and favorite color. The application will then get the user data and generate a profile page using a theme based off the user's favorite color.

To generate your own GitHub user profile PDF simply clone this repo to your local machine. 

Install dependencies

```node.js
npm install
```

Run the application

```node.js
node index.js
```
![Demo](/assets/images/demo.gif)

PDF View

![PDF](/assets/images/pdfImage.png)


## Technologies Used
* JavaScript
* Node.js
* ES6+

## Dependencies

* Axios 0.19.2
* Inquierer 7.0.4
* HTML-PDF 2.2.0

## API

For this application the user is prompted to enter their GitHub username. That is sent in the axios call to gather the user profile data. In order to display the user's star count you need a second axios call adding on "/starred" to the original url. 

[GitHub](https://developer.github.com/v3/) Api Documentation  


## What I accomplished

It was a rough start, but wrapping up this project felt great! I have a much better understanding of packages, node, promises, and so much more. Full disclosure I wasn't super excited to be moving into node, but now I glimps of it's power, and how it makes JavaScript so powerful, I am excited to learn more. 