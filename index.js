const fs = require ('fs'); 
const inquirer = require ('inquirer');
const axios = require('axios');
let pdf = require('html-pdf');

const generateHTML = require("./generateHTML");


const questions = [
    { 
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'username'
    },
    {
        type: 'list',
        message: 'What is your favorite color?',
        name: 'favColor',
        choices: ['green', 'blue', 'pink', 'red']
    }
];

let favColor;

// function writeToFile(fileName, data) {
//     fs.writeFile("user.pdf", )
// }

    function init() {
    inquirer.prompt(questions)
    .then(function( userResponses ) {
        // console.log(userResponses)
        const username = userResponses.username;
        favColor =  userResponses.favColor;
        const queryUrl = `https://api.github.com/users/${username}`
    
        return axios.get (queryUrl)
            // console.log(user);
            // return user;
    })
    .then(function(response) {
        const data = response.data;
        // console.log(data);
        const user = {
            "favColor": favColor,
            "profileImg": data.avatar_url,
            "userName": data.login,
            "company": data.company,
            "location": data.location,
            "github": data.html_url,
            "blog": data.blog,
            "bio": data.bio,
            "repos": data.public_repos,
            "followers": data.followers,
            "following": data.following
        };
        // console.log(user);
        // console.log(test(user));
        // test(user);
        return generateHTML(user);
    }) 
    .then(function(htmlData) {
        fs.writeFile("index.html", htmlData, function(err, result) {
            if (err) {
                throw err; 
            } else 
            {
                let html = fs.readFileSync("./index.html", "utf8");
                let options = {fortmat: "letter"};

                pdf.create(html, options).toFile("./user.pdf", function(err, results) {
                    if (err) {
                        throw err;
                    } 
                    console.log("PDF file was created")
                })

                //  fs.readFileSync("./index.html", function(err, htmlFile) {
                //      if (err) {
                //          throw err;
                //      } 
                //     pdf.create(htmlFile, {format: "Letter"}).toFile("user.pdf", function(err, result) {
                //         if (err) {
                //             throw err;
                //         } 
                //         console.log("Your PDF file was created.")
                //     })
                //  })
               
            }
        })
    })
    .catch(function(err) {
        console.log(err);
    });
}

init();




    // .then(function( {username} ) {
    //     const querySearch = `followers`
    //     const queryUrl = `https://api.github.com/users/${username}/${querySearch}`;

    //      axios.get (queryUrl).then(function(response) {
    //         const followerNames = response.data.map(function (followers) {
    //             return followers.login
    //         });
    //         console.log(followerNames.length);
    //     })
    // })
    // .then(function( {username} ){
    //     const queryUrl = `https://api.github.com/users/${username}/following`;

    //     axios.get (queryUrl).then(function(response) {
    //         const followingUsers = response.data.map(function (following) {
    //             return following.login;
    //         });
    //         console.log(followingUsers.length);
    //     })
    // })
    // .then(function( {username} ){
    //     const queryUrl = `https://api.github.com/users/${username}/starred`;

    //     axios.get (queryUrl).then(function(response) {
    //         const stargazerAmount = response.data.map(function (stargazer) {
    //             // const add = (a, b) =>
    //             // a + b;
    //             // const starSum = stargazerAmount.reduce(add);
    //             return stargazer.stargazer_count;
    //         });
    //         console.log(stargazerAmount);
    //     })
    // })
  
    


    