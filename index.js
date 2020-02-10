const fs = require ('fs'); 
const inquirer = require ('inquirer');
const axios = require('axios');

const questions = [
    { 
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'username'
    },
    {
        type: 'list',
        message: 'What is your favorite color?',
        name: 'fav-color',
        choices: ['green', 'blue', 'pink', 'red']
    }
];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();


inquirer.prompt(questions)
    .then(function( {username} ) {
         const queryUrl = `https://api.github.com/users/${username}`
       
         return axios.get (queryUrl).then(function(response) {
            const data = response.data;
            const user = {
                "profile-img": data.avatar_url,
                "user-name": data.login,
                "location": data.location,
                "github": data.html_url,
                "blog": data.blog,
                "bio": data.bio,
                "repos": data.public_repos,
                "followers": data.followers,
                "following": data.following
            };
             console.log(user);
        });
       
    })
    .catch(function(err) {
        console.log(err);
    });
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
  
    
    


    